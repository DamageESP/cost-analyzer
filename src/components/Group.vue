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
    :class="{ selected: selected }"
    @click="$emit('select-group', group)"
  >
    <div class="group__actions">
      <button
        type="button"
        @click="$emit('delete-group', group)"
        class="group__actions-delete"
      >
        <img src="../assets/icons/delete_black.svg" alt="Delete group" />
      </button>
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
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  &:not(.selected) {
    .group__actions {
      opacity: 0;
    }
  }

  &.selected {
    /* border: 2px solid rgba(0, 0, 0, 0.2); */
    transform: translateX(45px);
    box-shadow: -5px 0px 45px rgba(0, 0, 0, 0.2);
  }

  .group__actions {
    position: absolute;
    left: -45px;
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    opacity: 1;

    &-delete {
      border: 0;
      outline: none;
      background: rgba(0, 0, 0, 0.05);
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px;
      cursor: pointer;

      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
      img {
        width: 20px;
        height: 20px;
      }
    }
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
