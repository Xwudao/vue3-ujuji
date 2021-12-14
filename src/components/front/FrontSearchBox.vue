<script lang="ts" setup="setup">
  import AppIcon from '@/components/common/AppIcon.vue';
  import useSearchConfigStore from '@/store/hooks/useSearchConfigStore';
  import { computed, ref } from 'vue';
  import { jumpUrl } from '@/utils/url';
  import type { ILink } from '@/api/siteApi';

  const searchConfig = useSearchConfigStore();
  const index = ref(0);
  const links = computed(() => {
    let links = searchConfig.data[index.value];
    if (links) {
      return links;
    }
    return searchConfig.data[0];
  });

  const linkIndex = ref(0);
  const activeLink = computed(() => {
    if (!links.value) return {} as ILink;
    return links.value.links[linkIndex.value];
  });
  //search
  let q = ref('');
  const handleSearch = () => {
    if (!q.value) return;
    let aimUrl = activeLink.value!.link?.replaceAll('[kw]', encodeURIComponent(q.value));
    jumpUrl(aimUrl);
  };
</script>

<template>
  <!--    search-->
  <div class="search-wrapper text-center mt-5">
    <div class="search-site-cate">
      <a
        v-for="(item, i) in searchConfig.data"
        :key="i"
        href="#"
        class="search-item"
        :class="{ active: index === i }"
        @click="index = i"
      >
        <span>{{ item.name }}</span>
        <span class="triangle"></span>
      </a>
    </div>
    <div v-if="links" class="search-sites">
      <a
        v-for="(item, i) in links.links"
        :key="i"
        href="#"
        class="search-site-item"
        :class="{ active: linkIndex === i }"
        @click="linkIndex = i"
      >
        {{ item.name }}
      </a>
    </div>
    <div class="search-box relative mt-5 text-center w-full sm:w-128 mx-auto">
      <input
        v-model="q"
        class="search-input"
        :placeholder="activeLink.placeholder"
        @keyup.enter="handleSearch"
      />
      <button class="search-btn" @click="handleSearch">
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
    @apply outline-none w-full pl-4 pr-6 py-2 text-sm rounded-xl text-black;
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

    :deep(span, svg) {
      @apply text-gray-400;
    }
  }

  .search-site-cate {
    @apply flex justify-center space-x-3 text-sm;
  }
  .search-site-item {
    &.active {
      @apply font-bold;
    }
  }
  .search-item {
    @apply flex flex-col;
    &.active {
      .triangle {
        @apply block;
      }
    }
  }
  .triangle {
    @apply text-center hidden mx-auto mt-0.5 w-0 h-0.5 z-10;
    border-right: 0.3rem solid transparent;
    border-left: 0.3rem solid transparent;
    border-top: 0.3rem solid var(--site-name-color);
  }

  .search-sites {
    @apply flex justify-center space-x-3 mt-3 text-sm;
  }
</style>
