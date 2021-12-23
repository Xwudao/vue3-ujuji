<script lang="ts" setup="setup">
  import type { IMsgInfo } from '@/api/leaveMsgApi';
  import { reqMsgRead } from '@/api/leaveMsgApi';

  const props = defineProps<{
    msg: IMsgInfo;
    visible: boolean;
  }>();
  const emits = defineEmits(['close']);
  const handleOpen = () => {
    if (props.msg.read) return;
    reqMsgRead(props.msg.id);
  };
</script>

<template>
  <el-dialog
    :width="340"
    :model-value="props.visible"
    title="阅读留言"
    @open="handleOpen"
    @close="emits('close')"
  >
    <div class="">
      <span class="whitespace-pre-wrap">
        {{ props.msg.content || '' }}
      </span>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
