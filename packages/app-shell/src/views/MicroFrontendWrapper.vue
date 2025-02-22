<template>
  <div id="mycontainer" class="full-height"></div>
</template>

<script setup lang="ts">
import type { FusionApp } from 'fusion-kit';
import type { Module } from 'fusion-kit-contracts';
import { inject, defineProps, onMounted, onUnmounted } from 'vue';

const fusionApp = inject<FusionApp>('fusionApp');

const props = defineProps<{
  moduleName: string;
}>();

let module: Module | undefined = undefined;

onMounted(async () => {
  //load module
  loadModule();

  if (!module) {
    console.error(`Module ${props.moduleName} not found`);
    return;
  }

  if (!module?.mount) {
    console.error(`Module ${props.moduleName} does not have mount function`);
    return;
  }

  //mount module
  module.mount('mycontainer');
  fusionApp?.logger?.info(`Module with name: ${module?.name} loaded`);
});

onUnmounted(() => {
  if (!module) return;
  //unmount module
  module.unmount();
  fusionApp?.logger?.info(`Module with name: ${module?.name} unloaded`);
  //reset value
  module = undefined;
});

const loadModule = () => {
  if (module) return;

  if (!props.moduleName) {
    console.error('Module Name is not provided');
    return;
  }

  //get specific module
  module = fusionApp?.remoteModuleManager?.getLoadedRemoteModule(props.moduleName);

  if (!module) {
    console.error(`Module ${props.moduleName} not found`);
    return;
  }
};
</script>

<style scoped>
.full-height {
  height: 100%;
}

#mycontainer > * {
  height: 100%;
}
</style>