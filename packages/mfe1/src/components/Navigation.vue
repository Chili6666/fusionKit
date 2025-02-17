<template>
  <div class="navigation">
    <button @click="navigateToHome" class="nav-button">
      <svg
        class="icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
      Home
    </button>
    <button @click="navigateToProfile" class="nav-button">
      <svg
        class="icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
        />
      </svg>
      Airport Information
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const navigateToHome = () => {
  router.push("/");
};

const navigateToProfile = () => {
  router.push("/placeholder");
};
</script>

<style scoped>
.navigation {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 5px;
  margin-right: 5px;
}

.nav-button {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  min-width: 200px;
}

.icon {
  margin-right: 8px;
}
</style>
