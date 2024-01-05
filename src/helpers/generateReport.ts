import { ApiPromise } from "@polkadot/api";
import moment from "moment";
import {
  getBalance,
  getBlockHash,
  getChannelStatus,
  getMembershipStatus,
  getProposals,
  getVideoNftStatus,
  getVideoStatus,
  getTotalSupply,
  getMembershipCount,
  getOfficialCirculatingSupply,
  getOfficialTotalSupply,
  getWorkingGroupBudget,
  getWGRefillProposal,
  client as graphQLClient,
  getSdk,
  getWorkingGroups,
  getStorageStatus,
  getWorkingGroupSalary,
  getCouncilReward,
  getFundingProposal,
  getCreatorPayoutReward,
  getValidatorReward,
  getWGWorkerStatus,
  getElectionRoundWithUniqueID,
  getElectedCouncils,
  getForumThreadStatus,
  getForumPostStatus,
  getProposalStatus,
  getCouncilBudget,
  getCouncilRefill,
  getBurnedToken,
  getWGSpendingProposal,
} from "@/api";
import { MEXC_WALLET, defaultDateTimeFormat } from "@/config";
import { toJoy, string2Joy } from "./bn";
import {
  GroupIdName,
  GroupIdToGroupParam,
  GroupShortIDName,
  OverallBudgetKeys,
} from "@/types";
import { decimalAdjust, decimal3DAdjust } from "./utils";
import { DailyData, wgBudgetType } from "@/hooks/types";
const INITIAL_SUPPLY = 1_000_000_000;

export async function generateReport1(
  api: ApiPromise,
  blockNumber: number,
  storageFlag: boolean,
) {
  const { GetVideoCount, GetChannelsCount, GetNftIssuedCount } =
    getSdk(graphQLClient);
  const blockHash = await getBlockHash(api, blockNumber);
  const blockTimestamp = new Date(
    (await (await api.at(blockHash)).query.timestamp.now()).toNumber(),
  );
  const general = {
    block: blockNumber,
    hash: blockHash,
    timestamp: moment(blockTimestamp).format(defaultDateTimeFormat),
  };
  const {
    videosConnection: { totalCount: videoCount },
  } = await GetVideoCount({
    where: { createdInBlock_lte: blockNumber },
  });
  const {
    channelsConnection: { totalCount: channelCount },
  } = await GetChannelsCount({
    where: {
      createdAt_lte: blockTimestamp,
    },
  });
  const { endCount } = await getChannelStatus(blockNumber);
  const {
    nftIssuedEventsConnection: { totalCount: nftCount },
  } = await GetNftIssuedCount({
    where: { createdAt_lte: blockTimestamp },
  });
  let content = {
    videoCount,
    channelCount,
    nonEmptyChannelCount: endCount,
    nftCount,
    totalStorage: 0,
  };
  if (storageFlag) {
    const { endStorage } = await getStorageStatus(blockTimestamp);
    content.totalStorage = endStorage;
  }

  const totalSupply = toJoy(await getTotalSupply(api, blockHash));
  const currentTotalSupply = await getOfficialTotalSupply();
  const currentCirculatingSupply = await getOfficialCirculatingSupply();

  const inflation = ((totalSupply - INITIAL_SUPPLY) / INITIAL_SUPPLY) * 100;

  const supply = {
    totalSupply,
    currentTotalSupply,
    currentCirculatingSupply,
    inflation,
  };

  const totalMembership = await getMembershipCount(blockTimestamp);
  const workingGroups = await getWorkingGroups(api, blockHash);

  return {
    general,
    content,
    supply,
    totalMembership,
    workingGroups,
  };
}

export async function generateReport2(
  api: ApiPromise,
  storageFlag: boolean,
  startBlockNumber: number,
  endBlockNumber: number,
) {
  // 1. https://github.com/0x2bc/council/blob/main/Automation_Council_and_Weekly_Reports.md#general-1
  // const burnedToken = await getBurnedToken();
  const startBlockHash = await getBlockHash(api, startBlockNumber);
  const startBlockTimestamp = new Date(
    (await (await api.at(startBlockHash)).query.timestamp.now()).toNumber(),
  );

  const startBlock = {
    number: startBlockNumber,
    hash: startBlockHash,
    timestamp: moment(startBlockTimestamp).format(defaultDateTimeFormat),
  };

  const endBlockHash = await getBlockHash(api, endBlockNumber);
  const endBlockTimestamp = new Date(
    (await (await api.at(endBlockHash)).query.timestamp.now()).toNumber(),
  );
  const endBlock = {
    number: endBlockNumber,
    hash: endBlockHash,
    timestamp: moment(endBlockTimestamp).format(defaultDateTimeFormat),
  };
  const general = {
    startBlock,
    endBlock,
  };
  // 2. https://github.com/0x2bc/council/blob/main/Automation_Council_and_Weekly_Reports.md#issuance

  const startIssuance = toJoy(await getTotalSupply(api, startBlockHash));
  const endIssuance = toJoy(await getTotalSupply(api, endBlockHash));
  const issuanceChange = endIssuance - startIssuance;

  const issuance = {
    startBlock: startIssuance,
    endBlock: endIssuance,
    changedIssuance: issuanceChange,
  };

  // 3. https://github.com/0x2bc/council/blob/main/Automation_Council_and_Weekly_Reports.md#mexc-exchange-wallet

  const startBalance = toJoy(
    await getBalance(api, MEXC_WALLET, startBlockHash),
  );
  const endBalance = toJoy(await getBalance(api, MEXC_WALLET, endBlockHash));
  const mexcBalChange = endBalance - startBalance;
  const mexc = {
    startBlock: startBalance,
    endBlock: endBalance,
    changedBalance: mexcBalChange,
  };

  // // 5. https://github.com/0x2bc/council/blob/main/Automation_Council_and_Weekly_Reports.md#dao-spending
  const councilReward = await getCouncilReward(
    startBlockNumber,
    endBlockNumber,
  );
  const councilRewardBudget = councilReward.reduce((a, b) => a + b.amount, 0);
  const validatorRewardsBudget = await getValidatorReward(
    api,
    startBlockHash,
    endBlockHash,
  );
  const wgRefillProposal = await getWGRefillProposal(
    startBlockTimestamp,
    endBlockTimestamp,
  );
  const wgudget = await getWorkingGroupBudget(
    api,
    startBlockHash,
    endBlockHash,
  );
  let wgSpent = Object.keys(wgudget).reduce(
    (a, b) =>
      a +
      wgudget[b as GroupIdName].startBudget -
      wgudget[b as GroupIdName].endBudget,
    0,
  );
  const wgRefillBudget = Object.keys(wgRefillProposal).reduce(
    (a, b) => a + wgRefillProposal[b as GroupIdName],
    0,
  );
  wgSpent += wgRefillBudget;
  const creatorPayoutRewardBudget = await getCreatorPayoutReward(
    startBlockNumber,
    endBlockNumber,
  );
  const fundingProposalBudget = await getFundingProposal(
    startBlockNumber,
    endBlockNumber,
  );
  const grandTotal =
    councilRewardBudget +
    wgSpent +
    fundingProposalBudget +
    creatorPayoutRewardBudget +
    validatorRewardsBudget;
  const daoSpending = {
    startIssuance,
    endIssuance,
    mintedToken: issuanceChange,
    councilReward: councilRewardBudget,
    wgSpent,
    fundingProposals: fundingProposalBudget,
    creatorPayoutRewards: creatorPayoutRewardBudget,
    validatorRewards: validatorRewardsBudget,
    fees: grandTotal - issuanceChange,
    grandTotal,
  };
  const totalSupply = toJoy(await getTotalSupply(api, endBlockHash));
  const circulatingSupply = await getOfficialCirculatingSupply();
  const inflation = ((totalSupply - INITIAL_SUPPLY) / INITIAL_SUPPLY) * 100;

  const supply = {
    totalSupply,
    inflationChanged: decimalAdjust(inflation),
    circulatingSupply,
    mintedToken: issuanceChange,
    burnedToken: grandTotal - issuanceChange,
  };

  // 8. https://github.com/0x2bc/council/blob/main/Automation_Council_and_Weekly_Reports.md#videos
  const videos = await getVideoStatus(startBlockNumber, endBlockNumber);

  const mediaStorage = {
    startBlock: 0,
    endBlock: 0,
    growthQty: 0,
    growthPct: 0,
    chartData: [] as Array<DailyData>,
  };

  if (storageFlag) {
    const { startStorage, endStorage, chartData } = await getStorageStatus(
      endBlockTimestamp,
      startBlockTimestamp,
    );
    mediaStorage.startBlock = startStorage;
    mediaStorage.endBlock = endStorage;
    mediaStorage.growthQty = decimalAdjust(endStorage - startStorage);
    mediaStorage.growthPct = decimalAdjust(endStorage / startStorage - 1) * 100;
    mediaStorage.chartData = chartData;
  }

  // 9. https://github.com/0x2bc/council/blob/main/Automation_Council_and_Weekly_Reports.md#channels
  const nonEmptyChannelStatus = await getChannelStatus(
    endBlockNumber,
    startBlockTimestamp,
  );
  const nonEmptyChannel = {
    startBlock: nonEmptyChannelStatus.startCount,
    endBlock: nonEmptyChannelStatus.endCount,
    growthQty:
      nonEmptyChannelStatus.endCount - nonEmptyChannelStatus.startCount,
    growthPct: decimalAdjust(
      (nonEmptyChannelStatus.endCount / nonEmptyChannelStatus.startCount - 1) *
        100,
    ),
    chartData: nonEmptyChannelStatus.chartData,
  };

  // 11. https://github.com/0x2bc/council/blob/main/Automation_Council_and_Weekly_Reports.md#video-nfts
  const videoNFTs = await getVideoNftStatus(
    startBlockTimestamp,
    endBlockTimestamp,
  );

  // 12. https://github.com/0x2bc/council/blob/main/Automation_Council_and_Weekly_Reports.md#membership-1
  const membership = await getMembershipStatus(
    startBlockTimestamp,
    endBlockTimestamp,
  );

  // 13. https://github.com/0x2bc/council/blob/main/Automation_Council_and_Weekly_Reports.md#proposals
  const proposals = (
    await getProposals(startBlockTimestamp, endBlockTimestamp)
  ).map((p) => ({
    id: p.id,
    title: p.title,
    status: p.status,
    createdAt: p.createdAt,
    councilApprovals: p.councilApprovals,
  }));

  const executed = proposals.filter((p) => p.status === "executed");
  const deciding = proposals.filter((p) => p.status === "deciding");
  // const notPassedStatuses: ProposalStatus[] = [
  //   "vetoed",
  //   "executionFailed",
  //   "slashed",
  //   "rejected",
  //   "expired",
  //   "cancelled",
  //   "canceledByRuntime",
  // ];
  // const notPassed = proposals
  //   .filter((p) =>
  //     notPassedStatuses.includes(p.status)
  //   );
  // const underReviewStatuses: ProposalStatus[] = [
  //   "deciding",
  //   "gracing",
  //   "dormant",
  // ];
  // const underReview = proposals
  //   .filter((p) =>
  //     underReviewStatuses.includes(p.status)
  //   );

  return {
    general,
    issuance,
    mexc,
    supply,
    daoSpending,
    videos,
    nonEmptyChannel,
    videoNFTs,
    membership,
    mediaStorage: storageFlag ? mediaStorage : undefined,
    proposals: {
      executed,
      deciding,
    },
  };
}

// Council report
export async function generateReport4(
  api: ApiPromise,
  roundNumber: string,
  startBlockNumber: number,
  endBlockNumber: number,
  prevEMA: number,
  curEMA: Number,
  storageFlag: boolean,
) {
  // general
  const startBlockHash = await getBlockHash(api, startBlockNumber);
  const startBlockTimestamp = new Date(
    (await (await api.at(startBlockHash)).query.timestamp.now()).toNumber(),
  );
  const endBlockHash = await getBlockHash(api, endBlockNumber);
  const endBlockTimestamp = new Date(
    (await (await api.at(endBlockHash)).query.timestamp.now()).toNumber(),
  );

  const general = {
    startBlock: {
      block: startBlockNumber,
      hash: startBlockHash,
      timeStamp: moment(startBlockTimestamp).format(defaultDateTimeFormat),
    },
    endBlock: {
      block: endBlockNumber,
      hash: endBlockHash,
      timeStamp: moment(endBlockTimestamp).format(defaultDateTimeFormat),
    },
  };
  let currentTerm = 0;

  // composition
  const electionRound = await getElectionRoundWithUniqueID(roundNumber);
  let composition = undefined;
  let councilInfo = undefined;
  if (!electionRound) {
    composition = undefined;
  } else {
    const castVotes = electionRound.castVotes.reduce(
      (a, b) => a + string2Joy(b.stake),
      0,
    );
    currentTerm = electionRound.cycleId;
    const candiates: Array<{
      member: string;
      pct: number;
    }> = [];
    electionRound.candidates.map((c) => {
      let candiate = {
        member: c.member.handle,
        pct: Math.ceil((string2Joy(c.votePower) / castVotes) * 100),
      };
      candiates.push(candiate);
    });
    composition = candiates;
    councilInfo = {
      id: electionRound.id,
      cycleID: electionRound.cycleId,
    };
  }

  // EMA 30
  const EMA30 = {
    prevEMA,
    curEMA,
  };
  // inflation

  const startIssuance = toJoy(await getTotalSupply(api, startBlockHash));
  const endIssuance = toJoy(await getTotalSupply(api, endBlockHash));
  const startInflation =
    ((startIssuance - INITIAL_SUPPLY) / INITIAL_SUPPLY) * 100;
  const endInflation = ((endIssuance - INITIAL_SUPPLY) / INITIAL_SUPPLY) * 100;
  const inflationChange = decimalAdjust(endInflation - startInflation);
  const issuanceChange = endIssuance - startIssuance;

  let projectInflations: Array<{
    term: number;
    mintedToken: number;
    inflation: number;
  }> = [];
  const electedCouncils = await getElectedCouncils();

  const promise = electedCouncils.map(async (e, index) => {
    if (e.endedAtBlock) {
      let inflation_tmp = {
        term: index + 1,
        mintedToken: 0,
        inflation: 0,
      };
      const startElectedBlockHash = await getBlockHash(api, e.electedAtBlock);
      const endElectedBlockHash = await getBlockHash(api, e.endedAtBlock);
      const startElectedIssuance = toJoy(
        await getTotalSupply(api, startElectedBlockHash),
      );
      const endElectedIssuance = toJoy(
        await getTotalSupply(api, endElectedBlockHash),
      );
      const changedIssuanceOfElection =
        (endElectedIssuance - startElectedIssuance) / Math.pow(10, 6);
      const startElectedInflation =
        ((startElectedIssuance - INITIAL_SUPPLY) / INITIAL_SUPPLY) * 100;
      const endElectedInflation =
        ((endElectedIssuance - INITIAL_SUPPLY) / INITIAL_SUPPLY) * 100;
      const inflationChanged = endElectedInflation - startElectedInflation;
      inflation_tmp.inflation = inflationChanged;
      inflation_tmp.mintedToken = changedIssuanceOfElection;
      projectInflations.push(inflation_tmp);
    }
  });

  await Promise.all(promise);
  projectInflations = projectInflations.sort((a, b) => {
    return a.term - b.term;
  });
  let yearMintedToken = projectInflations.reduce(
    (a, b) => a + b.mintedToken,
    0,
  );
  let yearInflation = projectInflations.reduce((a, b) => a + b.inflation, 0);
  if (projectInflations.length < 24) {
    const leftCouncil = 24 - projectInflations.length;
    yearMintedToken += (leftCouncil * issuanceChange) / Math.pow(10, 6);
    yearInflation += leftCouncil * inflationChange;
  }
  const inflation = {
    startBlock: startIssuance,
    endBlock: endIssuance,
    changedIssuance: issuanceChange,
    Inflation: inflationChange,
    yearMintedToken: yearMintedToken,
    yearInflation: yearInflation,
  };

  const { wgWorkerStatus, wgWorkerTotal } = await getWGWorkerStatus(
    api,
    startBlockHash,
    startBlockTimestamp,
    endBlockTimestamp,
  );

  // nonEmptyChannel

  const { startCount, endCount } = await getChannelStatus(
    endBlockNumber,
    startBlockTimestamp,
  );
  const nonEmptyChannel = {
    startBlock: startCount,
    endBlock: endCount,
    growthQty: endCount - startCount,
    growthPct: (endCount / startCount - 1) * 100,
  };

  // video

  const videoStatus = await getVideoStatus(startBlockNumber, endBlockNumber);
  const videos = {
    startBlock: videoStatus.startBlock,
    endBlock: videoStatus.endBlock,
    growthQty: videoStatus.growthQty,
    growthPct: videoStatus.growthPct,
  };

  // storage
  let mediaStorage = {
    startBlock: 0,
    endBlock: 0,
    growthQty: 0,
    growthPct: 0,
  };
  if (storageFlag) {
    const { endStorage, startStorage } = await getStorageStatus(
      endBlockTimestamp,
      startBlockTimestamp,
    );
    mediaStorage.startBlock = startStorage;
    mediaStorage.endBlock = endStorage;
    mediaStorage.growthQty = decimalAdjust(endStorage - startStorage);
    mediaStorage.growthPct = (endStorage / startStorage - 1) * 100;
  }

  // membership

  const membershipstatus = await getMembershipStatus(
    startBlockTimestamp,
    endBlockTimestamp,
  );

  const membership = {
    startBlock: membershipstatus.startBlock,
    endBlock: membershipstatus.endBlock,
    growthQty: membershipstatus.growthQty,
    growthPct: membershipstatus.growthPct,
  };

  // forum thread ,post

  const thread = await getForumThreadStatus(
    startBlockTimestamp,
    endBlockTimestamp,
  );
  const post = await getForumPostStatus(startBlockTimestamp, endBlockTimestamp);

  const forum = {
    thread,
    post,
  };
  // proposal status
  const proposal = await getProposalStatus(
    startBlockTimestamp,
    endBlockTimestamp,
  );
  // calculate the current WG budget
  let wgBudgetsOfJoy = {} as {
    [key in GroupShortIDName]: wgBudgetType;
  };
  let wgBudgetOfJoyTotal: wgBudgetType = {
    startWGBudget: 0,
    endWGBudget: 0,
    refillBudget: 0,
    regularSalaries: 0,
    leadRewards: 0,
    discretionarySpending: 0,
    totalSpending: 0,
  };
  let wgBudgetsOfUsd = {} as {
    [key in GroupShortIDName]: wgBudgetType;
  };
  let wgBudgetOfUsdTotal: wgBudgetType = {
    startWGBudget: 0,
    endWGBudget: 0,
    refillBudget: 0,
    regularSalaries: 0,
    leadRewards: 0,
    discretionarySpending: 0,
    totalSpending: 0,
  };
  let wgSpending = {} as {
    [key in GroupShortIDName]: {
      id: string;
      prevSpendingOfJoy: number;
      prevSpendingOfUsd: number;
      currentSpendingOfJoy: number;
      currentSpendingOfUsd: number;
    };
  };
  let wgSpendingTotal = {
    prevSpendingOfJoy: 0,
    prevSpendingOfUsd: 0,
    currentSpendingOfJoy: 0,
    currentSpendingOfUsd: 0,
  };
  const currentWGRefillProposal = await getWGRefillProposal(
    startBlockTimestamp,
    endBlockTimestamp,
  );
  const currentWGBudget = await getWorkingGroupBudget(
    api,
    startBlockHash,
    endBlockHash,
  );
  const currentWGSalary = await getWorkingGroupSalary(
    api,
    endBlockHash,
    startBlockTimestamp,
    endBlockTimestamp,
    startBlockNumber,
    endBlockNumber,
  );
  const prevTermStartBlock = electedCouncils[currentTerm - 2].electedAtBlock;
  const prevTermStartTimeStamp = electedCouncils[currentTerm - 2].electedAtTime;
  let prevTermEndBlock = electedCouncils[currentTerm - 2].endedAtBlock;
  let prevTermEndTimeStamp = electedCouncils[currentTerm - 2].endedAtTime;
  if (!prevTermEndBlock) {
    prevTermEndBlock = prevTermStartBlock;
    prevTermEndTimeStamp = prevTermStartTimeStamp;
  }

  const prevTermStartBlockHash = await getBlockHash(api, prevTermStartBlock);
  const prevTermEndBlockHash = await getBlockHash(api, prevTermEndBlock);
  const prevStartElectedIssuance = toJoy(
    await getTotalSupply(api, prevTermStartBlockHash),
  );
  const prevEndElectedIssuance = toJoy(
    await getTotalSupply(api, prevTermEndBlockHash),
  );
  const prevTermissuanceChange =
    prevEndElectedIssuance - prevStartElectedIssuance;
  const prevWGRefillProposal = await getWGRefillProposal(
    new Date(prevTermStartTimeStamp),
    new Date(prevTermEndTimeStamp),
  );
  const prevWGBudget = await getWorkingGroupBudget(
    api,
    prevTermStartBlockHash,
    prevTermEndBlockHash,
  );
  Object.keys(GroupIdToGroupParam).map(async (_group) => {
    type wgDataType = keyof typeof wgBudgetOfJoyTotal;
    const wgRefill = currentWGRefillProposal[_group as GroupIdName] || 0;
    let wgDataOfJoy: wgBudgetType = {
      startWGBudget: currentWGBudget[_group as GroupIdName].startBudget,
      endWGBudget: currentWGBudget[_group as GroupIdName].endBudget,
      refillBudget: wgRefill,
      totalSpending:
        currentWGBudget[_group as GroupIdName].startBudget -
        currentWGBudget[_group as GroupIdName].endBudget +
        wgRefill,
      regularSalaries: currentWGSalary[_group as GroupIdName].regularSalaries,
      discretionarySpending:
        currentWGSalary[_group as GroupIdName].discretionarySpending,
      leadRewards: currentWGSalary[_group as GroupIdName].leadRewards,
    };
    if (currentWGRefillProposal[_group as GroupIdName]) {
      wgDataOfJoy.refillBudget = currentWGRefillProposal[_group as GroupIdName];
    }
    let wgSpent =
      wgDataOfJoy.startWGBudget +
      wgDataOfJoy.refillBudget -
      wgDataOfJoy.endWGBudget;
    let wgDataOfUsd: wgBudgetType = {
      startWGBudget: wgDataOfJoy.startWGBudget * Number(EMA30.curEMA),
      endWGBudget: wgDataOfJoy.endWGBudget * Number(EMA30.curEMA),
      totalSpending: wgDataOfJoy.totalSpending * Number(EMA30.curEMA),
      refillBudget: wgDataOfJoy.refillBudget * Number(EMA30.curEMA),
      regularSalaries: wgDataOfJoy.regularSalaries * Number(EMA30.curEMA),
      leadRewards: wgDataOfJoy.leadRewards * Number(EMA30.curEMA),
      discretionarySpending:
        wgDataOfJoy.discretionarySpending * Number(EMA30.curEMA),
    };
    let prevSpendingOfJoy =
      prevWGBudget[_group as GroupIdName].startBudget -
      prevWGBudget[_group as GroupIdName].endBudget;
    if (prevWGRefillProposal[_group as GroupIdName])
      prevSpendingOfJoy += prevWGRefillProposal[_group as GroupIdName];
    let wgSpending_tmp = {
      id: GroupIdToGroupParam[_group as GroupIdName] as GroupShortIDName,
      prevSpendingOfJoy: prevSpendingOfJoy,
      prevSpendingOfUsd: prevSpendingOfJoy * Number(EMA30.prevEMA),
      currentSpendingOfJoy: wgSpent,
      currentSpendingOfUsd: wgSpent * Number(EMA30.curEMA),
    };
    wgSpending[GroupIdToGroupParam[_group as GroupIdName] as GroupShortIDName] =
      wgSpending_tmp;
    wgBudgetsOfUsd[
      GroupIdToGroupParam[_group as GroupIdName] as GroupShortIDName
    ] = wgDataOfUsd;
    wgBudgetsOfJoy[
      GroupIdToGroupParam[_group as GroupIdName] as GroupShortIDName
    ] = wgDataOfJoy;
    Object.keys(wgDataOfJoy).map((_budgetType) => {
      wgBudgetOfJoyTotal[_budgetType as wgDataType] +=
        wgDataOfJoy[_budgetType as wgDataType];
      wgBudgetOfUsdTotal[_budgetType as wgDataType] +=
        wgDataOfUsd[_budgetType as wgDataType];
    });
    wgSpendingTotal.currentSpendingOfJoy += wgSpending_tmp.currentSpendingOfJoy;
    wgSpendingTotal.currentSpendingOfUsd += wgSpending_tmp.currentSpendingOfUsd;
    wgSpendingTotal.prevSpendingOfJoy += wgSpending_tmp.prevSpendingOfJoy;
    wgSpendingTotal.prevSpendingOfUsd += wgSpending_tmp.prevSpendingOfUsd;
  });

  // Overall Budget

  const overallBudget = {} as {
    [key in OverallBudgetKeys]: {
      id: string;
      prevSpendingOfJoy: number;
      prevSpendingOfUsd: number;
      currentSpendingOfJoy: number;
      currentSpendingOfUsd: number;
    };
  };

  const councilReward = await getCouncilReward(
    startBlockNumber,
    endBlockNumber,
  );
  const councilRewardBudget = councilReward.reduce((a, b) => a + b.amount, 0);
  const prevCouncilReward = await getCouncilReward(
    prevTermStartBlock,
    prevTermEndBlock,
  );
  const prevCouncilRewardBudget = prevCouncilReward.reduce(
    (a, b) => a + b.amount,
    0,
  );

  overallBudget["councilReward"] = {
    id: "councilReward",
    currentSpendingOfJoy: councilRewardBudget,
    currentSpendingOfUsd: councilRewardBudget * Number(EMA30.curEMA),
    prevSpendingOfJoy: prevCouncilRewardBudget,
    prevSpendingOfUsd: prevCouncilRewardBudget * Number(EMA30.prevEMA),
  };
  const validatorRewardsBudget = await getValidatorReward(
    api,
    startBlockHash,
    endBlockHash,
  );
  const prevValidatorRewardsBudget = await getValidatorReward(
    api,
    prevTermStartBlockHash,
    prevTermEndBlockHash,
  );
  overallBudget["validatorReward"] = {
    id: "validatorReward",
    currentSpendingOfJoy: validatorRewardsBudget,
    currentSpendingOfUsd: validatorRewardsBudget * Number(EMA30.curEMA),
    prevSpendingOfJoy: prevValidatorRewardsBudget,
    prevSpendingOfUsd: prevValidatorRewardsBudget * Number(EMA30.prevEMA),
  };
  const fundingProposalBudget = await getFundingProposal(
    startBlockNumber,
    endBlockNumber,
  );
  const prevFundingProposalBudget = await getFundingProposal(
    prevTermStartBlock,
    prevTermEndBlock,
  );
  overallBudget["fundingProposal"] = {
    id: "fundingProposal",
    currentSpendingOfJoy: fundingProposalBudget,
    currentSpendingOfUsd: fundingProposalBudget * Number(EMA30.curEMA),

    prevSpendingOfJoy: prevFundingProposalBudget,
    prevSpendingOfUsd: prevFundingProposalBudget * Number(EMA30.prevEMA),
  };
  const creatorPayoutRewardBudget = await getCreatorPayoutReward(
    startBlockNumber,
    endBlockNumber,
  );
  const prevCreatorPayoutRewardBudget = await getCreatorPayoutReward(
    prevTermStartBlock,
    prevTermEndBlock,
  );
  overallBudget["creatorPayoutReward"] = {
    id: "creatorPayoutReward",
    currentSpendingOfJoy: creatorPayoutRewardBudget,
    currentSpendingOfUsd: creatorPayoutRewardBudget * Number(EMA30.curEMA),
    prevSpendingOfJoy: prevCreatorPayoutRewardBudget,
    prevSpendingOfUsd: prevCreatorPayoutRewardBudget * Number(EMA30.prevEMA),
  };

  const totalWgSpending = Object.keys(wgSpending).reduce(
    (a, b) => a + wgSpending[b as GroupShortIDName].currentSpendingOfJoy,
    0,
  );
  const prevTotalWgSpending = Object.keys(wgSpending).reduce(
    (a, b) => a + wgSpending[b as GroupShortIDName].prevSpendingOfJoy,
    0,
  );
  overallBudget["wgSpending"] = {
    id: "wgSpending",
    currentSpendingOfJoy: totalWgSpending,
    currentSpendingOfUsd: totalWgSpending * Number(EMA30.curEMA),
    prevSpendingOfJoy: prevTotalWgSpending,
    prevSpendingOfUsd: prevTotalWgSpending * Number(EMA30.prevEMA),
  };
  const grandTotal =
    councilRewardBudget +
    totalWgSpending +
    fundingProposalBudget +
    creatorPayoutRewardBudget +
    validatorRewardsBudget;
  const prevGrandTotal =
    prevCouncilRewardBudget +
    prevTotalWgSpending +
    prevFundingProposalBudget +
    prevCreatorPayoutRewardBudget +
    prevValidatorRewardsBudget;
  overallBudget["grandTotal"] = {
    id: "grandTotal",
    currentSpendingOfJoy: grandTotal,
    currentSpendingOfUsd: grandTotal * Number(EMA30.curEMA),
    prevSpendingOfJoy: prevGrandTotal,
    prevSpendingOfUsd: prevGrandTotal * Number(EMA30.prevEMA),
  };
  const fees = grandTotal - issuanceChange;
  // const prevFees = prevGrandTotal - prevTermissuanceChange;
  overallBudget["fees"] = {
    id: "fees",
    currentSpendingOfJoy: fees,
    currentSpendingOfUsd: fees * Number(EMA30.curEMA),
    prevSpendingOfJoy: 0,
    prevSpendingOfUsd: 0,
  };
  const { startCouncilBudget, endCouncilBudget } = await getCouncilBudget(
    api,
    startBlockHash,
    endBlockHash,
  );
  const refillCouncilBudget = await getCouncilRefill(
    startBlockNumber,
    endBlockNumber,
  );
  const overView = {
    startBlock: startCouncilBudget,
    spendingBudget:
      councilRewardBudget +
      creatorPayoutRewardBudget +
      wgBudgetOfJoyTotal.refillBudget +
      fundingProposalBudget,
    refillBudget: refillCouncilBudget,
    endBlock: endCouncilBudget,
  };
  return {
    general,
    overView,
    projectInflations,
    composition,
    councilInfo,
    EMA30,
    inflation,
    nonEmptyChannel,
    videos,
    mediaStorage: storageFlag ? mediaStorage : undefined,
    wgBudgetsOfJoy,
    wgBudgetOfJoyTotal,
    wgBudgetsOfUsd,
    wgBudgetOfUsdTotal,
    wgSpending,
    wgSpendingTotal,
    wgWorkerStatus,
    wgWorkerTotal,
    overallBudget,
    forum,
    proposal,
    membership,
  };
}
