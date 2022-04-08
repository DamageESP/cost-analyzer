import { reactive, ref } from "vue"
import { TransactionGroup } from "../lib/types"

export const useNewTransactionGroup = () => {
  const newTransactionGroup: TransactionGroup = reactive<TransactionGroup>({
    conceptContains: [],
    groupName: '',
    transactions: [],
  })
  const newKeyword = ref<string>('')

  const addKeyword = (keyword: string) => {
    if (newTransactionGroup.conceptContains.includes(keyword)) return
    newTransactionGroup.conceptContains.push(keyword)
  }

  const removeKeyword = (keyword: string) => {
    newTransactionGroup.conceptContains = newTransactionGroup.conceptContains.filter(k => k !== keyword)
  }

  const resetNewGroup = () => {
    newKeyword.value = ''
    newTransactionGroup.conceptContains = []
    newTransactionGroup.groupName = ''
  }

  return {
    newTransactionGroup,
    newKeyword,

    addKeyword,
    removeKeyword,
    resetNewGroup,
  }
}
