<template>
  <div class="mfe1">
    <h1>Flight viewer</h1>
    <div class="container">
      <Navigation></Navigation>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navigation from "./components/Navigation.vue";
</script>

<style scoped>
.mfe1 {
  background-color: rgb(254, 254, 133);
}
.container {
  display: grid;
  grid-template-columns: auto 1fr;
}
</style>
