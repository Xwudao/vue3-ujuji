import type { AppRouteRaw } from '@/router/types';

const routes: AppRouteRaw[] = [
  {
    path: '/admin',
    name: 'Admin',
    index: 1,
    component: () => import('@/pages/Admin.vue'),
  },
];

export default routes;
