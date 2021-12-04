<script lang="ts" setup="setup">
  import { ElIcon } from 'element-plus';
  import { Loading } from '@element-plus/icons';
</script>

<template>
  <div class="loading flex items-center justify-center text-center my-3 text-lg bg-transparent">
    <el-icon :size="24"><loading class="loading-icon" /></el-icon>
    <span class="ml-2"><slot /></span>
  </div>
</template>

<style lang="scss" scoped>
  .loading-icon {
    //transition: loading 3s linear;
    animation: loading 2s linear infinite;
  }
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .loading {
    color: var(--site-name-color);
  }
</style>
