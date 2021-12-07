<script lang="ts" setup>
  import { ref } from 'vue';
  import AppIcon from '@/components/common/AppIcon.vue';
  import useNews from '@/hooks/api/useNews';

  const visible = ref(false);
  const { refresh, news } = useNews();

  const handleOpen = () => {
    refresh();
  };
</script>
<template>
  <a href="#" class="flex items-center space-x-0.5" @click="visible = true">
    <app-icon class="text-lg" icon="bx:bx-news" />
    <span>新闻</span>
  </a>
  <el-dialog
    v-model:model-value="visible"
    width="400px"
    title="每天60秒读世界"
    :modal="false"
    @open="handleOpen"
  >
    <ul>
      <li v-for="(item, i) in news" :key="i" class="py-1 border-b border-gray-300 border-dashed">
        {{ item }}
        <span v-if="i < news.length - 1">
          <a
            class="text-blue-400"
            target="_blank"
            :href="`https://www.baidu.com/s?ie=UTF-8&wd=${encodeURIComponent(item)}`"
          >
            百度详情
          </a>
        </span>
      </li>
    </ul>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
