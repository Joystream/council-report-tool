import { ApiPromise } from "@polkadot/api";
import { HexString } from "@polkadot/util/types";

export async function getValidatorReward(
  api: ApiPromise,
  startBlockHash: HexString,
  endBlockHash: HexString,
) {
  let totalReward = 0;
  const startEra = Number(
    (await (await api.at(startBlockHash)).query.staking.activeEra()).unwrap()
      .index,
  );
  const endEra = Number(
    (await (await api.at(endBlockHash)).query.staking.activeEra()).unwrap()
      .index,
  );
  for (let i = startEra; i <= endEra; i++) {
    const reward = await (
      await api.at(endBlockHash)
    ).query.staking.erasValidatorReward(i);
    if (!reward.isNone) {
      totalReward += Number(reward.unwrap()) / Math.pow(10, 10);
    }
  }
  return Math.ceil(totalReward);
}
