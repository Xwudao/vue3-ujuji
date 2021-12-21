<script lang="ts" setup="setup">
  import { ref } from 'vue';
  import AppIcon from '@/components/common/AppIcon.vue';
  import { useRouter } from 'vue-router';
  import useUserStore from '@/store/hooks/useUserStore';
  import useMenus from '@/router/menus';

  const fold = ref(false);
  const handleFold = () => {
    fold.value = !fold.value;
  };
  const userStore = useUserStore();
  const router = useRouter();
  const handleLogout = () => {
    //clear
    userStore.logout();
    router.push({ name: 'Login' });
  };
  const handleCommand = (v: string) => {
    switch (v) {
      case 'logout':
        handleLogout();
        break;
    }
  };
  const { menus, activeIndex } = useMenus();
</script>

<template>
  <div class="admin">
    <div class="header">
      <div class="header-left">
        <div class="fold-btn cursor-pointer" @click="handleFold">
          <app-icon v-show="!fold" class="text-2xl" icon="ant-design:menu-fold-outlined" />
          <app-icon v-show="fold" class="text-2xl" icon="ant-design:menu-unfold-outlined" />
        </div>
        <div class="brand">
          <span>优聚集</span>
        </div>
      </div>
      <div class="header-right">
        <div class="avatar">
          <el-dropdown trigger="click" @command="handleCommand">
            <div class="flex items-center el-dropdown-link cursor-pointer">
              <el-avatar
                :size="30"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              ></el-avatar>
              <span class="inline-block ml-1">
                {{ userStore.info?.username || '' }}
              </span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="main-cnt">
      <div class="left-cnt" :class="{ fold }">
        <ul class="menu">
          <li
            v-for="(item, i) in menus"
            :key="i"
            class="menu-item"
            :class="{ active: i === activeIndex }"
          >
            <router-link :to="{ name: item.routeName }">
              <app-icon :icon="item.icon" class="text-lg" />
              <span class="ml-2">
                {{ item.name }}
              </span>
            </router-link>
          </li>
          <!--          <li v-for="i in 20" :key="i + 10" class="menu-item">-->
          <!--            <router-link :to="{ name: 'Dashboard' }">-->
          <!--              <app-icon icon="carbon:cloud-satellite-config" class="text-lg" />-->
          <!--              <span class="ml-2">站点配置</span>-->
          <!--            </router-link>-->
          <!--          </li>-->
        </ul>
      </div>
      <div class="right-cnt">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '../assets/styles/mixin';
  $header-height: 4rem;
  $left-width: 13rem;
  .admin {
    @apply h-full w-full;
  }
  .header {
    @apply flex items-center px-2 border-b border-gray-200 justify-between;
    height: $header-height;

    .header-left {
      @apply flex items-center;
      .fold-btn {
        @apply flex items-center;
      }
      .brand {
        @apply ml-3 rounded bg-gray-100 px-9 py-1 select-none;
        span {
          @apply font-bold text-base text-gray-700;
        }
      }
    }
    .header-right {
    }
  }
  .main-cnt {
    @apply flex;
    height: calc(100% - #{$header-height});

    .left-cnt {
      @apply h-full transition-all border-r border-gray-200;
      width: $left-width;
      &.fold {
        @apply w-0 transition-all;
      }

      .menu {
        @apply py-1 h-full;
        @include scroll();
        .menu-item {
          @apply px-1 pt-0.5 text-lg text-gray-700;
          &.active {
            a {
              @apply text-indigo-400 bg-gray-200;
            }
          }
          a {
            @apply block w-full px-2 py-1 rounded flex items-center space-x-2;
            @apply hover:bg-gray-200 hover:text-indigo-400;
          }
        }
      }
    }
    .right-cnt {
      @apply h-full flex-1 p-1.5;
      //width: calc(100% - #{$left-width});
    }
  }
</style>
