<script lang="ts" setup="setup">
  import { relativeTime } from '@/utils/date';
  import type { IMsgData } from '@/api/leaveMsgApi';
  const props = defineProps<{
    item: IMsgData;
  }>();
</script>

<template>
  <div class="user text-base flex items-center">
    <el-tag :type="props.item.fixed ? 'danger' : 'success'" effect="dark" size="mini">
      {{ props.item.fixed ? '置頂' : '留言' }}
    </el-tag>
    <span class="text-blue-700 ml-1.5 font-bold text-sm">{{ props.item.nickname }}</span>
  </div>
  <p class="cnt text-xs mt-3">
    <span>{{ props.item.content }}</span>
  </p>
  <div v-if="props.item.reply" class="replay text-xs mt-3">
    <div class="font-bold text-red-600 text-sm mb-1">回復：</div>
    <p class="reply-cnt">
      <span>{{ props.item.reply }}</span>
    </p>
  </div>
  <div class="time text-right text-xs text-gray-600 mt-3">
    <span>{{ relativeTime(props.item.created_at) }}</span>
  </div>
</template>

<style lang="scss" scoped>
  .cnt,
  .reply-cnt {
    //@apply inline-block text-gray-500 text-xs break-all pb-1 whitespace-pre-line;
    span {
      @apply inline text-gray-500 text-xs break-all border-b border-dashed
      border-gray-400 pb-0.5 whitespace-pre-line leading-6;
    }
  }
</style>
