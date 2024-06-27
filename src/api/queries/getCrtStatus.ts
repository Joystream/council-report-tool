import BN from "bn.js";

import { A_DAY, dayRange, toJoy } from "@/helpers";
import { orionSdk } from "./sdk";
import { AmmTransaction, CreatorToken } from "./__generated__/orion.generated";

const limit = 50_000;

export const getCrtStatus = async (
  start: number,
  end: number,
  startDate: Date,
  endDate: Date,
) => {
  const {
    GetCreatorTokens,
    GetCrtTransactions,
    GetCrtTransactionsWithBlock,
    GetRevenueSplitAmounts,
  } = orionSdk;
  const [newCrts, previousTransactions, newTransactions, revenueSplits] =
    await Promise.all([
      GetCreatorTokens({
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      }),
      getTransactions(0, start, GetCrtTransactions),
      getTransactions(start, end, GetCrtTransactionsWithBlock),
      GetRevenueSplitAmounts({ until: end }),
    ]);

  const previouslyMinted = sumTransactions(previousTransactions);
  const newlyMinted = sumTransactions(newTransactions);
  const totalMCap = previouslyMinted + newlyMinted;

  const tradingVolume = newTransactions.reduce(
    (sum, t) => sum + toJoy(new BN(t.pricePaid)),
    0,
  );

  const totalRevenueShares = revenueSplits.events
    .flatMap((event) => {
      if (!("revenueShare" in event.data) || !event.data.revenueShare) {
        return [];
      }
      return event.data.revenueShare.stakers.map((staker) =>
        toJoy(new BN(staker.earnings)),
      );
    })
    .reduce((sum, amount) => sum + amount, 0);

  return {
    totalMCap,
    newlyIssuedTokens: newCrts.creatorTokens.length,
    tradingVolume,
    totalRevenueShares,
    chartData: chart(startDate, endDate, newCrts.creatorTokens),
  };
};

type GetTransactionsQuery<T extends Partial<AmmTransaction>> = (arg: {
  start: number;
  end: number;
  limit: number;
  offset: number;
}) => Promise<{ ammTransactions: T[] }>;
const getTransactions = async <T extends Partial<AmmTransaction>>(
  start: number,
  end: number,
  getTransactionsQuery: GetTransactionsQuery<T>,
): Promise<T[]> => {
  const transactions = [];
  for (let offset = 0; ; offset += limit) {
    const { ammTransactions } = await getTransactionsQuery({
      start,
      end,
      limit,
      offset,
    });
    if (ammTransactions.length === 0) {
      return transactions;
    }
    transactions.push(...ammTransactions);
  }
};

const sumTransactions = (
  transactions: Pick<AmmTransaction, "pricePaid" | "transactionType">[],
) => transactions.reduce((sum, t) => sum + transactionValue(t), 0);

const transactionValue = (
  t: Pick<AmmTransaction, "pricePaid" | "transactionType">,
): number => (t.transactionType === "SELL" ? 0 : toJoy(new BN(t.pricePaid)));

const chart = (
  startDate: Date,
  endDate: Date,
  creatorTokens: Pick<CreatorToken, "createdAt">[],
): { date: Date; count: number }[] => {
  let crts = [...creatorTokens];
  return dayRange(startDate, endDate).map((dayTsp) => {
    const nextDayTsp = dayTsp + A_DAY;

    const nextDayTxIndex = crts.findIndex(
      (tx) => new Date(tx.createdAt).getTime() > nextDayTsp,
    );
    const dayTxs = crts.splice(
      0,
      nextDayTxIndex === -1 ? crts.length : nextDayTxIndex,
    );

    return { date: new Date(dayTsp), count: dayTxs.length };
  });
};
