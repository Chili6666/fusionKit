<template>
  <div class="mfe1">
    <div>Flight viewer</div>
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
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
}
.container {
  display: grid;
  grid-template-columns: auto 1fr;
  height: 100%;
}
</style>
