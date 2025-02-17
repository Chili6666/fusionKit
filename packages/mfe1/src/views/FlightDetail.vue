<template>
  <div class="scroll-viewer">
    <h1>Flight Details</h1>
    <p>Flight ID: {{ flightId }}</p>
    <!-- Display other flight details here -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const flightId = ref(route.params.id);

// You can use the flightId to fetch or display relevant flight data
</script>

<style lang="css">
.scroll-viewer {
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
