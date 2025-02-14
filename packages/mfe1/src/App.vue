<template>
  <div class="mfe1">
    <h1>Microfrontend 1</h1>
    <div class="scroll-viewer">
      <ul class="flights-grid">
        <li v-for="flight in flights" :key="flight.id" class="flight-item">
          <img :src="flight.image" alt="Aircraft Image" width="100" />
          <p>Aircraft Type: {{ flight.aircraftType }}</p>
          <p>Arrival: {{ flight.arrival }}</p>
          <p>Destination: {{ flight.destination }}</p>
          <p>Number of Passengers: {{ flight.passengers }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Flight {
  id: number;
  aircraftType: string;
  image: string;
  arrival: string;
  destination: string;
  passengers: number;
}

const flights = ref<Flight[]>([
  { id: 1, aircraftType: 'Boeing 737', image: 'image1.jpg', arrival: 'New York', destination: 'Los Angeles', passengers: 150 },
  { id: 2, aircraftType: 'Airbus A320', image: 'image2.jpg', arrival: 'Chicago', destination: 'Miami', passengers: 160 },
  { id: 3, aircraftType: 'Boeing 747', image: 'image3.jpg', arrival: 'San Francisco', destination: 'Tokyo', passengers: 300 },
  { id: 4, aircraftType: 'Airbus A380', image: 'image4.jpg', arrival: 'London', destination: 'Dubai', passengers: 500 },
  { id: 5, aircraftType: 'Boeing 777', image: 'image5.jpg', arrival: 'Paris', destination: 'New York', passengers: 280 },
  { id: 6, aircraftType: 'Boeing 787', image: 'image6.jpg', arrival: 'Sydney', destination: 'Singapore', passengers: 240 },
  { id: 7, aircraftType: 'Airbus A330', image: 'image7.jpg', arrival: 'Berlin', destination: 'Moscow', passengers: 220 },
  { id: 8, aircraftType: 'Boeing 767', image: 'image8.jpg', arrival: 'Toronto', destination: 'Vancouver', passengers: 180 },
  { id: 9, aircraftType: 'Airbus A350', image: 'image9.jpg', arrival: 'Madrid', destination: 'Buenos Aires', passengers: 320 },
  { id: 10, aircraftType: 'Boeing 737', image: 'image10.jpg', arrival: 'Rome', destination: 'Athens', passengers: 140 },
  { id: 11, aircraftType: 'Airbus A320', image: 'image11.jpg', arrival: 'Amsterdam', destination: 'Barcelona', passengers: 160 },
  { id: 12, aircraftType: 'Boeing 747', image: 'image12.jpg', arrival: 'Hong Kong', destination: 'Los Angeles', passengers: 350 },
  { id: 13, aircraftType: 'Airbus A380', image: 'image13.jpg', arrival: 'Frankfurt', destination: 'Bangkok', passengers: 500 },
  { id: 14, aircraftType: 'Boeing 777', image: 'image14.jpg', arrival: 'Vienna', destination: 'Istanbul', passengers: 270 },
  { id: 15, aircraftType: 'Boeing 787', image: 'image15.jpg', arrival: 'Zurich', destination: 'Johannesburg', passengers: 250 },
  { id: 16, aircraftType: 'Airbus A330', image: 'image16.jpg', arrival: 'Brussels', destination: 'Lisbon', passengers: 210 },
  { id: 17, aircraftType: 'Boeing 767', image: 'image17.jpg', arrival: 'Oslo', destination: 'Stockholm', passengers: 190 },
  { id: 18, aircraftType: 'Airbus A350', image: 'image18.jpg', arrival: 'Helsinki', destination: 'Seoul', passengers: 310 },
  { id: 19, aircraftType: 'Boeing 737', image: 'image19.jpg', arrival: 'Copenhagen', destination: 'Reykjavik', passengers: 130 },
  { id: 20, aircraftType: 'Airbus A320', image: 'image20.jpg', arrival: 'Dublin', destination: 'Edinburgh', passengers: 150 }
]);
</script>

<style scoped>
.scroll-viewer {
  max-height: 400px;
  overflow-y: auto;
}

.flights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  list-style-type: none;
  padding: 0;
}

.flight-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.flight-item img {
  margin-bottom: 10px;
}

.flight-item p {
  margin: 5px 0;
}

.mfe1 {
 background-color: rgb(254, 254, 133);;
}
</style>