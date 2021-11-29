<script lang="ts" setup="setup">
  const props = defineProps<{
    icon: string;
    class?: string | string[];
  }>();
</script>

<template>
  <span class="inline-flex space-x-1 text-sm items-center" :class="props.class">
    <span class="iconify" :data-icon="props.icon"></span>
  </span>
</template>

<style lang="scss" scoped>
  .iconify {
    color: #303133;
  }
</style>
