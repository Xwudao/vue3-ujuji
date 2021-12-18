import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/find_pass',
    name: 'FindPass',
    meta: { auth: false },
    component: () => import('@/pages/FindPass.vue'),
  },
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
