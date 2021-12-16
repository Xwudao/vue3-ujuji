import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
import { ElMessage } from 'element-plus';
import { USER_KEY } from '@/store/hooks/useUserStore';
import type { ILoginReturn } from '@/api/userApi';
import useStorage from '@/hooks/useStorage';

const modules = import.meta.globEager('./modules/*.ts');
const allRoutes: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  console.log(modList);
  allRoutes.push(...modList);
});
//sort
allRoutes.sort((item1, item2) => {
  let i1 = (item1.meta?.index || 0) as number;
  let i2 = (item2.meta?.index || 0) as number;
  return i2 - i1;
});
console.log(allRoutes);
const router = createRouter({
  history: createWebHashHistory(),
  routes: allRoutes,
});

// hooks
const { getItem } = useStorage();
router.beforeEach((to, from, next) => {
  const data = getItem<ILoginReturn>(USER_KEY);
  if (to.meta?.auth && !data?.info?.access_token) {
    ElMessage.info('请先登录');
    router.push({ name: 'Login' }).then();
    return;
  }
  next();
});
router.afterEach(() => {});
export default router;
