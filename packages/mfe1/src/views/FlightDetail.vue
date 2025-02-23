<template>
  <div class="scroll-viewer">
    <h1>Flight Details</h1>
    <p>Flight ID: {{ flightId }}</p>
    <!-- Display other flight details here -->
     <button @click="showToastClick">show Toast</button>
  </div>
</template>

<script setup lang="ts">
import type { ModuleConfiguration } from 'fusion-kit-contracts';
import { ref, inject } from "vue";
import { useRoute } from "vue-router";

const moduleConfiguration = inject<ModuleConfiguration>('moduleConfiguration');
const route = useRoute();
const flightId = ref(route.params.id);

// You can use the flightId to fetch or display relevant flight data

const showToastClick = () => {
  if(!moduleConfiguration?.userfeedback) return;	
  moduleConfiguration.userfeedback?.showToast('This is a toast message from MFE1', 'info');
};

</script>

<style lang="css">
.scroll-viewer {
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
