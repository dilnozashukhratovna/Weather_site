<template>
  <div class="navbar">
    <div class="navbar__logo">
      <i class="uil uil-cloud-sun-rain navbar__icon"></i> ForecastSpot
    </div>
    <div>
      <i
        @click="menu_open()"
        :class="
          store.is_active
            ? 'uil uil-times navbar__menu'
            : 'uil uil-list-ul navbar__menu'
        "></i>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "../store/store";
const store = useStore();
const menu_open = () => {
  if (store.is_active == true) {
    store.is_active = false;
  } else {
    store.is_active = true;
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  width: 100%;
  height: 5rem;
  justify-content: space-between;
  padding-left: 2rem;
  padding-right: 2rem;
  background-color: rgba(0, 0, 0, 0.5);
}

.navbar__logo {
  color: white;
  font-size: var(--h2-font-size);
}

.navbar__menu,
.navbar__icon {
  color: white;
  font-size: var(--h1-font-size);
}

// @media screen and (min-width: 767px) {
//   .navbar__menu {
//     opacity: 0;
//     visibility: hidden;
//     display: none;
//   }
// }

@media screen and (max-width: 477px) {
  .navbar__logo {
    opacity: 0;
    visibility: hidden;
  }
}
</style>
