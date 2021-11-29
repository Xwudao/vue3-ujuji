import type { AppRouteRaw } from '@/router/types';

const routes: AppRouteRaw[] = [
  {
    path: '/',
    name: 'Front',
    index: 1,
    component: () => import('@/pages/Front.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    index: 1,
    component: () => import('@/pages/Admin.vue'),
  },
  {
    path: '/:catchAll(.*)',
    index: -1,
    component: () => import('@/pages/NotFound.vue'),
  },
];

export default routes;
