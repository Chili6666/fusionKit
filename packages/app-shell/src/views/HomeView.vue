<template>
  <div class="content">
    <h1>Welcome to Fusion Kit</h1>
    <div class="features">
      <div class="feature" @click="navigateToStatic">
        <h3>Static MFE</h3>
        <p>Load a static MFE</p>
      </div>

      <div v-for="module in modules" :key="module.name" class="feature" @click="navigateToModule(module.name)">
        <h3>{{ module.title }}</h3>
        <p>{{ module.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FusionApp } from 'fusion-kit';
import type { Module } from 'fusion-kit-contracts';
import { inject, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const fusionApp = inject<FusionApp>('fusionApp');
const router = useRouter();
const modules = ref<Module[]>([]);


const navigateToModule = (moduleName: string) => {
  const event = new CustomEvent("activate-module", { detail: moduleName });
  window.dispatchEvent(event);
};

const navigateToStatic = () => {
  router.push('/static-mfe');
};

onMounted(() => {
  console.log('HomeView component has been mounted');
  if (!fusionApp) return;
  console.log('HV: Remote modules:', fusionApp.remoteModuleManager?.getLoadedRemoteModules().length);
  //add modules to the modules array
  fusionApp.remoteModuleManager?.getLoadedRemoteModules().forEach(module => {
    modules.value.push(module);
  });
});
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
