import { createRouter, createWebHistory } from "vue-router";
import FlightView from "../views/Flights.vue";
import DetailsView from "../views/FlightDetail.vue";
import PlaceHolderView from "../views/PlaceholderView.vue";

const router = createRouter({
  //history: createWebHistory(import.meta.env.BASE_URL)
  history: createWebHistory('/mfe1/'),
  routes: [
    {
      path: "/",
      name: "Home",
      component: FlightView,
    },
    {
      path: '/details/:id',
      name: "Details",
      component: DetailsView,
    },
    {
      path: '/placeholder',
      name: "Placeholder",
      component: PlaceHolderView,
    }
  ],
});

export default router;
