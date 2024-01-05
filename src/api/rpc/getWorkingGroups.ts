import { ApiPromise } from "@polkadot/api";
import { HexString } from "@polkadot/util/types";
import { toJoy } from "@/helpers";
import { getMemeberShipHandle, getWGFilledPosition } from "..";
import { GroupIdToGroupParam, GroupIdName, GroupShortIDName } from "@/types";

export async function getWorkingGroups(api: ApiPromise, block?: HexString) {
  const _api = block ? await api.at(block) : api;
  let workingGroup = {} as {
    [key in GroupShortIDName]: {
      leadName: any;
      budget: number;
      workerNumber: number;
    };
  };
  const promises = Object.keys(GroupIdToGroupParam).map(async (_group) => {
    const group = _group as GroupIdName;
    const memberIDs: Array<string> = [];
    let workerNumber = 0;
    let activeWorkerNumber = 0;
    let wg = {
      leadName: "",
      budget: 0,
      workerNumber: 0,
    };
    wg.budget = toJoy(await _api.query[group].budget());
    const currentLead = await _api.query[group].currentLead();
    if (!currentLead.isNone) {
      const memeberID = (
        await _api.query[group].workerById(Number(currentLead.unwrap()))
      ).unwrap().memberId;
      wg.leadName = await getMemeberShipHandle(memeberID.toString());
    }
    const _activeWorkers = await _api.query[group].activeWorkerCount();
    const _nextWorkerId = await _api.query[group].nextWorkerId();
    const activeWorkers = Number(_activeWorkers);
    const nextWorkerId = Number(_nextWorkerId);
    for (let i = 0; i < nextWorkerId; i++) {
      const _workerInfo = await _api.query[group].workerById(i);
      if (activeWorkers == workerNumber) continue;
      if (!_workerInfo.isNone) {
        const workerInfo = _workerInfo.unwrap();
        if (workerInfo.startedLeavingAt.isNone) {
          const memebrID = workerInfo.memberId.toString();
          const flag = memberIDs.find((a) => {
            return a == memebrID;
          });
          if (flag) continue;
          memberIDs.push(memebrID);
          activeWorkerNumber++;
        }
        workerNumber++;
      }
    }
    wg.workerNumber = workerNumber;
    workingGroup[GroupIdToGroupParam[_group as GroupIdName]] = wg;
  });
  await Promise.all(promises);
  return workingGroup;
}

export const getWGWorkerStatus = async (
  api: ApiPromise,
  endBlock: HexString,
  startDate: Date,
  endDate: Date,
) => {
  let wgWorkers = await getWorkingGroups(api, endBlock);
  const wgWorkerStatus = {} as {
    [key in GroupShortIDName]: {
      headCound: number;
      hired: number;
      fired: number;
      left: number;
    };
  };
  let total = {
    headCound: 0,
    hired: 0,
    fired: 0,
    left: 0,
  };
  const promise = Object.keys(GroupIdToGroupParam).map(async (_group) => {
    const { workerFired, workerHired, workerLeft } = await getWGFilledPosition(
      startDate,
      endDate,
      _group,
    );
    total.headCound +=
      wgWorkers[GroupIdToGroupParam[_group as GroupIdName]].workerNumber;
    total.hired += workerHired;
    total.fired += workerFired;
    total.left += workerLeft;
    let wgStatus = {
      headCound:
        wgWorkers[GroupIdToGroupParam[_group as GroupIdName]].workerNumber,
      hired: workerHired,
      fired: workerFired,
      left: workerLeft,
    };
    wgWorkerStatus[GroupIdToGroupParam[_group as GroupIdName]] = wgStatus;
  });
  await Promise.all(promise);
  return {
    wgWorkerStatus,
    wgWorkerTotal: total,
  };
};
