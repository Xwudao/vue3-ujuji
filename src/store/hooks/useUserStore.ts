import { defineStore } from 'pinia';
import useStorage from '@/hooks/useStorage';
import type { ILoginReturn } from '@/api/userApi';

export const USER_KEY = 'user';
const { setItem, getItem } = useStorage();
const useUserStore = defineStore({
  id: USER_KEY,
  state: (): Partial<ILoginReturn> => {
    return {
      info: {
        id: -1,
        access_token: '',
        avatar: '',
        email: '',
        role: '',
        username: '',
        vip_expiration: '',
      },
      token: '',
    };
  },
  actions: {
    load(data: Partial<ILoginReturn>) {
      this.$patch({ ...this.$state, ...data });
    },
    refreshToken(token: string) {
      this.$state.info!.access_token = token;
    },
    changeAvatar(url: string) {
      this.$state.info!.avatar = url;
      // this.$patch({ ...this.$state });
    },
    logout() {
      // this.$patch({});
      setItem(this.$id, '');
    },
  },
});
export const initUserStore = () => {
  const instance = useUserStore();
  instance.$subscribe((mutation, state) => {
    setItem(instance.$id, { ...state });
  });
  const init = getItem<Partial<ILoginReturn>>(instance.$id);
  instance.$patch({ ...init });
};
export default useUserStore;
