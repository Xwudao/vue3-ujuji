import type { IBoxesData, ISite_config } from '@/api/siteApi';
import { reqSiteBoxes, reqSiteConfig } from '@/api/siteApi';
import type { Ref } from 'vue';
import { ref, watch } from 'vue';
import { OK_CODE } from '@/app/keys';
import useSiteSettings from '@/store/hooks/useSiteSettings';

const useSiteConfig = () => {
  const loading = ref(true);
  const siteConfig = ref<Partial<ISite_config>>({});
  const siteSettings = useSiteSettings();
  reqSiteConfig()
    .then(({ data, code }) => {
      if (code === OK_CODE) {
        siteConfig.value = data.site_config;
        siteSettings.load(data.site_config);
      }
    })
    .finally(() => (loading.value = false));

  return {
    siteConfig,
    loading,
  };
};
export const useSiteBoxes = (userID: Ref<number | undefined>) => {
  console.log(userID);
  const boxes = ref<IBoxesData[]>([]);
  watch(userID, async () => {
    console.log('userID', userID.value);
    await refresh();
  });
  const refresh = async () => {
    if (!userID.value || userID.value <= 0) return;
    let { code, data } = await reqSiteBoxes(userID.value);
    if (code === OK_CODE) {
      boxes.value = data;
    }
  };
  return {
    refresh,
    boxes,
  };
};

export default useSiteConfig;
