import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/admin',
    name: 'Admin',
    meta: { auth: true, index: 1 },
    component: () => import('@/pages/Admin.vue'),
    redirect: { name: 'Dashboard' },
    children: [
      {
        path: 'msgList',
        name: 'MsgList',
        meta: { auth: true, index: 1 },
        component: () => import('@/pages/admin/MsgList.vue'),
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        meta: { auth: true, index: 1 },
        component: () => import('@/pages/admin/Dashboard.vue'),
      },
      {
        path: 'siteConfig',
        name: 'SiteConfig',
        meta: { auth: true, index: 1 },
        component: () => import('@/pages/admin/SiteConfig.vue'),
      },
    ],
  },
];

export default routes;
