<script lang="ts" setup="setup">
  import { computed } from 'vue';
  import useWidth from '@/hooks/useWidth';
  import type { IBoxesData } from '@/api/siteApi';
  const { strWidth } = useWidth(500);
  const props = defineProps<{
    visible: boolean;
    box: IBoxesData;
  }>();
  const title = computed(() => {
    return `展开<${props.box?.title}>盒子`;
  });
  const emits = defineEmits(['close']);
</script>

<template>
  <el-dialog
    :model-value="props.visible || false"
    :width="strWidth"
    center
    :title="title"
    @close="emits('close')"
  ></el-dialog>
</template>

<style lang="scss" scoped></style>
