<template>
  <div>
    <h1>I'm a simple Microfront</h1>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="100"
      height="100"
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="black"
        stroke-width="5"
        fill="none"
      />
      <line x1="50" y1="5" x2="50" y2="95" stroke="black" stroke-width="5" />
      <line x1="5" y1="50" x2="95" y2="50" stroke="black" stroke-width="5" />
    </svg>

    <button @click="logoutClick">Logout</button>
    <button @click="toastClick">Show Toast</button>
  </div>
</template>

<script setup lang="ts">
import type { FusionApp } from "fusion-kit";
import { inject } from "vue";

const fusionApp = inject<FusionApp>("fusionApp");

const logoutClick = () => {
  if (fusionApp?.auth) {
    fusionApp?.auth.logout();
  }
};

const toastClick = () => {
  if (fusionApp?.userFeedback) {
    fusionApp?.userFeedback.showToast("Hello from MFE", "info");
  }
};
</script>
