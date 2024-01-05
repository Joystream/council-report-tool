import { ApiPromise } from "@polkadot/api";
import { HexString } from "@polkadot/util/types";
import { wgSalaryType } from "./type";
import { GroupIdToGroupParam, GroupIdName } from "@/types";
import {
  getWorkerByMemberId,
  getWGSpendingWithReceiverID,
  getWGWorkersRewards,
  getWGBudgetSpending,
} from "..";
import { string2Joy } from "@/helpers";

export async function getWorkingGroupSalary(
  api: ApiPromise,
  block: HexString,
  startDate: Date,
  endDate: Date,
  startBlockNumber: number,
  endBlockNumber: number,
) {
  const _api = block ? await api.at(block) : api;
  let salary = {} as {
    [key in GroupIdName]: wgSalaryType;
  };
  const budgetSpendingPerWG = await getWGBudgetSpending(
    startBlockNumber,
    endBlockNumber,
  );
  const rewardsPerWGPerWorker = await getWGWorkersRewards(
    startBlockNumber,
    endBlockNumber,
  );
  const promises = Object.keys(GroupIdToGroupParam).map(async (_group) => {
    const group = _group as GroupIdName;
    const currentLead = await _api.query[group].currentLead();

    salary[group] = {
      regularSalaries: Object.keys(rewardsPerWGPerWorker[group])
        .filter((id) => id !== currentLead.toString())
        .reduce((acc, id) => {
          return acc + rewardsPerWGPerWorker[group][id];
        }, 0),
      discretionarySpending: budgetSpendingPerWG[group],
      leadRewards: rewardsPerWGPerWorker[group][currentLead.toString()],
    };
  });
  await Promise.all(promises);
  return salary;
}
