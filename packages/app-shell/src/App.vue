<template>
  <div id="app">
    <div class="toolbar">
      <button @click="handleLogout">Logout</button>
      <button @click="handleShowMessageBox">Show MessageBox</button>
      <button @click="handleShowNotification">Show Notification</button>
      <button @click="handleShowToast">Show Toast</button>
    </div>
    <div class="content">
      <!-- Your main content goes here -->
    </div>
    <LoggerDisplay class="logger"></LoggerDisplay>
  </div>
</template>

<script setup lang="ts">
import LoggerDisplay from "./components/LoggerDisplay.vue";
import { inject } from 'vue';
import type { ShellApp } from 'fusion-kit';
import { AppFrameAdapter } from './utils/AppFrameAdapter';

// Inject the shellApp provided in main.ts
const shellApp = inject<ShellApp>('shellApp');

if (!shellApp) {
  throw new Error('shellApp not found');
}
//register the frame adapter
shellApp.registerFrameAdapter(new AppFrameAdapter());


const handleLogout = async () => {
  await shellApp.auth.logout();
  console.log("Logged out");
};

const handleShowMessageBox = () => {
  shellApp.userFeedback.showMessageBox(
    "This is a message box",[{ message: "Hello from Shell App", type: 'info' }],
    "cancel",
    "ok"
  );
};

const handleShowNotification = () => {
  shellApp.userFeedback.showNotification(
    "Hello from Shell App",
    'info'
  );
};

const handleShowToast = () => {
  shellApp.userFeedback.showToast("Hello from Shell App", "info");
};


</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 95vw;
}

.toolbar {
  display: flex;
  justify-content: space-around;
  background-color: #f0f0f0;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.content {
  flex: 1;
  padding: 20px;
  overflow: auto;
}

.logger {
  border-top: 1px solid #ccc;
  padding: 10px;
  width: 100%;
}
</style>
