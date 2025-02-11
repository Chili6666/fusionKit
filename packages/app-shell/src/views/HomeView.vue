<template>
  <div class="content">
    <h1>Welcome to Microfrontends</h1>
    <div class="features">
      <div class="feature" @click="navigateToMFE1">
        <h3>Microfrontend 1</h3>
        <p>Load some Flights</p>
      </div>

      <div class="feature" @click="navigateToMFE2">
        <h3>Microfrontend 2</h3>
        <p>Load a Map</p>
      </div>

      
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

const navigateToMFE1 = () => {
  router.push('/mfe1');
};

const navigateToMFE2 = () => {
  router.push('/mfe2');
};

</script>

<style scoped>
.features {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 30px;
}

.feature {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  cursor: pointer;
  user-select: none;
}
</style>
