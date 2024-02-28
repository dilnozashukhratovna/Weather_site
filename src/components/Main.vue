<template>
  <div class="main">
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
          <p class="box__current-weather_desc">
            <i class="uil uil-info-circle"></i>
            {{ store?.weatherData?.current?.weather[0]?.main }}
          </p>
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
            ><h3 class="box__daily-title">
              {{ translateData(day?.dt) }}
            </h3></span
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
    </div>
    <!--================== BOX FOR EXTRA INFO ========================-->
    <div class="box__extra">
      <div class="box__extra-item">
        <i class="uil uil-sun box__extra-icon"></i>
        <span>Sunrise</span>
        <h1>{{ translateTime(store?.weatherData?.current?.sunrise) }}</h1>
      </div>
      <div class="box__extra-item">
        <i class="uil uil-sunset box__extra-icon"></i>
        <span>Sunset</span>
        <h1>{{ translateTime(store?.weatherData?.current?.sunset) }}</h1>
      </div>
      <div class="box__extra-item">
        <i class="uil uil-wind box__extra-icon"></i>
        <span>Wind</span>
        <h1>
          {{ roundTemperature(store?.weatherData?.current?.wind_speed) }}
          <span class="box__extra-item_span">km/h</span>
        </h1>
      </div>
      <div class="box__extra-item">
        <i class="uil uil-eye box__extra-icon"></i>
        <span>Visibility</span>
        <h1>
          {{ translateVisibility(store?.weatherData?.current?.visibility) }}
          <span class="box__extra-item_span">km</span>
        </h1>
      </div>
      <div class="box__extra-item">
        <i class="uil uil-tear box__extra-icon"></i>
        <span>Humidity</span>
        <h1>{{ store?.weatherData?.current?.humidity }}%</h1>
      </div>
      <div class="box__extra-item">
        <i class="uil uil-dashboard box__extra-icon"></i>
        <span>Pressure</span>
        <h1>
          {{ store?.weatherData?.current?.pressure }}
          <span class="box__extra-item_span">hPa</span>
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup>
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

const translateVisibility = (num) => {
  return num / 250;
};

const getIcon = (icon) => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png `;
};
</script>

<style lang="scss" scoped>
.main {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.box {
  display: flex;
  flex-direction: column;
  margin: left;
  margin-top: var(--mb-1-5);
  margin-left: var(--mb-1-5);
  color: white;
}

// =============== BOX CURRENT WEATHER ======================
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
}

.box__current-icon {
  font-size: var(--h3-font-size);
}

// =============== BOX DAILY WEATHER ======================
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

// =============== BOX EXTRA WEATHER INFO ======================
.box__extra {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  color: white;
  margin: right;
  margin-top: var(--mb-1-5);
  margin-left: var(--mb-1-5);
  margin-right: var(--mb-1-5);
}

.box__extra-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 1rem;
}

.box__extra-icon {
  font-size: var(--big-font-size);
}

.box__extra-item_span {
  font-size: var(--normal-font-size);
}

@media screen and (max-width: 767px) {
  .main {
    display: flex;
    flex-direction: column;
  }
  .box {
    width: 80%;
    margin: auto;
    margin-top: var(--mb-1-5);
  }

  .box__extra {
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
