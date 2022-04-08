<script setup lang="ts">
import { onMounted, ref, toRefs } from "vue";
import { useNewTransactionGroup } from "../composables/useNewTransactionGroup";
import { TransactionGroup } from "../lib/types";

const emit = defineEmits<{
  (e: "create-group", group: TransactionGroup): void;
  (e: "close"): void;
}>();

const {
  newTransactionGroup,
  newKeyword,
  addKeyword,
  removeKeyword,
  resetNewGroup,
} = useNewTransactionGroup();

const { conceptContains, groupName } = toRefs(newTransactionGroup);
const groupNameRef = ref();

const checkEnter = (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    addKeyword(newKeyword.value.toLocaleLowerCase());
    newKeyword.value = "";
  }
};
const onNewKeywordChange = (e: Event) => {
  newKeyword.value = (e.target as HTMLInputElement).value;
};
const onGroupNameChange = (e: Event) => {
  groupName.value = (e.target as HTMLInputElement).value;
};
const submitNewGroup = () => {
  if (!newTransactionGroup) return;
  emit("create-group", JSON.parse(JSON.stringify(newTransactionGroup)));
  resetNewGroup();
};

onMounted(() => (groupNameRef.value as HTMLInputElement).focus());
</script>

<template>
  <section class="new-transaction-group">
    <div class="new-transaction-group__content">
      <h1 class="new-transaction-group__header">Add new group</h1>
      <input
        type="text"
        placeholder="Group name"
        ref="groupNameRef"
        class="new-transaction-group__input"
        :value="groupName"
        @input="onGroupNameChange"
      />
      <input
        type="text"
        placeholder="Add keyword"
        class="new-transaction-group__input"
        :value="newKeyword"
        @input="onNewKeywordChange"
        @keypress="checkEnter"
      />
      <div class="new-transaction-group__keywords">
        <button
          type="button"
          @click="removeKeyword(keyword)"
          class="new-transaction-group__keyword"
          v-for="keyword in conceptContains"
          :key="keyword"
        >
          <span class="name">{{ keyword }}</span>
          <img
            class="icon"
            src="../assets/icons/delete_black.png"
            alt="Delete keyword"
          />
        </button>
      </div>
      <button
        type="button"
        @click="submitNewGroup"
        class="new-transaction-group_add-button"
        :disabled="!conceptContains.length || !groupName"
      >
        Add
      </button>
    </div>
    <Teleport to="#app">
      <button type="button" @click="$emit('close')" class="exitButton"></button>
    </Teleport>
  </section>
</template>

<style scoped lang="scss">
@import "../variables";

.new-transaction-group {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  display: grid;
  justify-items: center;
  align-items: center;

  .new-transaction-group__content {
    display: flex;
    flex-direction: column;
    min-width: 300px;
    max-width: 300px;

    .new-transaction-group__header {
      @include header;
      margin-bottom: 30px;
    }

    .new-transaction-group__input {
      @include input;
      display: block;
      margin-bottom: 20px;
    }

    .new-transaction-group__keywords {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 30px;

      .new-transaction-group__keyword {
        font: inherit;
        display: inline-flex;
        align-items: center;
        border: 1px solid rgba(112, 112, 112, 0.2);
        border-radius: 5px 10px 5px 10px;
        padding: 5px 10px;
        background-color: white;
        cursor: pointer;

        &:hover {
          background-color: whitesmoke;
        }

        .icon {
          width: 20px;
          height: 20px;
          margin-left: 5px;
        }
      }
    }

    .new-transaction-group_add-button {
      @include button("add_white.png");
      padding-right: 50px;
      align-self: flex-end;
    }
  }
}
</style>
