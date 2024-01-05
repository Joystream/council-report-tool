import { toJoy } from "@/helpers";
import { GroupIdToGroupParam, GroupIdName } from "@/types";
import { ApiPromise } from "@polkadot/api";
import { HexString } from "@polkadot/util/types";

export async function getWorkingGroupBudget(
  api: ApiPromise,
  startBlock: HexString,
  endBlock: HexString,
) {
  const budgets = {} as {
    [key in GroupIdName]: {
      startBudget: number;
      endBudget: number;
    };
  };

  const promises = Object.keys(GroupIdToGroupParam).map(async (group) => {
    const startBudget = toJoy(
      await (await api.at(startBlock)).query[group as GroupIdName].budget(),
    );
    const endBudget = toJoy(
      await (await api.at(endBlock)).query[group as GroupIdName].budget(),
    );
    budgets[group as GroupIdName] = { startBudget, endBudget };
  });
  await Promise.all(promises);
  return budgets;
}
