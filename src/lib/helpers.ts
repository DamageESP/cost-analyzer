import { EconomicBreakdown, GroupColor, Transaction, TransactionGroup } from "./types";

const typeColors: GroupColor[] = []

export const displayAmount = (amount: number) =>
  Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

export const getGroupEconomicBreakdown = (gt: TransactionGroup): EconomicBreakdown => {
  return gt.transactions.reduce((acc: EconomicBreakdown, cg: Transaction) => {
    if (cg.amount < 0) acc.expense += cg.amount
    if (cg.amount > 0) acc.income += cg.amount
    acc.total += cg.amount;
    return acc;
  }, { expense: 0, income: 0, total: 0 });
};

export const getGroupPercentage = (group: TransactionGroup, allGroups: TransactionGroup[]): string => {
  const economicBreakdown = getGroupEconomicBreakdown(group)
  return (100 - (Math.abs(economicBreakdown.total) / Math.abs(getGroupEconomicBreakdown(allGroups.sort((g1, g2) => Math.abs(getGroupEconomicBreakdown(g1).total) < Math.abs(getGroupEconomicBreakdown(g2).total) ? 1 : -1)[0]).total) * 100)).toFixed(2)
}

const randomRgbaColor = () => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, .2)`

export const getColorForGroup = (group: TransactionGroup): string => {
  if (typeColors.find(g => g.name === group.groupName)) return typeColors.find(g => g.name === group.groupName)?.color!
  else {
    const newColor = randomRgbaColor()
    typeColors.push({ color: newColor, name: group.groupName })
    return newColor
  }
}
