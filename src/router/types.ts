import type { RouteMeta, RouteRecordRaw } from 'vue-router';
type AppRouteRaw = RouteRecordRaw & { index: number; auth?: boolean };
interface MetaInfo extends RouteMeta {
  auth?: boolean;
  title: string;
  // navbarName: string;
}

export { MetaInfo, AppRouteRaw };
