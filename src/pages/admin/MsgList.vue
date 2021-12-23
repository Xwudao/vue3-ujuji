<script lang="ts" setup="setup">
  import BoxCard from '@/components/common/BoxCard.vue';
  import useMsgList from '@/hooks/api/useMsgList';
  import { Delete, Message, Pointer, View } from '@element-plus/icons';
  import ReadMsg from '@/components/admin/ReadMsg.vue';
  import { ref } from 'vue';
  import type { IMsgInfo } from '@/api/leaveMsgApi';
  import ReplyMsg from '@/components/admin/ReplyMsg.vue';
  import { reqMsgDelete } from '@/api/leaveMsgApi';
  import { OK_CODE } from '@/app/keys';
  import { ElMessage } from 'element-plus';

  const { handleFixedMsg, msg, page, size, total, refresh, handlePageChanged, loading } =
    useMsgList();
  const cols = [
    {
      label: 'Nickname',
      prop: 'nickname',
    },
    {
      label: 'Content',
      prop: 'content',
    },
    {
      label: 'Reply',
      prop: 'reply',
    },
  ];
  const msgData = ref<IMsgInfo | {}>({});
  const showRead = ref(false);
  const handleRead = (msg: IMsgInfo) => {
    msgData.value = msg;
    showRead.value = true;
  };
  const handleCloseReadDialog = () => {
    showRead.value = false;
    refresh();
  };

  const showReply = ref(false);
  const handleReply = (msg: IMsgInfo) => {
    msgData.value = msg;
    showReply.value = true;
  };
  const handleCloseReplyDialog = () => {
    showReply.value = false;
    refresh();
  };
  //delete
  const handleDelete = (id: number) => {
    reqMsgDelete(id).then(({ code, msg: m }) => {
      if (code === OK_CODE) {
        ElMessage.success(m);
        msg.value = msg.value.filter((item) => item.id === id);
        return;
      }
      ElMessage.error(m);
    });
  };
</script>

<template>
  <box-card>
    <template #title>留言管理</template>
    <template #cnt>
      <el-table v-loading="loading" :data="msg" border>
        <el-table-column
          v-for="(item, i) in cols"
          :key="i"
          :prop="item.prop"
          :label="item.label"
        ></el-table-column>
        <el-table-column label="状态">
          <template #default="{ row }">
            <div class="space-x-2">
              <el-tag v-if="row.read" type="success">已读</el-tag>
              <el-tag v-else type="danger">未读</el-tag>
              <el-tag v-if="row.fixed" type="success">置顶</el-tag>
              <el-tag v-else type="danger">普通</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <div class="space-x-2">
              <el-button :icon="View" circle size="mini" @click="handleRead(row)" />
              <el-button
                type="primary"
                :icon="Message"
                circle
                size="mini"
                @click="handleReply(row)"
              />
              <el-button
                type="success"
                :icon="Pointer"
                circle
                size="mini"
                @click="handleFixedMsg(row)"
              />
              <el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete(row.id)">
                <template #reference>
                  <el-button type="danger" :icon="Delete" circle size="mini" />
                </template>
              </el-popconfirm>
              <!--              <elco-->
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="justify-center mt-3 flex">
        <el-pagination
          background
          :page-size="size"
          :current-page="page"
          :total="total"
          @current-change="handlePageChanged"
        />
      </div>
    </template>
  </box-card>
  <read-msg :msg="msgData" :visible="showRead" @close="handleCloseReadDialog" />
  <reply-msg :msg="msgData" :visible="showReply" @close="handleCloseReplyDialog" />
</template>

<style lang="scss" scoped></style>
