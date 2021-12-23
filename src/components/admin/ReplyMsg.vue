<script lang="ts" setup="setup">
  import type { IMsgInfo } from '@/api/leaveMsgApi';
  import { watch, computed, ref } from 'vue';
  import { reqMsgReply } from '@/api/leaveMsgApi';
  import { OK_CODE } from '@/app/keys';
  import { ElMessage } from 'element-plus';

  const props = defineProps<{
    msg: IMsgInfo;
    visible: boolean;
  }>();
  const emits = defineEmits(['close']);
  const val = ref('');
  watch(
    () => props.msg,
    () => {
      val.value = props.msg.reply;
    }
  );
  const title = computed(() => {
    return `回复[${props.msg.nickname}]的消息`;
  });

  const handleReply = () => {
    if (val.value) {
      reqMsgReply(props.msg.id, val.value).then(({ code, msg }) => {
        if (code === OK_CODE) {
          ElMessage.success(msg);
          emits('close');
          return;
        }
        ElMessage.error(msg);
      });
    }
  };
</script>

<template>
  <el-dialog :width="340" :model-value="props.visible" :title="title" @close="emits('close')">
    <div class="space-y-4">
      <el-input
        v-model:model-value="val"
        type="textarea"
        placeholder="输入回复内容"
        :autosize="{ minRows: 4 }"
        @keydown.enter.ctrl="handleReply"
      ></el-input>
      <el-button class="w-full mt-2" type="primary" @click="handleReply">回复</el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
