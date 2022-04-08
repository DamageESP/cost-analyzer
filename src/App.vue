<script setup lang="ts">
import { ref } from "vue";
import Upload from "./components/Upload.vue";
import CostAnalyzer from "./components/CostAnalyzer.vue";
import { Transaction } from "./lib/types";

const transactions = ref<Transaction[]>([]);
</script>

<template>
  <Upload
    v-if="!transactions.length"
    @got-transactions="transactions = $event"
  />
  <CostAnalyzer
    @close-file="transactions = []"
    v-else
    :transactions="transactions"
  />
</template>

<style lang="scss">
@import "variables";

* {
  margin: 0;
}
#app {
  font-family: "Rubik", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $text-color;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 75px;

  .exitButton {
    position: absolute;
    right: 100px;
    top: 100px;
    width: 50px;
    height: 50px;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    background-image: url("./assets/icons/close_black.png");
    display: block;
  }
}
</style>
