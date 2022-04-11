<script setup lang="ts">
import { ProcessedTransactionGroup } from "../lib/types";
import Group from "./Group.vue";

defineEmits<{
  (e: "select-group", group: ProcessedTransactionGroup): void;
  (e: "delete-group", group: ProcessedTransactionGroup): void;
}>();

defineProps<{
  groups: ProcessedTransactionGroup[];
  selectedGroup: ProcessedTransactionGroup | undefined;
  unclassifiedTransactions: ProcessedTransactionGroup;
}>();
</script>

<template>
  <nav class="group-sidebar">
    <transition-group>
      <Group
        v-for="group in groups"
        :key="group.groupName"
        :group="group"
        :selected="selectedGroup?.groupName === group.groupName"
        @select-group="$emit('select-group', $event)"
        @delete-group="$emit('delete-group', $event)"
      />
      <Group
        key="other"
        :group="unclassifiedTransactions"
        @select-group="$emit('select-group', $event)"
      />
    </transition-group>
  </nav>
</template>

<style scoped lang="scss">
@import "../variables";
.group-sidebar {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
