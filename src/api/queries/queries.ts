import { BN, BN_ZERO } from "@polkadot/util";
import moment from "moment";
import { FEE_QN_URL } from "@/config";
import { asProposal, Proposal, WorkingGroup } from "@/types";

import { getSdk } from "./__generated__/gql";
import { toJoy, decimalAdjust, string2Joy } from "@/helpers";
import { GroupIdToGroupParam, GroupIdName } from "@/types";
import { DailyData, ChannelData } from "@/hooks/types";
import { client } from "./client";
export { getSdk } from "./__generated__/gql";

// StorageDataObjects

export const getStorageChartData = async (start: Date, end: Date) => {
  const { GetStorageDataObjectsCount, GetStorageDataObjects } = getSdk(client);
  const defaultLimit = 5000;
  let curDate = moment(start).format("YYYY-MM-DD");
  let data: Array<DailyData> = [];
  let storageSize = 0;
  const {
    storageDataObjectsConnection: { totalCount },
  } = await GetStorageDataObjectsCount({
    where: {
      createdAt_lte: end,
      createdAt_gt: start,
    },
  });
  const loop = Math.ceil(totalCount / defaultLimit);
  for (let i = 0; i < loop; i++) {
    const { storageDataObjects } = await GetStorageDataObjects({
      where: {
        createdAt_lte: end,
        createdAt_gt: start,
      },
      limit: defaultLimit,
      offset: defaultLimit * i,
    });
    storageDataObjects.map((a) => {
      if (moment(a.createdAt).format("YYYY-MM-DD") == curDate) {
        storageSize += parseInt(a.size) / 1024 / 1024 / 1024;
      } else {
        data.push({
          date: new Date(curDate),
          count: storageSize,
        });
        storageSize = parseInt(a.size) / 1024 / 1024 / 1024;
        curDate = moment(a.createdAt).format("YYYY-MM-DD");
      }
    });
  }
  data.push({
    date: new Date(curDate),
    count: storageSize,
  });
  return data;
};

export const getStorageStatus = async (end: Date, start?: Date) => {
  const { GetStorageDataObjects, GetStorageDataObjectsCount } = getSdk(client);
  const defalultOffset = 5000;
  const { storageDataObjectsConnection } = await GetStorageDataObjectsCount({
    where: {
      createdAt_lte: end,
    },
  });
  const data: Array<DailyData> = [];
  let curDate = "";
  const { totalCount } = storageDataObjectsConnection;
  let loop = Math.ceil(totalCount / defalultOffset);
  let startStorage = 1;
  let endStorage = 1;
  let storageSize = 0;
  for (let i = 0; i < loop; i++) {
    const { storageDataObjects } = await GetStorageDataObjects({
      where: {
        createdAt_lte: end,
      },
      limit: defalultOffset,
      offset: defalultOffset * i,
    });
    storageDataObjects.map((storage) => {
      if (start) {
        let storageCreateAt = new Date(storage.createdAt);
        if (storageCreateAt < start) {
          startStorage += parseInt(storage.size) / 1024 / 1024 / 1024;
        } else {
          if (curDate == "")
            curDate = moment(storage.createdAt).format("YYYY-MM-DD");
          if (moment(storage.createdAt).format("YYYY-MM-DD") == curDate) {
            storageSize += parseInt(storage.size) / 1024 / 1024 / 1024;
          } else {
            data.push({
              date: new Date(curDate),
              count: storageSize,
            });
            storageSize = parseInt(storage.size) / 1024 / 1024 / 1024;
            curDate = moment(storage.createdAt).format("YYYY-MM-DD");
          }
        }
      }
      endStorage += parseInt(storage.size) / 1024 / 1024 / 1024;
    });
  }
  if (start) {
    data.push({
      date: new Date(curDate),
      count: storageSize,
    });
  }
  return {
    startStorage: decimalAdjust(startStorage),
    endStorage: decimalAdjust(endStorage),
    chartData: data,
  };
};

// NonEmptyChannel

export const getChannelChartData = async (
  endBlock: number,
  startDate: Date,
  totalCount: number,
) => {
  const { GetNonEmptyChannel } = getSdk(client);
  const defaultLimit = 5000;
  let channelCount: number = 0;
  const totalChannels: Array<ChannelData> = [];
  const channelChart: Array<DailyData> = [];
  let curDate = moment(startDate).format("YYYY-MM-DD");
  const loop = Math.ceil(totalCount / defaultLimit);
  for (let i = 0; i < loop; i++) {
    const { videos } = await GetNonEmptyChannel({
      where: {
        createdInBlock_lte: endBlock,
      },
      limit: defaultLimit,
      offset: defaultLimit * i,
    });
    videos.map((video) => {
      let flag = totalChannels.find((channel) => {
        return channel.id == video.channelId;
      });
      if (!flag) {
        totalChannels.push(video.channel);
      }
    });
  }
  totalChannels
    .sort((a1, a2) => {
      if (a1.createdAt <= a2.createdAt) {
        return -1;
      } else {
        return 1;
      }
    })
    .filter((a) => {
      return new Date(a.createdAt) > startDate;
    })
    .map((a) => {
      if (moment(a.createdAt).format("YYYY-MM-DD") == curDate) {
        channelCount += 1;
      } else {
        channelChart.push({
          count: channelCount,
          date: new Date(curDate),
        });
        channelCount = 1;
        curDate = moment(a.createdAt).format("YYYY-MM-DD");
      }
    });
  channelChart.push({
    count: channelCount,
    date: new Date(curDate),
  });
  return channelChart;
};

// VideoNFT

export const getVideoNftStatus = async (start: Date, end: Date) => {
  const {
    GetNftIssuedCount,
    GetNftSales,
    GetNftSaleCount,
    GetAuctions,
    GetAuctionsTotalCount,
    GetNftIssued,
  } = getSdk(client);
  const defaultLimit = 1000;
  const chartData: Array<DailyData> = [];
  let curDate = moment(start).format("YYYY-MM-DD");
  let loop = 0;
  let totalVolume = BN_ZERO;
  let auctionVolume = BN_ZERO;
  let count = 0;
  const {
    nftIssuedEventsConnection: { totalCount: startCount },
  } = await GetNftIssuedCount({
    where: { createdAt_lte: start },
  });
  const {
    nftIssuedEventsConnection: { totalCount: endCount },
  } = await GetNftIssuedCount({
    where: { createdAt_lte: end },
  });
  const growthQty = endCount - startCount;
  const growthPct = decimalAdjust((growthQty / startCount) * 100);
  loop = Math.ceil(growthQty / defaultLimit);
  for (let i = 0; i < loop; i++) {
    const { nftIssuedEvents } = await GetNftIssued({
      where: {
        createdAt_gte: start,
        createdAt_lte: end,
      },
      limit: defaultLimit,
      offset: defaultLimit * i,
    });
    nftIssuedEvents.map((n) => {
      if (moment(n.createdAt).format("YYYY-MM-DD") == curDate) {
        count++;
      } else {
        chartData.push({
          date: new Date(curDate),
          count,
        });
        count = 1;
        curDate = moment(n.createdAt).format("YYYY-MM-DD");
      }
    });
  }
  chartData.push({
    date: new Date(curDate),
    count,
  });
  const {
    nftBoughtEventsConnection: { totalCount: boughtEventTotalCount },
  } = await GetNftSaleCount({
    where: { createdAt_gte: start, createdAt_lte: end },
  });
  const {
    auctionsConnection: { totalCount: auctionTotalCount },
  } = await GetAuctionsTotalCount({
    where: { createdAt_gte: start, createdAt_lte: end, isCompleted_eq: true },
  });
  loop = Math.ceil(boughtEventTotalCount / defaultLimit);
  for (let i = 0; i < loop; i++) {
    const { nftBoughtEvents } = await GetNftSales({
      where: { createdAt_gte: start, createdAt_lte: end },
      limit: defaultLimit,
      offset: defaultLimit * i,
    });
    totalVolume = nftBoughtEvents.reduce(
      (total, { price }) => total.add(new BN(price)),
      BN_ZERO,
    );
  }
  loop = Math.ceil(auctionTotalCount / defaultLimit);
  for (let i = 0; i < loop; i++) {
    const { auctions } = await GetAuctions({
      where: { createdAt_gte: start, createdAt_lte: end, isCompleted_eq: true },
      limit: defaultLimit,
      offset: defaultLimit * i,
    });
    auctionVolume = auctions.reduce(
      (total, { topBid }) => total.add(new BN(topBid ? topBid.amount : 0)),
      BN_ZERO,
    );
  }
  totalVolume = totalVolume.add(auctionVolume);
  return {
    startBlock: startCount,
    endBlock: endCount,
    growthQty,
    growthPct,
    soldVolume: toJoy(totalVolume),
    soldQty: boughtEventTotalCount,
    chartData,
  };
};

export const getVideoNftChartData = async (start: Date, end: Date) => {
  const { GetNftIssuedCount } = getSdk(client);

  const startDate = new Date(
    `${start.toISOString().slice(0, 11)}00:00:00.000Z`,
  );
  const endDate = new Date(`${end.toISOString().slice(0, 11)}00:00:00.000Z`);
  const data = [];

  const {
    nftIssuedEventsConnection: { totalCount },
  } = await GetNftIssuedCount({
    where: { createdAt_lte: new Date(startDate.getTime() - 24 * 3600 * 1000) },
  });
  let prevCount = totalCount;
  for (
    let date = startDate;
    date <= endDate;
    date = new Date(date.getTime() + 24 * 3600 * 1000)
  ) {
    const {
      nftIssuedEventsConnection: { totalCount },
    } = await GetNftIssuedCount({
      where: { createdAt_lte: date.toISOString() },
    });
    data.push({
      date: date,
      count: totalCount - prevCount,
    });
    prevCount = totalCount;
  }
  return data;
};

// Videos

export const getVideoChartData = async (
  start: number,
  end: number,
  totalCount: number,
): Promise<DailyData[]> => {
  const chart: Map<string, number> = new Map();

  const { GetVideoCreationDate } = getSdk(client);
  const defaultLimit = 40_000;
  const loop = Math.ceil(totalCount / defaultLimit);
  for (let i = 0; i < loop; i++) {
    const { videos } = await GetVideoCreationDate({
      where: {
        createdInBlock_gt: start,
        createdInBlock_lte: end,
      },
      limit: defaultLimit,
      offset: defaultLimit * i,
    });
    videos
      .map(({ createdAt }) => createdAt.split("T")[0])
      .forEach((date) => chart.set(date, (chart.get(date) || 0) + 1));
  }

  return Array.from(chart.entries()).map(([date, count]) => ({
    date: new Date(date),
    count,
  }));
};

// Forum

export const getForumCategoryStatus = async (start: Date, end: Date) => {
  const { GetForumCategoriesCount } = getSdk(client);

  const {
    forumCategoriesConnection: { totalCount: startCount },
  } = await GetForumCategoriesCount({
    where: { createdAt_lte: start },
  });
  const {
    forumCategoriesConnection: { totalCount: endCount },
  } = await GetForumCategoriesCount({
    where: { createdAt_lte: end },
  });
  const growthCount = endCount - startCount;
  const growthPercent = (growthCount / startCount) * 100;

  return {
    startBlock: startCount,
    endBlock: endCount,
    growthQty: growthCount,
    growthPct: growthPercent,
  };
};

export const getForumThreadStatus = async (start: Date, end: Date) => {
  const { GetForumThreadsCount } = getSdk(client);

  const {
    forumThreadsConnection: { totalCount: startCount },
  } = await GetForumThreadsCount({
    where: { createdAt_lte: start },
  });
  const {
    forumThreadsConnection: { totalCount: endCount },
  } = await GetForumThreadsCount({
    where: { createdAt_lte: end },
  });
  const growthCount = endCount - startCount;
  const growthPercent = (growthCount / startCount) * 100;

  return {
    startBlock: startCount,
    endBlock: endCount,
    growthQty: growthCount,
    growthPct: growthPercent,
  };
};

export const getForumPostStatus = async (start: Date, end: Date) => {
  const { GetForumPostsCount } = getSdk(client);

  const {
    forumPostsConnection: { totalCount: startCount },
  } = await GetForumPostsCount({
    where: { createdAt_lte: start },
  });
  const {
    forumPostsConnection: { totalCount: endCount },
  } = await GetForumPostsCount({
    where: { createdAt_lte: end },
  });
  const growthCount = endCount - startCount;
  const growthPercent = (growthCount / startCount) * 100;

  return {
    startBlock: startCount,
    endBlock: endCount,
    growthQty: growthCount,
    growthPct: growthPercent,
  };
};

export const getForumStatus = async (start: Date, end: Date) => {
  const [category, thread, post] = await Promise.all([
    getForumCategoryStatus(start, end),
    getForumThreadStatus(start, end),
    getForumPostStatus(start, end),
  ]);

  return { category, thread, post };
};

// membership

export const getMembershipCount = async (date: Date) => {
  const { GetMembersCount } = getSdk(client);

  const {
    membershipsConnection: { totalCount },
  } = await GetMembersCount({
    where: { createdAt_lte: date },
  });
  return totalCount;
};

export const getMembershipStatus = async (start: Date, end: Date) => {
  const { GetMembersCount, GetMembers } = getSdk(client);
  const chartData: Array<DailyData> = [];
  let curDate = "";
  let count = 0;
  const {
    membershipsConnection: { totalCount: startCount },
  } = await GetMembersCount({
    where: { createdAt_lt: start },
  });
  const defaultLimit = 5000;
  const {
    membershipsConnection: { totalCount: endCount },
  } = await GetMembersCount({
    where: { createdAt_lte: end },
  });
  const growthQty = endCount - startCount;
  const growthPct = decimalAdjust((growthQty / startCount) * 100);
  let loop = Math.ceil(growthQty / defaultLimit);
  for (let i = 0; i < loop; i++) {
    const { memberships } = await GetMembers({
      where: {
        createdAt_gte: start,
        createdAt_lte: end,
      },
      limit: defaultLimit,
      offset: defaultLimit * i,
    });
    if (curDate == "")
      curDate = moment(memberships[0].createdAt).format("YYYY-MM-DD");
    memberships.map((member) => {
      if (moment(member.createdAt).format("YYYY-MM-DD") == curDate) count++;
      else {
        chartData.push({
          date: new Date(curDate),
          count,
        });
        count = 1;
        curDate = moment(member.createdAt).format("YYYY-MM-DD");
      }
    });
  }
  chartData.push({
    date: new Date(curDate),
    count,
  });
  return {
    startBlock: startCount,
    endBlock: endCount,
    growthQty,
    growthPct,
    chartData,
  };
};

export const getMembershipChartData = async (start: Date, end: Date) => {
  const { GetMembersCount, GetMembers } = getSdk(client);
  const defaultLimit = 1000;
  let curDate = "";
  let count = 0;
  const chartData: Array<DailyData> = [];
  const {
    membershipsConnection: { totalCount },
  } = await GetMembersCount({
    where: {
      createdAt_gte: start,
      createdAt_lte: end,
    },
  });
  let loop = Math.ceil(totalCount / defaultLimit);
  for (let i = 0; i < loop; i++) {
    const { memberships } = await GetMembers({
      where: {
        createdAt_gte: start,
        createdAt_lte: end,
      },
      limit: defaultLimit,
      offset: defaultLimit * i,
    });
    if (curDate == "")
      curDate = moment(memberships[0].createdAt).format("YYYY-MM-DD");
    memberships.map((member) => {
      if (moment(member.createdAt).format("YYYY-MM-DD") == curDate) count++;
      else {
        chartData.push({
          date: new Date(curDate),
          count,
        });
        count = 1;
        curDate = moment(member.createdAt).format("YYYY-MM-DD");
      }
    });
  }
  chartData.push({
    date: new Date(curDate),
    count,
  });
  return chartData;
};

export const getMemeberShipHandle = async (id: string) => {
  const { GetMembers } = getSdk(client);
  const { memberships } = await GetMembers({
    where: {
      id_eq: id,
    },
  });

  return memberships[0].handle;
};

// proposal

export const getProposals = async (
  start: Date,
  end: Date,
): Promise<Proposal[]> => {
  const { getProposals } = getSdk(client);
  const { proposals } = await getProposals({
    where: {
      createdAt_gt: start,
      createdAt_lt: end,
    },
  });

  return proposals.map(asProposal);
};

export const getProposalStatus = async (start: Date, end: Date) => {
  const { getProposalTotalCount } = getSdk(client);
  const {
    proposalsConnection: { totalCount: startBlock },
  } = await getProposalTotalCount({
    where: {
      createdAt_lte: start,
    },
  });
  const {
    proposalsConnection: { totalCount: endBlock },
  } = await getProposalTotalCount({
    where: {
      createdAt_lte: end,
    },
  });
  const growthQty = endBlock - startBlock;
  const growthPct = decimalAdjust((100 * growthQty) / startBlock);
  return {
    startBlock,
    endBlock,
    growthQty,
    growthPct,
  };
};

// workers

export const getFilledWorkers = async () => {
  const { getOpeningFilled, getOpeningFilledTotalCount } = getSdk(client);
  const {
    openingFilledEventsConnection: { totalCount },
  } = await getOpeningFilledTotalCount();
  const { openingFilledEvents } = await getOpeningFilled({ limit: totalCount });
  return openingFilledEvents;
};

export const getTerminateWorkers = async () => {
  const { getTerminatedWorker, getTerminatedWorkerTotalCount } = getSdk(client);
  const {
    terminatedWorkerEventsConnection: { totalCount },
  } = await getTerminatedWorkerTotalCount();
  const { terminatedWorkerEvents } = await getTerminatedWorker({
    limit: totalCount,
  });
  return terminatedWorkerEvents;
};

export const getExitedWorkers = async () => {
  const { getWorkerExited, getWorkerExitedTotalCount } = getSdk(client);
  const {
    workerExitedEventsConnection: { totalCount },
  } = await getWorkerExitedTotalCount();
  const { workerExitedEvents } = await getWorkerExited({ limit: totalCount });
  return workerExitedEvents;
};

export const getWorkerByMemberId = async (memberId: string) => {
  const { GetWorkers } = getSdk(client);
  const { workers } = await GetWorkers({
    where: {
      membership: {
        id_eq: memberId,
      },
    },
  });
  return workers;
};

// council Reward

export const getCouncilReward = async (start: number, end: number) => {
  const { GetCouncilReward, GetCouncilRewardTotalCount } = getSdk(client);
  const { rewardPaymentEvents } = await GetCouncilReward({
    where: {
      inBlock_gt: start, // start block rewards are still for old council!
      inBlock_lte: end,
    },
    limit: 5000,
  });
  const councilReward = rewardPaymentEvents.map((r) => {
    return {
      memberId: r.councilMember.memberId,
      amount: toJoy(new BN(r.paidBalance)),
    };
  });
  return councilReward;
};

// council refill

export const getCouncilRefill = async (start: number, end: number) => {
  const { GetCouncilReFill, GetCouncilReFillTotalCount } = getSdk(client);
  const {
    budgetRefillEventsConnection: { totalCount },
  } = await GetCouncilReFillTotalCount({
    where: {
      inBlock_gt: start,
      inBlock_lte: end,
    },
  });
  const { budgetRefillEvents } = await GetCouncilReFill({
    where: {
      inBlock_gt: start,
      inBlock_lte: end,
    },
    limit: totalCount,
  });
  const _refillBudget = budgetRefillEvents
    .map((e) => new BN(e.balance))
    .reduce((a, b) => a.add(b), BN_ZERO);
  return toJoy(_refillBudget);
};

// creator payout reward
export const getCreatorPayoutReward = async (start: number, end: number) => {
  const { GetCreatorPayoutReward, GetCreatorPayoutRewardTotalCount } =
    getSdk(client);
  const {
    channelRewardClaimedEventsConnection: { totalCount },
  } = await GetCreatorPayoutRewardTotalCount({
    where: {
      inBlock_gt: start,
      inBlock_lte: end,
    },
  });
  const { channelRewardClaimedEvents } = await GetCreatorPayoutReward({
    where: {
      inBlock_gt: start,
      inBlock_lte: end,
    },
    limit: totalCount,
  });
  const amount = channelRewardClaimedEvents
    .map((c) => new BN(c.amount))
    .reduce((a, b) => a + toJoy(b), 0);
  return amount;
};

// funding proposals
export const getFundingProposal = async (start: number, end: number) => {
  const { getFundingProposalTotalCount, getFundingProposals } = getSdk(client);
  const {
    requestFundedEventsConnection: { totalCount },
  } = await getFundingProposalTotalCount({
    where: {
      inBlock_gt: start,
      inBlock_lte: end,
    },
  });
  const { requestFundedEvents } = await getFundingProposals({
    where: {
      inBlock_gt: start,
      inBlock_lte: end,
    },
    limit: totalCount,
  });
  const paid = requestFundedEvents
    .map((e) => new BN(e.amount))
    .reduce((a, b) => a.add(b), BN_ZERO);

  return toJoy(paid);
};

// discretionary spending from WGs budgets
export const getWGBudgetSpending = async (start: number, end: number) => {
  const { GetBudgetSpending } = getSdk(client);
  const budgetSpendingPerWG = {} as {
    [key in GroupIdName]: number;
  };
  const promises = Object.keys(GroupIdToGroupParam).map(async (_group) => {
    const { budgetSpendingEvents } = await GetBudgetSpending({
      where: {
        inBlock_gt: start,
        inBlock_lte: end,
        group: { id_eq: _group },
      },
      limit: 5000,
    });
    budgetSpendingPerWG[_group as GroupIdName] = budgetSpendingEvents
      .map((b) => new BN(b.amount))
      .reduce((a, b) => a + toJoy(b), 0);
  });
  await Promise.all(promises);
  return budgetSpendingPerWG;
};

// worker rewards per WG per worker
export const getWGWorkersRewards = async (start: number, end: number) => {
  const { GetRewards } = getSdk(client);
  const rewardsPerWGPerWorker = {} as {
    [key in GroupIdName]: {
      [key in string]: number;
    };
  };
  const promises = Object.keys(GroupIdToGroupParam).map(async (_group) => {
    const { rewardPaidEvents } = await GetRewards({
      where: {
        inBlock_gt: start,
        inBlock_lte: end,
        group: {
          id_eq: _group,
        },
      },
      limit: 5000,
    });
    const rewardsPerWorker = {} as {
      [key in string]: number;
    };
    rewardPaidEvents.map((r) => {
      const amount = toJoy(new BN(r.amount));
      if (rewardsPerWorker[r.worker.runtimeId]) {
        rewardsPerWorker[r.worker.runtimeId] += amount;
      } else {
        rewardsPerWorker[r.worker.runtimeId] = amount;
      }
    });
    rewardsPerWGPerWorker[_group as GroupIdName] = rewardsPerWorker;
  });
  await Promise.all(promises);
  return rewardsPerWGPerWorker;
};

// wg refill proposal budget
export const getWGRefillProposal = async (start: Date, end: Date) => {
  const { getProposals, getProposalTotalCount } = getSdk(client);
  const {
    proposalsConnection: { totalCount },
  } = await getProposalTotalCount({
    where: {
      isFinalized_eq: true,
      details_json: { isTypeOf_eq: "UpdateWorkingGroupBudgetProposalDetails" },
      status_json: { isTypeOf_eq: "ProposalStatusExecuted" },
      createdAt_gte: start,
      createdAt_lte: end,
    },
  });
  const refills = {} as {
    [key in WorkingGroup["id"]]: number;
  };

  const { proposals } = await getProposals({
    where: {
      isFinalized_eq: true,
      details_json: { isTypeOf_eq: "UpdateWorkingGroupBudgetProposalDetails" },
      status_json: { isTypeOf_eq: "ProposalStatusExecuted" },
      createdAt_gte: start,
      createdAt_lte: end,
    },
    limit: totalCount,
  });

  for (const proposal of proposals) {
    const {
      group: { id },
      amount,
    } = proposal.details as {
      __typename: string;
      group: {
        id: WorkingGroup["id"];
        __typename: string;
      };
      amount: string;
    };
    refills[id] =
      toJoy(new BN(amount)) + (isNaN(refills[id]) ? 0 : refills[id]);
  }
  return refills;
};

// wg spending proposal budget

export const getWGSpendingProposal = async (start: number, end: number) => {
  const {
    getFundingProposalTotalCount,
    getFundingProposals,
    GetWorkersCount,
    GetWorkers,
  } = getSdk(client);
  const {
    requestFundedEventsConnection: { totalCount },
  } = await getFundingProposalTotalCount({
    where: {
      inBlock_gte: start,
      inBlock_lte: end,
    },
  });
  const spendingProposal = {} as {
    [key in GroupIdName]: 0;
  };
  const { requestFundedEvents } = await getFundingProposals({
    where: {
      inBlock_gte: start,
      inBlock_lte: end,
    },
    limit: totalCount,
  });
  const promises = Object.keys(GroupIdToGroupParam).map(async (_groupId) => {
    const {
      workersConnection: { totalCount: workerCount },
    } = await GetWorkersCount({
      where: {
        groupId_eq: _groupId,
        isActive_eq: true,
      },
    });
    const { workers } = await GetWorkers({
      where: {
        groupId_eq: _groupId,
        isActive_eq: true,
      },
      limit: workerCount,
    });
    workers.map((w) => {
      const budget = requestFundedEvents
        .filter((a) => {
          return a.account == w.rewardAccount;
        })
        .reduce((a, b) => a + toJoy(new BN(b.amount)), 0);
      if (budget) spendingProposal[_groupId as GroupIdName] += budget;
    });
  });
  await Promise.all(promises);
  return spendingProposal;
};

// wg status

export const getWGOpening = async (start: Date, end: Date) => {
  const { GetWorkingGroupOpeningsTotalCount } = getSdk(client);
  const {
    workingGroupOpeningsConnection: { totalCount: startOpeningCount },
  } = await GetWorkingGroupOpeningsTotalCount({
    where: {
      createdAt_lte: start,
      status_json: { isTypeOf_eq: "OpeningStatusOpen" },
    },
  });
  const {
    workingGroupOpeningsConnection: { totalCount: endOpeningCount },
  } = await GetWorkingGroupOpeningsTotalCount({
    where: {
      createdAt_lte: end,
      status_json: { isTypeOf_eq: "OpeningStatusOpen" },
    },
  });
  return {
    startBlock: startOpeningCount,
    endBlock: endOpeningCount,
    change: endOpeningCount - startOpeningCount,
  };
};

export const getWGApplication = async (start: Date, end: Date) => {
  const { GetWorkingGroupApplicationsTotalCount } = getSdk(client);
  const {
    workingGroupApplicationsConnection: { totalCount: startApplicationCount },
  } = await GetWorkingGroupApplicationsTotalCount({
    where: {
      createdAt_lte: start,
    },
  });
  const {
    workingGroupApplicationsConnection: { totalCount: endApplicationCount },
  } = await GetWorkingGroupApplicationsTotalCount({
    where: {
      createdAt_lte: start,
    },
  });
  return {
    startBlock: startApplicationCount,
    endBlock: endApplicationCount,
    change: endApplicationCount - startApplicationCount,
  };
};

export const getWGFilledPosition = async (
  start: Date,
  end: Date,
  groupID: string,
) => {
  const {
    GetOpeningFilledEventsConnection,
    GetTerminatedWorkerEventsConnection,
    GetWorkerExitedEventsConnection,
  } = getSdk(client);
  const {
    openingFilledEventsConnection: { totalCount: filledCount },
  } = await GetOpeningFilledEventsConnection({
    where: {
      createdAt_gte: start,
      createdAt_lte: end,
      group: {
        id_eq: groupID,
      },
    },
  });

  const {
    terminatedWorkerEventsConnection: { totalCount: terminatedCount },
  } = await GetTerminatedWorkerEventsConnection({
    where: {
      createdAt_gte: start,
      createdAt_lte: end,
      group: {
        id_eq: groupID,
      },
    },
  });

  const {
    workerExitedEventsConnection: { totalCount: leftCount },
  } = await GetWorkerExitedEventsConnection({
    where: {
      createdAt_gte: start,
      createdAt_lte: end,
      group: {
        id_eq: groupID,
      },
    },
  });

  return {
    workerHired: filledCount,
    workerFired: terminatedCount,
    workerLeft: leftCount,
  };
};

// wg spending with receiver ID

export const getWGSpendingWithReceiverID = async (
  start: number,
  end: number,
  accountID: Array<string>,
  groupID: string,
) => {
  const { GetBudgetSpending, GetBudgetSpendingEventsTotalCount } =
    getSdk(client);
  const {
    budgetSpendingEventsConnection: { totalCount },
  } = await GetBudgetSpendingEventsTotalCount({
    where: {
      inBlock_gte: start,
      inBlock_lte: end,
      reciever_in: accountID,
    },
  });
  const { budgetSpendingEvents } = await GetBudgetSpending({
    where: {
      inBlock_gte: start,
      inBlock_lte: end,
      reciever_in: accountID,
      group: {
        id_eq: groupID,
      },
    },
    limit: totalCount,
  });
  const spendingBudget = budgetSpendingEvents.reduce(
    (a, b) => a + string2Joy(b.amount),
    0,
  );
  return spendingBudget;
};

// council

export const getElectedCouncils = async () => {
  const { GetElectedCouncils } = getSdk(client);
  const { electedCouncils } = await GetElectedCouncils();
  return electedCouncils;
};

export const getElectionRoundWithUniqueID = async (uniqueID: string) => {
  const { GetElectionRoundWithUniqueID } = getSdk(client);
  const { electionRoundByUniqueInput: electionRound } =
    await GetElectionRoundWithUniqueID({
      where: {
        id: uniqueID,
      },
    });
  return electionRound;
};

export const getBurnedToken = async () => {
  const body = {
    query:
      "query{\n  feesInfos{\n  balancesDepositSum\n    balancesSlashedSum\n    balancesWithdrawSum\n    balancesDustLostSum\n  }\n}",
    variables: null,
  };
  const response = await fetch(FEE_QN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  const content = await response.json();
  if (response.status == 200) {
    const feeInfo = content.data.feesInfos[0];
    let fee =
      string2Joy(feeInfo.balancesDustLostSum) +
      string2Joy(feeInfo.balancesWithdrawSum) +
      string2Joy(feeInfo.balancesSlashedSum);
    return Math.ceil(fee);
  } else return 0;
};
