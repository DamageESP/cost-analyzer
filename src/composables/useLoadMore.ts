import { computed, ComputedRef, Ref, ref, watch } from "vue"

export const useLoadMore = <T>(itemList: ComputedRef<T[]>) => {
  const pageSize = 10
  const currentPage = ref(1)
  const results = computed(() => itemList.value.slice(0, pageSize * currentPage.value))
  const canLoadMore = computed(() => results.value.length < itemList.value.length)

  const loadMore = () => {
    currentPage.value++
  }
  const resetPagination = () => {
    currentPage.value = 1
  }

  return {
    results,
    canLoadMore,

    loadMore,
    resetPagination,
  }
}