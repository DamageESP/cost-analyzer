<script setup lang="ts">
import type { Transaction, TransactionGroup } from "../lib/types";
import { toRef, ref } from "vue";
import { useTransactionGroups } from "../composables/useTransactionGroups";
import GroupSidebar from "./GroupSidebar.vue";
import NewTransactionGroup from "./NewTransactionGroup.vue";
import TransactionsTable from "./TransactionsTable.vue";

defineEmits<{ (e: "close-file"): void }>();
const props = defineProps<{ transactions: Transaction[] }>();
const transactions = toRef(props, "transactions");
const {
  transactionGroups,
  unclassifiedTransactions,
  selectedGroup,
  selectGroup,
  deleteGroup,
  addGroup,
} = useTransactionGroups(transactions);

const creatingGroup = ref(false);
const createGroupCallback = (group: TransactionGroup) => {
  addGroup(group);
  creatingGroup.value = false;
};
</script>

<template>
  <main class="cost-analyzer">
    <button
      type="button"
      class="cost-analyzer_add-button"
      @click="creatingGroup = true"
    >
      Create new group
    </button>
    <h1 class="cost-analyzer__header">Transactions</h1>
    <GroupSidebar
      :groups="transactionGroups"
      :unclassifiedTransactions="unclassifiedTransactions"
      :selectedGroup="selectedGroup"
      @select-group="selectGroup($event)"
      @delete-group="deleteGroup($event)"
    />
    <TransactionsTable :group="selectedGroup" />
    <Teleport to="#app">
      <button
        type="button"
        class="exitButton"
        @click="$emit('close-file')"
      ></button>
      <NewTransactionGroup
        v-if="creatingGroup"
        @create-group="createGroupCallback($event)"
        @close="creatingGroup = false"
      />
    </Teleport>
  </main>
</template>

<style scoped lang="scss">
@import "../variables";
.cost-analyzer {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px 75px;
  padding: 15px;

  .cost-analyzer_add-button {
    @include button("add_white.svg");
    justify-self: flex-end;
  }

  .cost-analyzer__header {
    @include header;
  }
}
</style>
