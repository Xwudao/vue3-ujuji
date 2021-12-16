import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/register',
    name: 'Register',
    meta: { auth: false },
    component: () => import('@/pages/Register.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: { auth: false },
    component: () => import('@/pages/Login.vue'),
  },
];
export default routes;
