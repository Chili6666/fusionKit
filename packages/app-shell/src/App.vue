<template>
  <div class="shell-container">
    <div class="toolbar">
      <button @click="navigateToHome">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      </button>
      <button @click="() => handleShowMessageBox('Title', [{ message: 'Message' }])">Show MessageBox</button>
      <button @click="() => handleShowNotification('Notification message', 'info')">Show Notification</button>
      <button @click="() => handleShowToast('Default message', 'info')">Show Toast</button>
    </div>
    <div class="content-container">
      <div class="sidebar">
        <div class="email">{{ userEmail }}</div>
        <ul class="menu">
          <li @click="editProfileAction">Edit Profile</li>
          <hr class="separator" />
          <li v-for="item in menuItems" :key="item.id" @click="executeMenuItemAction(item)">
            {{ item.title }}
          </li>
          <hr class="separator" />
          <li class="logout" @click="handleLogout">
            <span>Logout</span>
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M16 13v-2H7V8l-5 4 5 4v-3h9zm4-9H10v2h10v14H10v2h10c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" />
            </svg>
          </li>
        </ul>
      </div>

      <router-view></router-view>
    </div>
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
import type { MessageBoxMessage, ModuleMenuItem, NotificationTypes, RemoteModuleConfiguration, ToastTypes } from 'fusion-kit-contracts';

const router = useRouter();

// Inject the shellApp provided in main.ts
const fusionApp = inject<FusionApp>('fusionApp');
const userEmail = ref('');
const menuItems = ref<ModuleMenuItem[]>([]);

if (!fusionApp) {
  throw new Error('shellApp not found');
}

const navigateToHome = () => {
  router.push('/');
};

const handleLogout = async () => {
  await fusionApp.auth.logout();
  console.log('Logged out');
};

const editProfileAction = () => {
  fusionApp.userFeedback.showToast('Nice try', 'info');
};

const handleShowMessageBox = (title: string, messages: MessageBoxMessage[]) => {
  messageBox.value = {
    visible: true,
    header: title,
    text: messages.length > 0 ? messages[0].message ?? '' : '',
  };
};

const messageBox = ref({
  visible: false,
  header: '',
  text: '',
});
const handleShowNotification = (message: string | undefined, type: NotificationTypes) => {
  console.log('Notification:', message, type);
};

const toast = ref({
  visible: false,
  message: '',
  type: 'info' as 'info' | 'success' | 'warning' | 'error',
  duration: 3000,
});

const handleShowToast = (message: string, toastType: ToastTypes = 'info') => {
  toast.value = {
    visible: true,
    message: message,
    type: toastType,
    duration: 3000,
  };

  setTimeout(() => {
    toast.value.visible = false;
  }, toast.value.duration);
};

const executeMenuItemAction = (menuItem: ModuleMenuItem) => {
  if (menuItem.execute) menuItem.execute();
};

const proxy = {
  handleShowToast,
  handleShowNotification,
  handleShowMessageBox,
};

// Register the frame adapter
fusionApp.registerFrameAdapter(new AppFrameAdapter(proxy));


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
    userEmail.value = userInfo.email;
  }

  fusionApp.remoteModuleManager.getLoadedRemoteModules().forEach(module => {
    module.menuItems.forEach(item => {
      menuItems.value.push(item);
    });
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

.content-container {
  display: grid;
  grid-template-columns: 200px 1fr;
}

.sidebar {
  background-color: #f0f0f0;
  padding: 10px;
  border-right: 1px solid #ccc;
}

.email {
  font-weight: bold;
  margin-bottom: 20px;
}

.menu {
  list-style: none;
  padding: 0;
}

.menu li {
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center; /* Center align text and icon */
}

.menu li:hover {
  text-decoration: underline;
}

.logout {
  display: flex;
  align-items: center;
  justify-content: center; /* Center align text and icon */
}

.logout svg {
  margin-left: 5px;
}

.logger {
  border-top: 1px solid #ccc;
  padding: 10px;
}

.icon {
  transform: rotate(180deg);
}

.separator {
  border: none;
  border-top: 1px solid #ccc;
  margin: 10px 0;
}
</style>