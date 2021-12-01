<script lang="ts" setup="setup">
  import type { IBoxesData } from '@/api/siteApi';

  const props = defineProps<{
    boxes: IBoxesData[];
  }>();
</script>

<template>
  <div class="boxes">
    <div v-for="(item, i) in props.boxes" :key="i" class="box">
      <div class="box-title text-center font-bold text-lg mb-1">{{ item.title }}</div>
      <div class="box-desc">{{ item.introduction }}</div>
      <div class="box-items">
        <a
          v-for="(link, m) in item.links"
          :key="m"
          class="box-link"
          :href="link.link"
          target="_blank"
        >
          {{ link.title }}
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '../../assets/styles/mixin';
  .box-title {
    color: var(--box-title-color);
  }
  .box-link {
    color: var(--box-link-color);
  }
  .boxes {
    @apply mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4;

    .box {
      @apply bg-gray-600 bg-opacity-40 rounded-2xl p-3 m-1 transition-all;
      background: var(--box-background-color);
      &:hover {
        background: var(--box-back-hover-color);
      }
    }
    .box-desc {
      @apply text-xs text-center;
      color: var(--box-title-color);
    }
    .box-items {
      @apply flex flex-wrap items-center h-32 overflow-y-auto mt-2 space-y-4 text-sm text-center;
      @include hide-scroll;
    }
    .box-link {
      @apply w-1/3;
      &:hover {
        color: var(--box-link-hover-color);
      }
    }
  }
</style>
