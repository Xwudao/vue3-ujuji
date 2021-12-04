<script lang="ts" setup="setup">
  import useWeatherStore from '@/store/hooks/useWeatherStore';
  import { computed } from 'vue';

  const weatherStore = useWeatherStore();
  const info = computed(() => {
    const i = weatherStore.data.data?.weather.content;
    if (!i) return '';
    return `[${i?.city}] ${i?.today.condition} ${i?.today.temp}`;
  });
</script>

<template>
  <div class="headers flex justify-between text-xs">
    <div class="left">
      <span>{{ info }}</span>
    </div>
    <div class="right">
      <ul class="flex space-x-2">
        <li><a href="#">新闻</a></li>
        <li><a href="#">留言</a></li>
        <li><a href="#">最新</a></li>
        <li><a href="#">设置</a></li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
