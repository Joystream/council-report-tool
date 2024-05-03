import { sdk } from "./sdk";

type StorageObject = {
  size: number;
  createdAt: Date;
};

export const getStorageObjects = async (
  before: Date,
): Promise<StorageObject[]> => {
  const objects: StorageObject[] = [];

  const { GetStorageDataObjects, GetStorageDataObjectsCount } = sdk;
  const defaultLimit = 40_000;
  const { storageDataObjectsConnection } = await GetStorageDataObjectsCount({
    where: { createdAt_lte: before },
  });

  const { totalCount } = storageDataObjectsConnection;
  const loop = Math.ceil(totalCount / defaultLimit);
  for (let i = 0; i < loop; i++) {
    const { storageDataObjects } = await GetStorageDataObjects({
      where: { createdAt_lte: before },
      limit: defaultLimit,
      offset: defaultLimit * i,
    });

    objects.push(
      ...storageDataObjects.map(({ size, createdAt }) => ({
        size: Number(size),
        createdAt: new Date(createdAt),
      })),
    );
  }

  return objects;
};
