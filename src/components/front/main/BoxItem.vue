<script lang="ts" setup="setup">
  import { computed, ref } from 'vue';
  import type { IBoxesData, ILink } from '@/api/siteApi';
  import AppIcon from '@/components/common/AppIcon.vue';
  const props = defineProps<{
    box: IBoxesData;
  }>();
  const emits = defineEmits(['expand']);
  const desc = ref('');
  const orderByTime = ref(false);
  const computedLink = computed(() => {
    const links = JSON.parse(JSON.stringify(props.box.links)) as ILink[];
    if (!orderByTime.value) return links || [];
    return links.sort((item1, item2) => {
      return new Date(item2.created_at).getTime() - new Date(item1.created_at).getTime();
    });
  });
  const handleEnter = (item: ILink) => {
    if (item.description) {
      desc.value = item.description;
    }
  };
  const handleBoxEnter = () => {
    desc.value = props.box.introduction || '';
  };
</script>

<template>
  <div class="box" @mouseenter="handleBoxEnter">
    <div class="box-title">
      <i v-if="props.box.icon" class="iconfont mr-2" :class="[props.box.icon]"></i>
      <span>{{ props.box.title }}</span>
      <div class="ctrls inline-flex space-x-1 absolute top-0 right-1 text-sm">
        <div class="cursor-pointer" @click="orderByTime = !orderByTime">
          <app-icon class="icon" icon="clarity:date-line" />
        </div>
        <div class="cursor-pointer" @click="emits('expand', props.box)">
          <app-icon icon="bx:bx-expand" />
        </div>
      </div>
    </div>
    <div class="box-desc">{{ desc }}</div>
    <div class="box-items">
      <a
        v-for="(link, m) in computedLink"
        :key="m"
        class="box-link"
        :href="link.link"
        target="_blank"
        @mouseenter.stop="handleEnter(link)"
      >
        <i v-if="link.icon" class="iconfont mr-1" :class="[link.icon]"></i>
        <span>{{ link.title }}</span>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '../../../assets/styles/mixin';
  .box-title {
    color: var(--box-title-color);
    @apply relative text-center font-bold text-lg mb-1;

    &:hover {
      .ctrls {
        @apply inline-flex transition-all;
      }
    }

    .ctrls {
      @apply hidden transition-all;
      color: var(--box-title-color);
    }
    .icon {
      color: var(--box-title-color);
    }
  }
  .box-link {
    color: var(--box-link-color);
  }
  .box {
    @apply bg-gray-600 bg-opacity-40 rounded-2xl p-3 m-1 transition-all;
    background: var(--box-background-color);
    &:hover {
      background: var(--box-back-hover-color);
    }
  }
  .box-desc {
    @apply text-xs text-center truncate w-full h-3.5 mb-0.5;
    color: var(--box-title-color);
  }
  .box-items {
    @apply flex flex-wrap items-center h-32 overflow-y-auto text-sm text-center;
    @include hide-scroll;
  }
  .box-link {
    @apply w-1/3 my-3;
    &:hover {
      color: var(--box-link-hover-color);
    }
  }
</style>
