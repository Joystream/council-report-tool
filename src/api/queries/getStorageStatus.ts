import { decimalAdjust } from "@/helpers";
import { Status } from "@/types/Status";
import { getStorageObjects } from "./getStorageObjects";

type ChartPoint = { date: Date; count: number };
type StorageStatus = Status & { chartData: ChartPoint[] };

export const getStorageStatus = async (
  start: Date,
  end: Date,
): Promise<StorageStatus> => {
  const objects = await getStorageObjects(end);

  let totalSize = 0;
  let growthSize = 0;
  const chart: Map<string, number> = new Map();
  objects.forEach(({ size, createdAt }) => {
    totalSize += size;

    if (createdAt.getTime() < start.getTime()) return;

    growthSize += size;

    const key = createdAt.toISOString().split("T")[0];
    chart.set(key, (chart.get(key) || 0) + size);
  });

  const previousSize = totalSize - growthSize;
  const growthPct =
    previousSize && decimalAdjust((growthSize / previousSize) * 100);

  return {
    startBlock: previousSize / 1024 / 1024 / 1024, // WARNING: This property name is misleading
    endBlock: totalSize / 1024 / 1024 / 1024, // WARNING: This property name is misleading
    growthQty: growthSize / 1024 / 1024 / 1024,
    growthPct,
    chartData: Array.from(chart.entries()).map(([date, size]) => ({
      date: new Date(date),
      count: size / 1024 / 1024 / 1024,
    })),
  };
};
