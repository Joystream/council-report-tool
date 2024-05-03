import { sdk } from "./sdk";

export const getNonEmptyChannelCount = async (
  blockNumber: number,
): Promise<number> => {
  const { GetChannelsCount } = sdk;

  const allNonEmptyChannels = await GetChannelsCount({
    where: {
      createdInBlock_lte: blockNumber,
      totalVideosCreated_gt: 0,
    },
  });

  return allNonEmptyChannels.channelsConnection.totalCount;
};
