import { GenericEventData } from "@polkadot/types/generic/Event";

export class CacheEvent {
  constructor(
    public section: string,
    public method: string,
    public data: GenericEventData,
  ) {}
}

export type wgSalaryType = {
  leadSalary: number;
  workerSalary: number;
  daoSpendingBudget: number;
};

export type WorkingGroup = {
  groupId: string;
  workers: Array<Worker>;
};
