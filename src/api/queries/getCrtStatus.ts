import BN from "bn.js";

import { decimalAdjust, toJoy } from "@/helpers";
import { orionSdk } from "./sdk";
import { AmmTransaction } from "./__generated__/orion.generated";

const limit = 50_000;

export const getCrtStatus = async (
  start: number,
  end: number,
  startDate: Date,
  endDate: Date,
) => {
  const { GetCrtTransactions, GetCrtTransactionsWithBlock } = orionSdk;
  const [previousTransactions, newTransactions] = await Promise.all([
    getTransactions(0, start, GetCrtTransactions),
    getTransactions(start, end, GetCrtTransactionsWithBlock),
  ]);
  const previousTotal = sumTransactions(previousTransactions);
  const growth = sumTransactions(newTransactions);
  const growthPct = decimalAdjust((growth * 100) / previousTotal);
  const total = previousTotal + growth;

  const startTsp = startDate.getTime();
  const endTsp = endDate.getTime();
  const blockToDate = (endTsp - startTsp) / (end - start);
  const chartMap = newTransactions.reduce((map, t) => {
    const value = transactionValue(t);
    const key = new Date(startTsp + (t.createdIn - start) * blockToDate)
      .toISOString()
      .split("T")[0];
    return map.set(key, (map.get(key) ?? 0) + value);
  }, new Map<string, number>());
  const chartData = Array.from(chartMap.entries()).map(([date, value]) => ({
    date: new Date(date),
    count: value,
  }));

  return { total, growth, growthPct, chartData };
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
) => {
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
) => toJoy(new BN(`${t.transactionType === "SELL" ? "-" : ""}${t.pricePaid}`));
