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

// hooks
router.beforeEach((to, from, next) => {
  next();
});
router.afterEach(() => {});
export default router;
