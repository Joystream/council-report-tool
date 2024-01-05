import { toJoy } from "@/helpers";
import { ApiPromise } from "@polkadot/api";
import { HexString } from "@polkadot/util/types";

export async function getCouncilBudget(
  api: ApiPromise,
  startBlock: HexString,
  endBlock?: HexString,
) {
  const startBudget = toJoy(
    await (await api.at(startBlock)).query.council.budget(),
  );
  const endBudget = endBlock
    ? toJoy(await (await api.at(endBlock)).query.council.budget())
    : 0;

  return { startCouncilBudget: startBudget, endCouncilBudget: endBudget };
}
