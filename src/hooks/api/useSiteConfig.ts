import type { ISite_config } from '@/api/siteApi';
import { reqSiteConfig } from '@/api/siteApi';
import { ref } from 'vue';
import { OK_CODE } from '@/app/keys';
import useSiteSettings from '@/store/hooks/useSiteSettings';

const useSiteConfig = () => {
  const loading = ref(true);
  const siteConfig = ref<ISite_config>();
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

export default useSiteConfig;
