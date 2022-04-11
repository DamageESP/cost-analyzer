import { computed, ComputedRef, Ref, ref } from "vue";
import { getGroupPercentage, getGroupEconomicBreakdown } from "../lib/helpers";
import { otherGroup, ProcessedTransactionGroup, Transaction, TransactionGroup } from "../lib/types";

const TRANSACTION_GROUPS_KEY = 'cost-analyzer.transactionGroups'

export const useTransactionGroups = (transactions: Ref<Transaction[]>) => {
  const selectedGroup = ref<ProcessedTransactionGroup | undefined>(undefined);
  const userGroups = ref<TransactionGroup[]>(
    localStorage.getItem(TRANSACTION_GROUPS_KEY)
      ? JSON.parse(localStorage.getItem(TRANSACTION_GROUPS_KEY)!)
      : []
  );

  const unclassifiedTransactions: ComputedRef<ProcessedTransactionGroup> = computed(() => ({ ...otherGroup, ...getGroupEconomicBreakdown(otherGroup), percentage: '0' }))

  const transactionGroups: ComputedRef<ProcessedTransactionGroup[]> = computed(() =>
    transactions.value
      .reduce(
        (acc: TransactionGroup[], currentTransaction: Transaction) => {
          const groupsForTransaction = userGroups.value.filter((tg) =>
            tg.conceptContains
              .map((c) => c.toLowerCase())
              .some((c) => currentTransaction.concept.toLowerCase().includes(c))
          );
          if (!groupsForTransaction.length) {
            otherGroup.transactions.push({ ...currentTransaction, group: otherGroup });
          }
          groupsForTransaction.forEach((g) => {
            const foundGroup = acc.find((gt) => gt.groupName === g.groupName)
            if (foundGroup) acc.find((gt) => gt.groupName === g.groupName)?.transactions.push({ ...currentTransaction, group: g });
            else acc.push({ ...g, transactions: [{ ...currentTransaction, group: g }] })
          });
          return acc;
        },
        []
      )
      .map<ProcessedTransactionGroup>((g, i, arr) => ({ ...g, ...getGroupEconomicBreakdown(g), percentage: getGroupPercentage(g, arr) }))
      .sort((g1, g2) =>
        Math.abs(g1.total) < Math.abs(g2.total) ? 1 : -1
      )
  );

  const selectGroup = (group: ProcessedTransactionGroup) => {
    if (group.groupName === selectedGroup.value?.groupName) selectedGroup.value = undefined
    else selectedGroup.value = group;
  };

  const saveTransactionGroups = () => {
    localStorage.setItem(TRANSACTION_GROUPS_KEY, JSON.stringify(userGroups.value))
  }

  const deleteGroup = (group: ProcessedTransactionGroup) => {
    userGroups.value = userGroups.value.filter(tg => tg.groupName !== group.groupName)
    saveTransactionGroups()
  }

  const addGroup = (group: TransactionGroup) => {
    userGroups.value.push(group)
    saveTransactionGroups()
  }

  return {
    userGroups,
    transactionGroups,
    selectedGroup,
    unclassifiedTransactions,

    selectGroup,
    deleteGroup,
    addGroup,
  }
}