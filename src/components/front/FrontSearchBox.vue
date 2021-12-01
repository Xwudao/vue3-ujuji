<script lang="ts" setup="setup">
  import AppIcon from '@/components/common/AppIcon.vue';
</script>

<template>
  <!--    search-->
  <div class="search-wrapper text-center mt-5">
    <div class="search-site-cate flex justify-center space-x-3">
      <a href="#" class="search-item">搜索</a>
      <a href="#" class="search-item">网盘</a>
    </div>
    <div class="search-sites flex justify-center space-x-3">
      <a href="#" class="search-site-item">百度</a>
      <a href="#" class="search-site-item">谷歌</a>
      <a href="#" class="search-site-item">必应</a>
    </div>
    <div class="search-box relative mt-5 text-center w-full sm:w-96 mx-auto">
      <input class="search-input" placeholder="输入关键词搜索~" />
      <button class="absolute top-2.5 right-2">
        <app-icon class="text-xl text-gray-400" icon="bx:bx-search-alt" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .search-wrapper {
    color: var(--site-name-color);
  }

  .search-input {
    @apply outline-none w-full pl-4 pr-6 py-1.5 text-base bg-gray-400 bg-opacity-40 rounded-xl
    focus:bg-opacity-60 text-black;
  }
</style>
