import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export interface AdminMenus {
  name: string;
  routeName: string;
  icon: string;
}
const menus: AdminMenus[] = [
  {
    name: '控制首页',
    routeName: 'Dashboard',
    icon: 'clarity:dashboard-line',
  },
  {
    name: '站点配置',
    routeName: 'SiteConfig',
    icon: 'carbon:cloud-satellite-config',
  },
  {
    name: '个人中心',
    routeName: 'Profile',
    icon: 'carbon:user-favorite',
  },
  {
    name: '留言管理',
    routeName: 'MsgList',
    icon: 'ant-design:message-outlined',
  },
  {
    name: '更新日志',
    routeName: 'UpdateNote',
    icon: 'fluent:note-24-regular',
  },
];

const useMenus = () => {
  const route = useRoute();
  const activeIndex = ref(0);
  watch(
    () => route.name,
    (name) => {
      const r = menus.find((item) => item.routeName === name);
      if (r) {
        activeIndex.value = menus.indexOf(r);
      }
    },
    { immediate: true }
  );
  // const activeIndex = computed(() => {
  //   console.log(route.name);
  //   return 0;
  // });
  return {
    menus,
    activeIndex,
  };
};
export default useMenus;
