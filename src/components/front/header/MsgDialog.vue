<script lang="ts" setup="setup">
  import { Edit } from '@element-plus/icons';
  import { reactive, ref, toRef } from 'vue';
  import useVerify from '@/hooks/api/useVerify';
  import useLeaveMsg from '@/hooks/api/useLeaveMsg';
  import useSiteSettingsStore from '@/store/hooks/useSiteSettingsStore';
  import { storeToRefs } from 'pinia';
  import type { IReqMsgParam } from '@/api/leaveMsgApi';
  import { MsgType, reqAddMsg } from '@/api/leaveMsgApi';
  import MsgItem from '@/components/front/header/MsgItem.vue';
  import { watch } from 'vue';
  import { ElMessage } from 'element-plus';
  import { OK_CODE } from '@/app/keys';

  const visible = ref(false);
  const { imageID, refresh, image } = useVerify();
  const msgParam = reactive({ page: 1, size: 10 });
  const settingsStore = useSiteSettingsStore();
  const refSettingsStore = storeToRefs(settingsStore);
  const { message: fixedMsg, refresh: refreshFix } = useLeaveMsg(
    ref(0),
    ref(0),
    refSettingsStore.user_id,
    MsgType.FIXED,
    false
  );
  const {
    total,
    message: commonMsg,
    refresh: refreshCommon,
  } = useLeaveMsg(
    toRef(msgParam, 'size'),
    toRef(msgParam, 'page'),
    refSettingsStore.user_id,
    MsgType.COMMON,
    false
  );
  const handlePageChanged = (p: number) => {
    msgParam.page = p;
  };
  watch([visible], (v) => {
    if (v) {
      refreshFix();
      refreshCommon();
    }
  });
  //form
  const formData = reactive<IReqMsgParam>({
    code: -1,
    user_id: settingsStore.user_id,
    content: '',
    nickname: '',
    verify_id: imageID.value,
    verify_str: '',
  });
  const handleSubmit = () => {
    if (!formData.content) {
      ElMessage.error('请输入内容');
      console.log('fadf');
      return;
    }
    if (!formData.nickname) {
      ElMessage.error('请输入昵称');
      return;
    }
    if (!formData.verify_str) {
      ElMessage.error('请输入验证码');
      return;
    }
    reqAddMsg(
      Object.assign({}, formData, { user_id: settingsStore.user_id, verify_id: imageID.value })
    )
      .then(({ code, msg }) => {
        if (code === OK_CODE) {
          ElMessage.success(msg);
          refreshCommon();
          return;
        }
        ElMessage.error(msg);
      })
      .catch((err) => {
        ElMessage.error(err.message);
      });
  };
</script>

<template>
  <a class="flex items-center space-x-0.5" href="#" @click.prevent="visible = true">
    <el-icon :size="17"><edit /></el-icon>
    <span>留言</span>
  </a>
  <el-dialog
    v-model:model-value="visible"
    width="400px"
    title="留言板"
    :append-to-body="true"
    :modal="false"
  >
    <div class="header">
      <div class="box">
        <el-input
          v-model="formData.content"
          placeholder="输入留言"
          type="textarea"
          :autosize="{ minRows: 2 }"
        />
      </div>
      <div class="verify flex space-x-2 mt-3">
        <el-input v-model="formData.nickname" size="small" class="flex-1" placeholder="昵称" />
        <el-input v-model="formData.verify_str" size="small" placeholder="验证码" class="flex-1" />
        <img :src="image" alt="verify image" class="w-20 cursor-pointer rounded" @click="refresh" />
      </div>
      <div class="mt-3">
        <el-button size="small" @click="handleSubmit">提交</el-button>
      </div>
    </div>
    <div class="border-t border-gray-300 my-3"></div>
    <div class="main">
      <ul class="items">
        <li v-for="(item, i) in fixedMsg" :key="i" class="msg border-b border-gray-200 pb-3 mb-3">
          <msg-item :item="item" />
        </li>
      </ul>
      <ul class="items">
        <li v-for="(item, i) in commonMsg" :key="i" class="msg border-b border-gray-200 pb-3 mb-3">
          <msg-item :item="item" />
        </li>
      </ul>
    </div>
    <div class="page flex justify-center">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :pager-count="5"
        :page-size="msgParam.size"
        :current-page="msgParam.page"
        @current-change="handlePageChanged"
      />
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
