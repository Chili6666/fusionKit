<template>
  <div v-if="loading" class="loading">Loading...</div>
  <div class="shell-container" v-else>
    <div class="toolbar">
      <button @click="navigateToHome">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      </button>

      <!-- add modules to the header -->
      <div class="button-container">
        <button class="parallelogram-btn" v-for="module in modules" :key="module.name" @click="handleActivateModule(module.name)">
          <svg viewBox="0 0 100 50" preserveAspectRatio="none">
            <path class="parallelogram" d="M20,0 L100,0 L80,50 L0,50 Z" fill="yellow" stroke="purple" stroke-width="2" />
          </svg>
          <span> {{ module.title }}</span>
        </button>
      </div>

      <button @click="() => handleShowMessageBox('Title', [{ message: 'Message' }])">Show MessageBox</button>
      <button @click="() => handleShowNotification('Notification message', 'info')">Show Notification</button>
      <button @click="() => handleShowToast('Default message', 'info')">Show Toast</button>
    </div>
    <div class="content-container">
      <div class="sidebar">
        <div class="email">{{ userEmail }}</div>
        <ul class="menu">
          <li @click="editProfileAction">Edit Profile</li>
          <hr class="separator" v-if="menuItems.length > 0 " />
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
import { inject, onMounted, ref, watch } from 'vue';
import type { FusionApp } from 'fusion-kit';
import { AppFrameAdapter } from './utils/AppFrameAdapter';
import { useRouter } from 'vue-router';
import type { MessageBoxMessage, Module, ModuleMenuItem, NotificationTypes, RemoteModuleConfiguration, ToastTypes } from 'fusion-kit-contracts';
import { addMfeRoute } from './router';

const router = useRouter();

// Inject the shellApp provided in main.ts
const fusionApp = inject<FusionApp>('fusionApp');
const userEmail = ref('');
const menuItems = ref<ModuleMenuItem[]>([]);
const modules = ref<Module[]>([]);
const activeModule = ref<Module | undefined>();
const loading = ref(true); // Add loading state

if (!fusionApp) {
  throw new Error('shellApp not found');
}

//************************************************** */
// Navigation between modules
//************************************************** */
const navigateToHome = () => {
  router.push('/');
  activeModule.value = undefined;
};

const handleActivateModule = (moduleName: string) => {
  activeModule.value = modules.value.find(module => module.name === moduleName);
  fusionApp.encryptedStorage?.setItem('activeModule', activeModule.value);
};

// Watch for changes to activeModule
watch(activeModule, newModule => {
  if (newModule) {
    router.push(`/${newModule.name}`);
    //add menu items to the sidebar
    // Create a new array and add newModule.menuItems to it
    const tempMenuItems = [...newModule.menuItems];
    // Apply the temp array to App menuItems
    menuItems.value = tempMenuItems;
  } else {
    menuItems.value = [];//reset menuitems
  }
});

//************************************************** */
// Handle Menu Item action
//************************************************** */

const handleLogout = async () => {
  await fusionApp.auth.logout();
  console.log('Logged out');
};

const editProfileAction = () => {
  fusionApp.userFeedback.showToast('Nice try', 'info');
};

const executeMenuItemAction = (menuItem: ModuleMenuItem) => {
  console.log('Executing menu item:', menuItem);
  if (menuItem.execute) menuItem.execute();
};

//************************************************** */
//Handle ugly vue bindings. everythings get better if we use a web component
//************************************************** */

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

const proxy = {
  handleShowToast,
  handleShowNotification,
  handleShowMessageBox,
};

//************************************************** */
// Load modules and menu items and all this other stuff
//************************************************** */

// Register the frame adapter
fusionApp.registerFrameAdapter(new AppFrameAdapter(proxy));

// Load microfrontends on component mount
onMounted(async () => {
  if (!fusionApp) {
    console.error('Fusion App is not initialized');
    return;
  }

  //add the email to the sidebar
  const userInfo = await fusionApp.auth.getUserInfo();
  if (userInfo?.email) {
    userEmail.value = userInfo.email;
  }

  if (!fusionApp.remoteModuleManager) {
    loading.value = false;
    console.error('Remote Module Manager is not initialized');
    return;
  }

  if (!fusionApp.configurationManager) {
    loading.value = false;
    console.error('Configuration Manager is not initialized');
    return;
  }

  // Load modules from configuration
  const dynamicRemotes = fusionApp.configurationManager.getContent<RemoteModuleConfiguration[]>('dynamicRemotes');

  if (!dynamicRemotes) {
    console.error('Dynamic Remotes is not initialized');
    loading.value = false;
    return;
  }

  // TODO - check if module is already loaded
  // Initialize remote modules.
  await fusionApp.remoteModuleManager.loadRemoteModules(dynamicRemotes);

  fusionApp.remoteModuleManager.getLoadedRemoteModules().forEach(module => {
    //add modules to the modules array
    modules.value.push(module);
    addMfeRoute(module.name); //add dynamic routes to the router
  });

  //handling the the switch between modules
  window.addEventListener('activate-module', (event: Event) => {
    const customEvent = event as CustomEvent;
    handleActivateModule(customEvent.detail);
  });

  loading.value = false; // Set loading to false after modules are loaded
});
</script>

<style scoped>
.shell-container {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  position: absolute;
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

.button-container {
  display: flex;
  margin: 0;
  padding: 0;
}

.parallelogram-btn {
  padding: 0;
  margin: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
  position: relative;
  min-width: 120px;
  height: 50px;
  outline: none; /* Remove focus frame */
}

.parallelogram-btn:not(:first-child) {
  transform: translateX(-24px); /* Apply transformation to all except the first one */
}

.parallelogram-btn svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.parallelogram-btn span {
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
}

.parallelogram-btn:hover .parallelogram {
  fill: red;
}
</style>
