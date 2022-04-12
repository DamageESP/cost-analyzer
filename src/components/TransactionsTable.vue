<script setup lang="ts">
import { computed, toRef, watch } from "vue";
import { useLoadMore } from "../composables/useLoadMore";
import { displayAmount } from "../lib/helpers";
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
      <div class="transactions-table__stats">
        <strong>Group stats</strong>
        <span class="transactions-table__stats-income"
          >Income: {{ displayAmount(group.income || 0) }}</span
        >
        <span class="transactions-table__stats-expense"
          >Expense: {{ displayAmount(group.expense || 0) }}</span
        >
        <span>Total: {{ displayAmount(group.total || 0) }}</span>
      </div>
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

  .transactions-table__stats {
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    border: 2px solid rgba(0, 0, 0, 0.5);
    padding: 15px;
    margin-bottom: 25px;

    .transactions-table__stats-income {
      color: lightgreen;
    }
    .transactions-table__stats-expense {
      color: red;
    }
  }

  .transactions-table__load-more-button {
    @include button("pending_white.svg");
    justify-content: center;
    margin-top: 25px;
  }
}
</style>
