import { defineStore } from "pinia";
import axios from "axios";
export const useStore = defineStore("store", {
  state: () => ({
    selectedRegion: null,
    is_active: false,
    weatherData: null,
  }),
  actions: {
    async getData(lat = 41.311081, lon = 69.240562) {
      const apiUrl = `https://api.openweathermap.org/data/2.8/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=9dd86907fe501cec50da3d087e4e9dc0&units=metric&lang=ru`;
      try {
        const response = await axios.get(apiUrl);
        this.weatherData = response.data;
        console.log(this.weatherData);
      } catch (error) {
        console.error(error);
      }
    },

    setSelectedRegion(region) {
      this.selectedRegion = region;
    },
  },
});
