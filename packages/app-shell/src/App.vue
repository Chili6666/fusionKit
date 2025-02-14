<template>
  <div id="app">
    <div class="toolbar">
      <button @click="navigateToHome">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      </button>
      <button @click="handleShowMessageBox">Show MessageBox</button>
      <button @click="handleShowNotification">Show Notification</button>
      <button @click="handleShowToast">Show Toast</button>
      <button @click="handleLogout">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" >
          <path d="M16 13v-2H7V8l-5 4 5 4v-3h9zm4-9H10v2h10v14H10v2h10c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/>
        </svg>
      </button>
    </div>

    <router-view></router-view>
    <LoggerDisplay class="logger"></LoggerDisplay>
  </div>
</template>

<script setup lang="ts">
import LoggerDisplay from "./components/LoggerDisplay.vue";
import { inject } from "vue";
import type { FusionApp } from "fusion-kit";
import { AppFrameAdapter } from "./utils/AppFrameAdapter";
import { useRouter } from 'vue-router';
const router = useRouter();

// Inject the shellApp provided in main.ts
const shellApp = inject<FusionApp>("shellApp");

if (!shellApp) {
  throw new Error("shellApp not found");
}
//register the frame adapter
shellApp.registerFrameAdapter(new AppFrameAdapter());

const navigateToHome = () => {
  router.push('/');
};

const handleLogout = async () => {
  await shellApp.auth.logout();
  console.log("Logged out");
};

const handleShowMessageBox = () => {
  shellApp.userFeedback.showMessageBox(
    "This is a message box",
    [{ message: "Hello from Shell App", type: "info" }],
    "cancel",
    "ok"
  );
};

const handleShowNotification = () => {
  shellApp.userFeedback.showNotification("Hello from Shell App", "info");
};

const handleShowToast = () => {
  shellApp.userFeedback.showToast("Hello from Shell App", "info");
};
</script>

<style scoped>
#app {
  display: grid;
  grid-template-rows: auto 1fr auto;
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

.icon{
  transform: rotate(180deg);
}
</style>
