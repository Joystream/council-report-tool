import { decimalAdjust } from "@/helpers";
import { Status } from "@/types/Status";
import { sdk } from "./sdk";
import { getNonEmptyChannelCount } from "./getNonEmptyChannelCount";

export const getNonEmptyChannelStatus = async (
  start: number,
  end: number,
): Promise<Status> => {
  const { GetChannelsCount } = sdk;

  const allNonEmptyChannels = getNonEmptyChannelCount(end);

  const newNonEmptyChannels = GetChannelsCount({
    where: {
      createdInBlock_lte: end,
      createdInBlock_gt: start,
      totalVideosCreated_gt: 0,
    },
  }).then(({ channelsConnection }) => channelsConnection.totalCount);

  const allNonEmptyChannelsCount = await allNonEmptyChannels;
  const newNonEmptyChannelsCount = await newNonEmptyChannels;
  const previousTotal = allNonEmptyChannelsCount - newNonEmptyChannelsCount;
  const growthPct = decimalAdjust(
    (newNonEmptyChannelsCount / previousTotal) * 100,
  );

  return {
    startBlock: previousTotal, // WARNING: This property name is misleading
    endBlock: allNonEmptyChannelsCount, // WARNING: This property name is misleading
    growthQty: newNonEmptyChannelsCount,
    growthPct,
  };
};
