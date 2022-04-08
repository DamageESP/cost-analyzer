<script setup lang="ts">
import { ProcessedTransactionGroup, TransactionGroup } from "../lib/types";
import { displayAmount, getColorForGroup } from "../lib/helpers";

defineProps<{
  group: ProcessedTransactionGroup;
  selected?: boolean;
}>();

defineEmits<{
  (e: "select-group", group: ProcessedTransactionGroup): void;
  (e: "delete-group", group: ProcessedTransactionGroup): void;
}>();
</script>

<template>
  <article
    :style="{
      background: `linear-gradient(90deg, white ${
        group.percentage
      }%, ${getColorForGroup(group)} ${group.percentage}%, ${getColorForGroup(
        group
      )})`,
    }"
    class="group"
    :class="{ selected }"
    @click="$emit('select-group', group)"
  >
    <div class="group__actions">
      <button type="button" @click="$emit('delete-group', group)">x</button>
    </div>
    <strong class="group-name">{{ group.groupName }}</strong>
    <!-- <span>{{ displayAmount(group.total || 0) }}</span>
    <template v-if="selected">
      <span class="group__income">{{ displayAmount(group.income || 0) }}</span>
      <span class="group__expense">{{
        displayAmount(group.expense || 0)
      }}</span>
    </template>
     -->
  </article>
</template>

<style scoped lang="scss">
@import "../variables";
.group {
  cursor: pointer;
  display: flex;
  justify-content: end;
  align-items: center;
  border-radius: 7px;
  gap: 7px;
  padding: 10px;
  &:not(.selected) {
    .group__actions {
      display: none;
    }
  }

  &.selected {
    border: 2px solid #333;
  }

  .group-name {
    font-size: 18px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .group__income {
    color: lightgreen;
  }
  .group__expense {
    color: red;
  }
}
</style>
