import { defineStore } from 'pinia';
import useStorage from '@/hooks/useStorage';
import type { ISite_config } from '@/api/siteApi';

const SITE_CONFIG_KEY = 'site-settings';
const { setItem } = useStorage();
// const lvl = getItem<Partial<ISite_config>>(SITE_CONFIG_KEY);

const useSiteSettingsStore = defineStore({
  id: SITE_CONFIG_KEY,
  state: (): ISite_config => ({
    user_id: 1,
    suffix: 'ujuji',
    theme: 'classic',
    icon_url: '//at.alicdn.com/t/font_2331429_8wodx9zja84.css',
    site_name: '优聚集',
    other_background_image: '',
    site_desc: '既行好事，也问前程',
    site_back_animation: 'startDot',
    background_image: 'https://ae01.alicdn.com/kf/Uc3d8f541d57e48c9a270407d96334ef7G.jpg',
    background_color: 'rgba(3, 7, 8, 0.68)',
    pure_background: false,
    background_music: 'https://music.163.com/song/media/outer/url?id=1331962874.mp3',
    box_link_align: 'center',
    site_name_color: '#F7F7F7',
    box_background_color: 'rgba(14, 14, 14, 0.24)',
    box_title_color: '#FFFFFF',
    box_link_color: '#FFFFFF',
    box_link_hover_color: '#E47116',
    box_back_hover_color: 'rgba(0, 0, 0, 0.55)',
    bg_mask_color: 'rgba(0, 0, 0, 0.04)',
    site_notice: '',
  }),
  actions: {
    load(val: Partial<ISite_config>) {
      // this.$state = { ...this.$state, ...val };
      this.$patch({ ...val });
    },
  },
});

//instance
const instance = useSiteSettingsStore();
instance.$subscribe((_, state) => {
  console.log('sub', state);
  setItem(instance.$id, { ...state });
});

//pinia2

export default useSiteSettingsStore;
