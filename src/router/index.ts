import { createRouter, createWebHashHistory } from 'vue-router';
import type { AppRouteRaw } from '@/router/types';

const modules = import.meta.globEager('./modules/*.ts');
const allRoutes: AppRouteRaw[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  allRoutes.push(...modList);
});
//sort
allRoutes.sort((item1, item2) => {
  return item2.index - item1.index;
});
console.log(allRoutes);
const router = createRouter({
  history: createWebHashHistory(),
  routes: allRoutes,
});
/*
 *  vuex(pinia2)，router vue-router
 *  react react-router (V6)
 * */
// hooks
// const userStore = useUserStore();
// const { getItem } = useStorage();
router.beforeEach((to, from, next) => {
  // const data = getItem<ILoginReturn>(USER_KEY);
  // console.log(to);
  // console.log(data);
  // console.log(!data?.info?.access_token);
  // if (to?.auth && !data?.info?.access_token) {
  //   ElMessage.info('请先登录');
  //   router.push({ name: 'Login' }).then();
  //   return;
  // }
  next();
});
router.afterEach(() => {});
export default router;
