import useSiteConfig, { useSiteBoxes } from '@/hooks/api/useSiteConfig';
import { ref, watch } from 'vue';
import useSiteSettings from '@/store/hooks/useSiteSettings';

//hooks
const useSiteData = () => {
  const { siteConfig, loading: loadingSiteConfig } = useSiteConfig();
  const userID = ref(-1);

  const siteSettings = useSiteSettings();
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
