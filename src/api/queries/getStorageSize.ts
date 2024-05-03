import { getStorageObjects } from "./getStorageObjects";

export const getStorageSize = async (before: Date): Promise<number> => {
  const objects = await getStorageObjects(before);
  return objects.reduce((sum, { size }) => sum + size, 0);
};
