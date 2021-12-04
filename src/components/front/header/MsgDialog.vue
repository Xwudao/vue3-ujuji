<script lang="ts" setup="setup">
  import { reactive, ref, toRef } from 'vue';
  import useVerify from '@/hooks/api/useVerify';
  import useLeaveMsg from '@/hooks/api/useLeaveMsg';
  import useSiteSettingsStore from '@/store/hooks/useSiteSettingsStore';
  import { storeToRefs } from 'pinia';
  import { MsgType } from '@/api/leaveMsgApi';
  import MsgItem from '@/components/front/header/MsgItem.vue';
  import { watch } from 'vue';

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
</script>

<template>
  <a href="#" @click.prevent="visible = true">留言</a>
  <el-dialog v-model:model-value="visible" width="400px" title="用戶留言" :modal="false">
    <div class="header">
      <div class="box">
        <el-input placeholder="輸入留言" type="textarea" :autosize="{ minRows: 2 }" />
      </div>
      <div class="verify flex space-x-2 mt-3">
        <el-input size="small" class="flex-1" placeholder="暱稱" />
        <el-input size="small" placeholder="驗證碼" class="flex-1" />
        <img :src="image" alt="verify image" class="w-20 cursor-pointer rounded" @click="refresh" />
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
