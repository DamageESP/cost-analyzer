<script setup lang="ts">
import { computed, reactive, toRef, toRefs, watch } from "vue";
import { useLoadMore } from "../composables/useLoadMore";
import { ProcessedTransactionGroup, Transaction } from "../lib/types";
import TransactionItem from "./Transaction.vue";

const props = defineProps<{
  group?: ProcessedTransactionGroup;
}>();

const { group } = toRefs(props);
const transactions = computed(() => group?.value?.transactions || []);

const { results, canLoadMore, loadMore, resetPagination } = useLoadMore(
  transactions || []
);

watch(group, () => resetPagination());
</script>

<template>
  <section class="transactions-table">
    <TransactionItem
      v-for="transaction in results"
      :key="transaction.id"
      :transaction="transaction"
    />
    <button v-if="canLoadMore" type="button" @click="loadMore">
      Load more
    </button>
  </section>
</template>

<style scoped lang="scss">
@import "../variables";
.transactions-table {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
