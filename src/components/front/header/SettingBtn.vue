<script lang="ts" setup="setup">
  import AppIcon from '@/components/common/AppIcon.vue';
</script>

<template>
  <el-dropdown trigger="click" size="mini">
    <a href="#" class="flex items-center space-x-0.5 title">
      <app-icon class="text-lg" icon="ant-design:setting-outlined" />
      <span>设置</span>
    </a>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <span class="inline-flex items-center space-x-1">
            <app-icon icon="bx:bx-user-circle" class="text-sm" />
            <span>进入后台</span>
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
