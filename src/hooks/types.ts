import { ElectedCouncil } from "@/types";
import { GroupShortIDName, OverallBudgetKeys } from "@/types";
import { wgSalaryType } from "@/api/rpc/type";

export interface ForSelectedCouncil {
  council?: ElectedCouncil;
}

export type DailyData = {
  date: Date;
  count: number;
};

export type ChannelData = {
  id: string;
  createdAt: Date;
};

export type VideoData = {
  id: string;
  createdAt: string;
};

export type BudgetData = {
  groupId: string;
  amount: number;
};

export type CouncilBudgetData = {
  memberId: string;
  amount: number;
};

export type WGspedingType = {
  [key in GroupShortIDName]: spendigBudgetBarType;
};

export type OverallType = {
  [key in OverallBudgetKeys]: spendigBudgetBarType;
};

export type spendigBudgetBarType = {
  id: string;
  prevSpendingOfJoy: number;
  prevSpendingOfUsd: number;
  currentSpendingOfJoy: number;
  currentSpendingOfUsd: number;
};

export type spendingBudgetPieType = {
  name: string;
  value: number;
};

export type wgBudgetType = {
  startWGBudget: number;
  endWGBudget: number;
  refillBudget: number;
  totalSpending: number;
} & wgSalaryType;
