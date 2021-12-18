import { defineStore } from 'pinia';
import type { IWeatherData } from '@/api/commonApi';
import useStorage from '@/hooks/useStorage';

interface WeatherStoreType {
  city: string;
  data: Partial<IWeatherData>;
}
const useWeatherStore = defineStore({
  id: 'weather',
  state: (): WeatherStoreType => {
    return {
      city: '成都',
      data: {},
    };
  },
  actions: {
    changeCity(city: string) {
      this.$state.city = city;
    },
  },
  getters: {
    detailWeather(): string {
      let today = this.data.data?.weather.content.today;
      if (!today) return '';
      return `${today.time} ${today.wind}`;
    },
  },
});

const instance = useWeatherStore();
const { setItem, getItem } = useStorage();
instance.$subscribe((mutation, state) => {
  setItem(instance.$id, { ...state });
});
const init = getItem<Partial<WeatherStoreType>>(instance.$id);
instance.$patch({ city: init?.city || '成都', data: init?.data });

export default useWeatherStore;
