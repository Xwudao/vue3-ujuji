<script lang="ts" setup="setup">
  import AppIcon from '@/components/common/AppIcon.vue';
  import useUserStore from '@/store/hooks/useUserStore';
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  const userStore = useUserStore();
  const isLogin = computed(() => {
    return (userStore.info?.id || 0) > 0;
  });
  const router = useRouter();
  const handleCommand = (v: string) => {
    switch (v) {
      case 'dashboard':
        if (isLogin.value) {
          router.push({ name: 'Admin' });
        } else {
          router.push({ name: 'Login' });
        }
        break;
    }
  };
</script>

<template>
  <el-dropdown trigger="click" size="mini" @command="handleCommand">
    <a href="#" class="flex items-center space-x-0.5 title">
      <app-icon class="text-lg" icon="ant-design:setting-outlined" />
      <span>设置</span>
    </a>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="dashboard">
          <span class="inline-flex items-center space-x-1">
            <app-icon icon="bx:bx-user-circle" class="text-sm" />
            <span>
              {{ isLogin ? '进入后台' : '登录注册' }}
            </span>
          </span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
  .title {
    color: var(--site-name-color);
  }
</style>
