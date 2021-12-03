import { defineStore } from 'pinia';
import type { ISearch_config } from '@/api/siteApi';

//ts 支持并不是非常完美（在模版.vue中），其余地方，我觉得可以写得非常爽
const useSearchConfigStore = defineStore({
  id: 'search-config',
  state: (): { data: ISearch_config[] } => {
    return { data: [] };
  },
  actions: {
    load(val: ISearch_config[]) {
      this.$patch({
        data: val,
      });
    },
  },
});

//react 好用多了
export default useSearchConfigStore;
