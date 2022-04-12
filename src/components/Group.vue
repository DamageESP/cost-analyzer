<script setup lang="ts">
import { ProcessedTransactionGroup } from "../lib/types";
import { getColorForGroup } from "../lib/helpers";

defineProps<{
  group: ProcessedTransactionGroup;
  selected?: boolean;
}>();

defineEmits<{
  (e: "select-group", group: ProcessedTransactionGroup): void;
  (e: "delete-group", group: ProcessedTransactionGroup): void;
  (e: "edit-group", group: ProcessedTransactionGroup): void;
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
        class="group__actions-action"
        title="Delete group"
      >
        <img src="../assets/icons/delete_black.svg" alt="Delete group" />
      </button>
      <button
        type="button"
        @click="$emit('edit-group', group)"
        class="group__actions-action"
        title="Edit group"
      >
        <img src="../assets/icons/edit_black.svg" alt="Edit group" />
      </button>
    </div>
    <strong class="group-name">{{ group.groupName }}</strong>
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
  width: 300px;
  &:not(.selected) {
    &:hover {
      transform: translateX(25px);
    }
    .group__actions {
      opacity: 0;
    }
  }

  &.selected {
    /* border: 2px solid rgba(0, 0, 0, 0.2); */
    width: 250px;
    transform: translateX(85px);
    box-shadow: -5px 0px 85px rgba(0, 0, 0, 0.2);
  }

  .group__actions {
    position: absolute;
    left: -85px;
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    opacity: 1;
    display: flex;
    align-items: center;
    gap: 10px;

    &-action {
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
}
</style>
