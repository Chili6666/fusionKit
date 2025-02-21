<template>
  <div id="mycontainer"></div>
</template>

<script setup lang="ts">
import type { FusionApp } from 'fusion-kit';
import type { Module, RemoteModuleConfiguration } from 'fusion-kit-contracts';
import { inject, defineProps, onMounted, onUnmounted } from 'vue';

const fusionApp = inject<FusionApp>('fusionApp');

const props = defineProps<{
  moduleName: string;
}>();

let module: Module | undefined = undefined;

onMounted(async () => {
  //initialize remoteModuleManager
  await initialize();
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

const initialize = async () => {
  if (!fusionApp) {
    console.error('Fusion App is not initialized');
    return;
  }

  if (!fusionApp.remoteModuleManager) {
    console.error('Remote Module Manager is not initialized');
    return;
  }

  if (!fusionApp.configurationManager) {
    console.error('Configuration Manager is not initialized');
    return;
  }
  //load modules from configuration
  const dynamicRemotes = fusionApp.configurationManager.getContent<RemoteModuleConfiguration[]>('dynamicRemotes');

  if (!dynamicRemotes) {
    console.error('Dynamic Remotes is not initialized');
    return;
  }

  // TODO - check if module is already loaded
  // initialize remote modules.
  await fusionApp.remoteModuleManager.loadRemoteModules(dynamicRemotes);
};

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
