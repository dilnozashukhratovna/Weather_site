<template>
  <div :class="store.is_active ? 'menu' : 'menu__hidden'">
    <button
      v-for="region in regions"
      :key="region"
      class="menu__options"
      @click="selectRegion(region)">
      {{ region.name }}
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "../store/store.js";
const store = useStore();

const getData = (lat, lon) => {
  store.getData(lat, lon);
};

const selectRegion = (region) => {
  store.setSelectedRegion(region);
  store.is_active = false;
  getData(region.point.lat, region.point.lon);
};

const regions = ref([
  { name: "Tashkent", point: { lat: 41.3123363, lon: 69.2787079 } },
  { name: "Andijon", point: { lat: 40.7821, lon: 72.3442 } },
  { name: "Namangan", point: { lat: 40.9983, lon: 71.6726 } },
  { name: "Sirdaryo", point: { lat: 40.8436, lon: 68.6617 } },
  { name: "Surxondaryo", point: { lat: 38.0, lon: 67.295999 } },
  { name: "Qashqadaryo", point: { lat: 38.5833, lon: 65.7538819 } },
  { name: "Xorazm", point: { lat: 41.529928, lon: 60.61665 } },
  { name: "Navoiy", point: { lat: 40.0844, lon: 65.3792 } },
  { name: "Buxoro", point: { lat: 39.7747, lon: 64.4286 } },
  { name: "Qoraqalpog'iston", point: { lat: 40.3842, lon: 71.7843 } },
  { name: "Farg'ona", point: { lat: 40.3842, lon: 71.7843 } },
  { name: "Samarqand", point: { lat: 39.6550017, lon: 66.9756954 } },
]);
</script>

<style lang="scss" scoped>
.menu {
  position: fixed;
  right: 0;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1rem;
  height: 100vh;
  width: 20%;
  transition: all 0.2s linear;
  z-index: var(--z-modal);
}

@media screen and (max-width: 767px) {
  .menu {
    width: 50%;
  }
}
.menu__hidden {
  opacity: 0;
  visibility: hidden;
  display: none;
}
.menu__options {
  padding: var(--small-font-size);
  border: none;
  color: white;
  background: transparent;
  font-size: var(--h3-font-size);
  text-align: left;
  border-radius: 1rem;
  margin-bottom: var(--mb-0-5);
  transition: background-color 0.3s ease, border 0.3s ease, transform 0.3s ease;
  cursor: pointer;
}

.menu__options:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid white;
  transform: scale(1.05);
  cursor: pointer;
}

.menu__options:active {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid white;
}
</style>
