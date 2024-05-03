import { decimalAdjust } from "@/helpers";
import { Status } from "@/types/Status";
import { sdk } from "./sdk";

export const getVideoStatus = async (
  start: number,
  end: number,
): Promise<Status> => {
  const { GetVideoCount } = sdk;

  const allVideos = GetVideoCount({
    where: {
      createdInBlock_lte: end,
    },
  }).then(({ videosConnection }) => videosConnection.totalCount);

  const newVideos = GetVideoCount({
    where: {
      createdInBlock_lte: end,
      createdInBlock_gte: start,
    },
  }).then(({ videosConnection }) => videosConnection.totalCount);

  const allVideosCount = await allVideos;
  const newVideosCount = await newVideos;
  const previousTotal = allVideosCount - newVideosCount;
  const growthPct = decimalAdjust((newVideosCount / previousTotal) * 100);

  return {
    startBlock: previousTotal, // WARNING: This property name is misleading
    endBlock: allVideosCount, // WARNING: This property name is misleading
    growthQty: newVideosCount,
    growthPct,
  };
};
