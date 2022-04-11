<script setup lang="ts">
import { computed, toRef, watch } from "vue";
import { useLoadMore } from "../composables/useLoadMore";
import { ProcessedTransactionGroup } from "../lib/types";
import TransactionItem from "./Transaction.vue";

const props = defineProps<{
  group?: ProcessedTransactionGroup;
}>();

const group = toRef(props, "group");
const transactions = computed(() => group?.value?.transactions || []);

const { results, canLoadMore, loadMore, resetPagination } = useLoadMore(
  transactions || []
);

watch(group, () => resetPagination());
</script>

<template>
  <section class="transactions-table">
    <template v-if="group">
      <TransitionGroup mode="out-in">
        <TransactionItem
          v-for="transaction in results"
          :key="transaction.id"
          :transaction="transaction"
        />
      </TransitionGroup>
      <button
        class="transactions-table__load-more-button"
        v-if="canLoadMore"
        type="button"
        @click="loadMore"
      >
        Load more
      </button>
    </template>
    <span v-else>Please select a group</span>
  </section>
</template>

<style scoped lang="scss">
@import "../variables";
.transactions-table {
  display: flex;
  flex-direction: column;
  gap: 5px;

  .transactions-table__load-more-button {
    @include button("pending_white.svg");
    justify-content: center;
    margin-top: 25px;
  }
}
</style>
