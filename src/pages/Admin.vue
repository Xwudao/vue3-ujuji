<script lang="ts" setup="setup">
  import { ref } from 'vue';
  import AppIcon from '@/components/common/AppIcon.vue';
  import { useRouter } from 'vue-router';
  import useUserStore from '@/store/hooks/useUserStore';

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
      <div class="left-cnt" :class="{ fold }"></div>
      <div class="right-cnt">
        <!--        <router-view />-->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  $header-height: 4rem;
  $left-width: 13rem;
  .admin {
    @apply h-full w-full;
  }
  .header {
    @apply flex items-center px-2 border-b border-gray-100 shadow-md justify-between;
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
      @apply bg-green-200 h-full transition-all;
      width: $left-width;
      &.fold {
        @apply w-0 transition-all;
      }
    }
    .right-cnt {
      @apply bg-indigo-200 h-full flex-1;
      //width: calc(100% - #{$left-width});
    }
  }
</style>
