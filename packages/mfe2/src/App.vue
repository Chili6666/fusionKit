<template>
  <div class="mfe2">
    <h1>Microfrontend 2</h1>
    <div id="map" class="map"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

onMounted(() => {
  new Map({
    target: 'map',
    controls: [],
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
    view: new View({
      center: [0, 0],
      zoom: 2
    })
  });
});
</script>

<style>
.map {
  width: 100%;
  height: 400px;
}

.mfe2 {
 background-color: rgb(254, 254, 133);
}
</style>