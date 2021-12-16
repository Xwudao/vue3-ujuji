import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Front',
    meta: {
      index: 1,
    },
    component: () => import('@/pages/Front.vue'),
  },
  {
    path: '/:catchAll(.*)',
    meta: {
      index: -1,
    },
    component: () => import('@/pages/NotFound.vue'),
  },
];

export default routes;
