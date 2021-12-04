import { defineStore } from 'pinia';
import type { IWeatherData } from '@/api/common';

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
});

export default useWeatherStore;
