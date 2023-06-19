<script setup lang="ts">
import { ref } from "vue";
import BaseSelect from "./components/BaseSelect.vue";

const options = ref(["Option 1", "Option 2", "Option 3"]);
</script>

<template>
  <main>
    <BaseSelect :options="options" />
  </main>
</template>
