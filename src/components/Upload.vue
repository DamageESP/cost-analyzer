<script setup lang="ts">
import { ref } from "vue";
import readXlsxFile from "read-excel-file";
import { Transaction } from "../lib/types";

const emit = defineEmits<{
  (e: "got-transactions", transactions: Transaction[]): void;
}>();

const draggingOver = ref(false);
const fileInput = ref<HTMLInputElement>();
const files = ref<FileList>();

const fileInputChanged = (e: any) => {
  files.value = e.target.files;
  upload();
};

const dropped = (e: DragEvent) => {
  unhighlight();
  let dt = e.dataTransfer?.files;
  files.value = dt;
  upload();
};

const highlight = () => (draggingOver.value = true);
const unhighlight = () => (draggingOver.value = false);
const openFilePicker = () => fileInput.value?.click();

const upload = async () => {
  if (!files.value?.length || files.value?.item(0) === null) return;
  const data = await readXlsxFile(files.value.item(0)!);
  try {
    const transactions: Transaction[] = data
      .filter(
        (row) =>
          row.filter((col) => col).length >= 3 &&
          (row[0] instanceof Date ||
            (new Date(row[0] as string) instanceof Date &&
              !isNaN(new Date(row[0] as string).getTime()))) &&
          typeof row[2] === "string" &&
          typeof row[3] === "number"
      )
      .map((row, i) => ({
        id: i.toString(),
        concept: row[2] as string,
        date: new Date(row[0] as string),
        amount: row[3] as number,
      }));
    if (transactions.length) emit("got-transactions", transactions);
    else throw new Error("Could not find transactions in the given file");
  } catch (err) {
    console.error("Could not parse uploaded file.", err);
    files.value = undefined;
  }
};
</script>

<template>
  <section class="upload">
    <h1 class="upload__page-title">Cost analyzer</h1>
    <div
      class="upload__box"
      :class="{ draggingOver: draggingOver }"
      @drop.stop.prevent="dropped"
      @dragenter.stop.prevent="highlight"
      @dragover.stop.prevent="highlight"
      @dragleave.stop.prevent="unhighlight"
      @click="openFilePicker"
    >
      <div class="upload__box-intro">
        <img
          class="upload__box-icon"
          src="../assets/icons/upload_file_black.svg"
          alt="Upload file"
        />
        <h2 class="upload__box-header">
          Drop your transactions file here (.xlsx)
        </h2>
        <span></span>
        <div>
          <p>The expected format is 5 columns:</p>
          <ol>
            <li>Date of movement</li>
            <li>(empty)</li>
            <li>Movement concept</li>
            <li>Amount</li>
          </ol>
        </div>
        <input
          type="file"
          @change="fileInputChanged"
          hidden
          ref="fileInput"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "../variables";

.upload {
  display: grid;
  grid-template-rows: auto 1fr;
  padding: 15px;

  .upload__page-title {
    @include header;
    margin-bottom: 50px;
  }
  .upload__box {
    border: 2px dashed $text-color;
    border-radius: 15px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 150px 15px;
    max-height: 600px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
    &.draggingOver {
      background-color: lightblue;
    }

    .upload__box-intro {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 10px 15px;
      align-items: center;

      .upload__box-icon {
        width: 48px;
        height: 48px;
      }
      .upload__box-header {
        font-size: 18px;
        font-weight: 500;
      }
    }
  }
}
</style>
