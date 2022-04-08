<script setup lang="ts">
import { format } from "date-fns";
import { displayAmount, getColorForGroup } from "../lib/helpers";
import { Transaction } from "../lib/types";

defineProps<{
  transaction: Transaction;
}>();
</script>

<template>
  <article
    class="transaction"
    :style="
      transaction.group && {
        backgroundColor: `${getColorForGroup(transaction.group)}`,
      }
    "
  >
    <span>{{ format(transaction.date, "dd/MM/yyyy") }}</span>
    <span class="transaction-concept">{{ transaction.concept }}</span>
    <span>{{ displayAmount(transaction.amount) }}</span>
  </article>
</template>

<style scoped lang="scss">
@import "../variables";
.transaction {
  display: grid;
  grid-template-columns: 100px minmax(200px, 1fr) auto;
  align-items: center;
  gap: 50px;
  padding: 10px;
  border-radius: 8px;

  .transaction-concept {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>
