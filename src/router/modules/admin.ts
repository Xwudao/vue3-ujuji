import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/admin',
    name: 'Admin',
    meta: { auth: true, index: 1 },
    component: () => import('@/pages/Admin.vue'),
  },
];

export default routes;
