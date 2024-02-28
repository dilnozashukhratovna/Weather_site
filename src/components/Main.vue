<template>
  <div class="box">
    <!--================ BOX FOR CURRENT WEATHER =========================-->
    <div class="box__current">
      <div class="left">
        <h2 class="box__current-city_name" v-if="store?.selectedRegion?.name">
          {{ store?.selectedRegion?.name }}
        </h2>
        <h2 class="box__current-city_name" v-else>
          {{ sortName(store?.weatherData?.timezone) }}
        </h2>
        <p class="box__current-date">
          {{ translateData(store?.weatherData?.current?.dt) }}
        </p>
        <h1 class="box__current-weather_temp">
          {{ roundTemperature(store?.weatherData?.current?.temp) }}&deg;
        </h1>
        <div class="box__current-weather_desc">
          <span
            ><i class="uil uil-sun box__current-icon"></i> Sunrise:
            {{ translateTime(store?.weatherData?.current?.sunrise) }}</span
          >
          <span>
            <i class="uil uil-sunset box__current-icon"></i> Sunset:
            {{ translateTime(store?.weatherData?.current?.sunset) }}
          </span>
        </div>
      </div>
      <div class="right">
        <img
          class="box__current-weather_img"
          :src="getIcon(store?.weatherData?.current?.weather[0]?.icon)"
          alt="img" />
      </div>
    </div>
    <!--================== BOX FOR DAILY WEATHER ========================-->

    <div class="box__daily">
      <div
        class="box__daily-item"
        v-for="day in store?.weatherData?.daily"
        :key="day">
        <span class="left2"
          ><h3 class="box__daily-title">{{ translateData(day?.dt) }}</h3></span
        >
        <span class="right2"
          ><img
            class="box__daily-img"
            :src="getIcon(day?.weather[0]?.icon)"
            alt="img" />
          <h3 class="box__daily-title">
            {{ roundTemperature(day?.temp?.day) }}&deg;
          </h3></span
        >
      </div>
    </div>

    <!--================== BOX FOR EXTRA INFO ========================-->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "../store/store";
const store = useStore();

const translateData = (num) => {
  if (num) {
    const date = new Date(num * 1000);
    return date.toDateString().split(" ").slice(0, 3).join(" ");
  }
};

const translateTime = (num) => {
  if (num) {
    const date = new Date(num * 1000);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
};

const roundTemperature = (temp) => {
  if (temp) {
    return Math.round(temp);
  }
};

const sortName = (name) => {
  if (name) {
    return name.split("/").slice(1, 2).join("");
  }
};

const getIcon = (icon) => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png `;
};
</script>

<style lang="scss" scoped>
.box {
  width: 50%;
  display: flex;
  flex-direction: column;
  margin: left;
  margin-top: var(--mb-1-5);
  margin-left: var(--mb-1-5);
  color: white;
}

.box__current {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 1rem;
}

.left {
  width: 45%;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.right {
  width: 45%;
  display: flex;
  //   align-items: center;
  //   justify-content: center;
}

.box__current-city_name {
  font-size: var(--h2-font-size);
  margin-bottom: var(--mb-0-25);
}

.box__current-date {
  font-size: var(--smaller-font-size);
}

.box__current-weather_temp {
  font-size: var(--big-font-size);
  margin-top: var(--mb-0-5);
  margin-bottom: var(--mb-0-5);
}

.box__current-weather_desc {
  font-size: var(--small-font-size);
  display: flex;
  justify-content: space-around;
  gap: 1rem;
}

.box__current-icon {
  font-size: var(--h3-font-size);
}

.box__daily {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 1rem;
  margin-top: var(--mb-1-5);
  max-height: 25rem;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: #ffffff rgba(255, 255, 255, 0.5);
  scroll-behavior: smooth;
}

.box__daily-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
}

.box__daily-title {
  font-size: var(--normal-font-size);
}

.box__daily-img {
  width: var(--big-font-size);
  height: var(--big-font-size);
}

.left2 {
  display: flex;
  justify-content: center;
  align-items: center;
}
.right2 {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 767px) {
  .box {
    width: 80%;
    margin: auto;
    margin-top: var(--mb-1-5);
  }

  .box__daily {
    display: flex;
    flex-direction: column;
  }

  .right {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media screen and (max-width: 477px) {
  .box__current {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 1rem;
  }
}
</style>
