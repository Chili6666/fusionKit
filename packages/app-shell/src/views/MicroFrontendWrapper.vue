<template>
  <div id="mycontainer"></div>
</template>

<script setup lang="ts">
import { init, unmount, getOptions } from "mfe1/bootstrap";
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
  init("mycontainer");
  const opts: {
    id: string;
    name: string;
  } = getOptions();
  console.table(opts);
});

onUnmounted(() => {
  console.log("Unmounting MFE1");
  unmount();
});
</script>
