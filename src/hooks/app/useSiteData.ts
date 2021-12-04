import useSiteConfig, { useSiteBoxes } from '@/hooks/api/useSiteConfig';
import { ref, watch } from 'vue';
import useSiteSettingsStore from '@/store/hooks/useSiteSettingsStore';
import useSearchConfigStore from '@/store/hooks/useSearchConfigStore';
import useWeather from '@/hooks/api/useWeather';
import useWeatherStore from '@/store/hooks/useWeatherStore';

//hooks
const useSiteData = () => {
  const { siteConfig, loading: loadingSiteConfig, searchConfig } = useSiteConfig();
  const userID = ref(-1);

  const siteSettings = useSiteSettingsStore();
  const searchConfigStore = useSearchConfigStore();
  const weatherStore = useWeatherStore();
  watch(
    () => {
      return siteConfig.value.user_id;
    },
    (id) => {
      if (!id || id <= 0) return;
      userID.value = id!;
      let str = JSON.parse(JSON.stringify(siteConfig.value));
      console.log('srt', str);
      siteSettings.load(siteConfig.value);
      searchConfigStore.load(searchConfig.value);
    }
  );
  const { boxes, loading: loadingBoxes } = useSiteBoxes(userID);
  const { weather } = useWeather();
  watch(weather, () => {
    weatherStore.$patch({ data: weather.value });
  });

  return {
    siteConfig,
    boxes,
    loadingSiteConfig,
    loadingBoxes,
  };
};

export default useSiteData;
