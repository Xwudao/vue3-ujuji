import { defineStore } from 'pinia';
import useStorage from '@/hooks/useStorage';
import type { ISite_config } from '@/api/siteApi';

const SITE_CONFIG_KEY = 'site-settings';
const { setItem } = useStorage();
// const lvl = getItem<Partial<ISite_config>>(SITE_CONFIG_KEY);

const useSiteSettings = defineStore({
  id: SITE_CONFIG_KEY,
  state: (): Partial<ISite_config> => ({}),
  actions: {
    load(val: Partial<ISite_config>) {
      // this.$state = { ...this.$state, ...val };
      this.$patch({ ...val });
    },
  },
});

//instance
const instance = useSiteSettings();
instance.$subscribe((_, state) => {
  console.log('sub', state);
  setItem(instance.$id, { ...state });
});

//pinia2

export default useSiteSettings;
