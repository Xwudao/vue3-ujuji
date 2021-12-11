<script lang="ts" setup="setup">
  import { computed, ref } from 'vue';
  import useWidth from '@/hooks/useWidth';
  import type { IBoxesData, ILink } from '@/api/siteApi';
  const { strWidth } = useWidth(500);
  const props = defineProps<{
    visible: boolean;
    box: IBoxesData;
  }>();
  const title = computed(() => {
    return `展开<${props.box?.title}>盒子`;
  });
  const emits = defineEmits(['close']);
  const desc = ref('');
  const handleChange = (item: ILink) => {
    desc.value = item.description || '暂无描述';
  };
</script>

<template>
  <el-dialog
    :model-value="props.visible || false"
    :width="strWidth"
    center
    :title="title"
    @close="emits('close')"
  >
    <div class="mb-1.5 text-center text-sm font-mono w-full truncate">{{ desc }}</div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
      <div
        v-for="(item, i) in props.box.links"
        :key="i"
        class="item flex items-center w-full rounded border border-gray-300"
        @mouseenter="handleChange(item)"
      >
        <a
          :href="item.link"
          target="_blank"
          class="text-gray-600 inline-block w-full text-sm px-2 py-1 truncate"
        >
          {{ item.title }}
        </a>
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
  .item {
    &:hover {
      @apply border-gray-400;
      a {
        @apply text-gray-700;
      }
    }
  }
</style>
