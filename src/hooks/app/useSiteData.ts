import useSiteConfig, { useSiteBoxes } from '@/hooks/api/useSiteConfig';
import { ref, watch } from 'vue';
import useSiteSettingsStore from '@/store/hooks/useSiteSettingsStore';
import useSearchConfigStore from '@/store/hooks/useSearchConfigStore';

//hooks
const useSiteData = () => {
  const { siteConfig, loading: loadingSiteConfig, searchConfig } = useSiteConfig();
  const userID = ref(-1);

  const siteSettings = useSiteSettingsStore();
  const searchConfigStore = useSearchConfigStore();
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

  return {
    siteConfig,
    boxes,
    loadingSiteConfig,
    loadingBoxes,
  };
};

export default useSiteData;
