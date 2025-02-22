// filepath: /d:/dev/myGithub/fusionKit/packages/app-shell/src/App.vue
<template>
  <div class="shell-container">
    <div class="toolbar">
      <button @click="navigateToHome">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      </button>
      <button @click="handleShowMessageBox">Show MessageBox</button>
      <button @click="handleShowNotification">Show Notification</button>
      <button @click="handleShowToast">Show Toast</button>
      <button @click="handleLogout">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M16 13v-2H7V8l-5 4 5 4v-3h9zm4-9H10v2h10v14H10v2h10c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" />
        </svg>
      </button>
    </div>

    <router-view></router-view>

    <LoggerDisplay class="logger"></LoggerDisplay>
    <Toast v-if="toast.visible" :message="toast.message" :type="toast.type" :duration="toast.duration" />
    <MessageBox :visible="messageBox.visible" :header="messageBox.header" :text="messageBox.text" @close="messageBox.visible = false" />
  </div>
</template>

<script setup lang="ts">
import LoggerDisplay from './components/LoggerDisplay.vue';
import Toast from './components/Toast.vue';
import MessageBox from './components/MessageBox.vue';
import { inject, onMounted, ref } from 'vue';
import type { FusionApp } from 'fusion-kit';
import { AppFrameAdapter } from './utils/AppFrameAdapter';
import { useRouter } from 'vue-router';
import type { RemoteModuleConfiguration } from 'fusion-kit-contracts';

const router = useRouter();

// Inject the shellApp provided in main.ts
const fusionApp = inject<FusionApp>('fusionApp');

if (!fusionApp) {
  throw new Error('shellApp not found');
}

// Register the frame adapter
fusionApp.registerFrameAdapter(new AppFrameAdapter());

const navigateToHome = () => {
  router.push('/');
};

const handleLogout = async () => {
  await fusionApp.auth.logout();
  console.log('Logged out');
};

const handleShowMessageBox = () => {
  messageBox.value = {
    visible: true,
    header: 'Message Box',
    text: 'Hello from Shell App',
  };
};

const messageBox = ref({
  visible: false,
  header: '',
  text: '',
});
const handleShowNotification = () => {
  fusionApp.userFeedback.showNotification('Hello from Shell App', 'info');
};

const toast = ref({
  visible: false,
  message: '',
  type: 'info' as 'info' | 'success' | 'warning' | 'error',
  duration: 3000,
});

const handleShowToast = () => {
  console.log('Show Toast' + toast.value.visible);
  toast.value = {
    visible: true,
    message: 'Hello from Shell App',
    type: 'info',
    duration: 3000,
  };

  setTimeout(() => {
    toast.value.visible = false;
  }, toast.value.duration);
};

// Load microfrontends on component mount
onMounted(async () => {
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

  // Load modules from configuration
  const dynamicRemotes = fusionApp.configurationManager.getContent<RemoteModuleConfiguration[]>('dynamicRemotes');

  if (!dynamicRemotes) {
    console.error('Dynamic Remotes is not initialized');
    return;
  }

  // TODO - check if module is already loaded
  // Initialize remote modules.
  await fusionApp.remoteModuleManager.loadRemoteModules(dynamicRemotes);

  const userInfo = await fusionApp.auth.getUserInfo();
  if (userInfo?.email) {
    fusionApp.logger?.info(userInfo.email);
  }


  fusionApp.remoteModuleManager.getLoadedRemoteModules().forEach(module => {
    fusionApp.logger?.info( module.title);
  });
});
</script>

<style scoped>
.shell-container {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
}

.toolbar {
  display: flex;
  justify-content: space-around;
  background-color: #f0f0f0;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.logger {
  border-top: 1px solid #ccc;
  padding: 10px;
}

.icon {
  transform: rotate(180deg);
}
</style>
