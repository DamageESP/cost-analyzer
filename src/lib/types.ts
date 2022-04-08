export interface Transaction {
  id: string,
  concept: string,
  date: Date,
  amount: number,
  group?: TransactionGroup
}

export interface TransactionGroup {
  groupName: string,
  conceptContains: string[],
  transactions: Transaction[],
}

export interface EconomicBreakdown { income: number, expense: number, total: number }

export interface ProcessedTransactionGroup extends TransactionGroup, EconomicBreakdown {
  percentage: string,
}

export const otherGroup: TransactionGroup = {
  conceptContains: [""],
  groupName: "Unclassified",
  transactions: [],
};

export interface GroupColor {
  name: string,
  color: string,
}

