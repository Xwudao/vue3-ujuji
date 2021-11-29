import { defineStore } from 'pinia';
import useStorage from '@/hooks/useStorage';
import type { ISite_config } from '@/api/siteApi';

const useSiteSettings = defineStore({
  id: 'site-settings',
  state: (): Partial<ISite_config> => ({}),
  actions: {
    load(val: Partial<ISite_config>) {
      this.$patch({
        ...this.$state,
        ...val,
      });
    },
  },
});

//instance
const instance = useSiteSettings();
const { setItem } = useStorage();
instance.$subscribe((_, state) => {
  setItem(instance.$id, { ...state });
});

//pinia2
// const lvl = getItem<Partial<ISite_config>>(instance.$id);
// if (lvl) {
//   instance.$patch({ ...lvl });
// }

export default useSiteSettings;
