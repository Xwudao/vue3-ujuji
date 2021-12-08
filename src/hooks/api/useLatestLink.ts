import type { ILatestLink } from '@/api/commonApi';
import { reqLatestLinks } from '@/api/commonApi';
import { computed, ref } from 'vue';
import useSiteSettingsStore from '@/store/hooks/useSiteSettingsStore';
import { OK_CODE } from '@/app/keys';

const useLatestLink = () => {
  const settingsStore = useSiteSettingsStore();
  const userID = computed(() => {
    return settingsStore.user_id;
  });
  const links = ref([] as ILatestLink[]);
  const loading = ref(false);
  const refresh = () => {
    loading.value = true;
    reqLatestLinks(userID.value)
      .then(({ data, code }) => {
        if (code === OK_CODE) {
          links.value = data;
        }
      })
      .finally(() => (loading.value = false));
  };
  return {
    refresh,
    links,
    loading,
  };
};

export default useLatestLink;
