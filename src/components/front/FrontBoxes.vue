<script lang="ts" setup="setup">
  import type { IBoxesData } from '@/api/siteApi';
  import { ref, watch } from 'vue';

  const props = defineProps<{
    boxes: IBoxesData[];
  }>();
  const notices = ref<{ [boxID: number]: string }>({});
  watch(
    () => props.boxes,
    () => {
      props.boxes.forEach((item) => {
        notices.value[item.id] = item.introduction;
      });
    }
  );
  const handleEnter = (boxID: number, linkID: number) => {
    const box = props.boxes.find((item) => item.id === boxID);
    if (box) {
      const link = box.links.find((item) => item.id === linkID);
      if (link) {
        notices.value[boxID] = link.description;
      }
    }
  };
</script>

<template>
  <div class="boxes">
    <div v-for="(item, i) in props.boxes" :key="i" class="box">
      <div class="box-title text-center font-bold text-lg mb-1">{{ item.title }}</div>
      <div class="box-desc">{{ notices[item.id] }}</div>
      <div class="box-items">
        <a
          v-for="(link, m) in item.links"
          :key="m"
          class="box-link"
          :href="link.link"
          target="_blank"
          @mouseenter="handleEnter(item.id, link.id)"
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
      @apply text-xs text-center truncate w-full;
      color: var(--box-title-color);
    }
    .box-items {
      @apply flex flex-wrap items-center h-32 overflow-y-auto mt-2 text-sm text-center;
      @include hide-scroll;
    }
    .box-link {
      @apply w-1/3 my-3;
      &:hover {
        color: var(--box-link-hover-color);
      }
    }
  }
</style>
