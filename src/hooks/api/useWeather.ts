import useWeatherStore from '@/store/hooks/useWeatherStore';
import { ref, watch } from 'vue';
import type { IWeatherData } from '@/api/commonApi';
import { reqWeather } from '@/api/commonApi';

const useWeather = () => {
  const weatherStore = useWeatherStore();
  const rawData = ref('');
  const weather = ref<IWeatherData | undefined>();
  watch(
    () => weatherStore.city,
    (city) => {
      if (!city) return;
      reqWeather(city).then(({ data }) => {
        rawData.value = data;
        try {
          weather.value = JSON.parse(data);
        } catch (e) {}
      });
    },
    { immediate: true }
  );
  return {
    weather,
    rawData,
  };
};

export default useWeather;
