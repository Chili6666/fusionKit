<template>
  <div class="mfe2">
    <div>Microfrontend 2</div>
    <div class="map-container">
      <div id="map" class="map"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

onMounted(() => {
  new Map({
    target: "map",
    controls: [],
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: [0, 0],
      zoom: 2,
    }),
  });
});
</script>

<style>
.map {
  width: 100%;
  height: 100%;
}

.map-container {
  height: 100%;
}

.mfe2 {
  background-color: rgb(182, 182, 74);
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
