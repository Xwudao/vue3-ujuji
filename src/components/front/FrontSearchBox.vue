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
      <button class="search-btn">
        <app-icon class="text-xl" icon="bx:bx-search-alt" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .search-wrapper {
    color: var(--site-name-color);
  }

  .search-input {
    @apply outline-none w-full pl-4 pr-6 py-1.5 text-base rounded-xl text-black;
    background: var(--box-background-color);
    color: var(--box-title-color);
    &:hover {
      background: var(--box-back-hover-color);
    }
    &:focus ~ .search-btn {
      :deep(span, svg) {
        color: var(--box-title-color);
      }
    }
  }
  .search-btn {
    @apply absolute top-2.5 right-2;
    color: var(--box-background-color);

    :deep(span, svg) {
      color: var(--box-background-color);
    }
  }
</style>
