<script lang="ts" setup="setup">
  import { computed, ref } from 'vue';
  import BoxCard from '@/components/common/BoxCard.vue';
  import useUserStore from '@/store/hooks/useUserStore';
  import useCopy from '@/hooks/useCopy';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { Plus } from '@element-plus/icons';
  import { reqRefreshToken } from '@/api/userApi';
  import { OK_CODE } from '@/app/keys';
  import type { BasicResp } from '@/api/types';

  const mainUrl = import.meta.env.VITE_MAIN_URL;
  const { copy } = useCopy(() => {
    ElMessage.success('复制成功');
  });
  const handleCopy = () => {
    copy(quickLink.value);
  };
  const handleRefresh = () => {
    ElMessageBox.confirm('确认更新吗，更新后以前依赖目前token的链接将不可用？', '确认更新吗？', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      reqRefreshToken().then(({ data, msg, code }) => {
        if (code === OK_CODE) {
          userStore.refreshToken(data.token);
          ElMessage.success(msg);
          return;
        }
        ElMessage.error(msg);
      });
    });
  };
  const userStore = useUserStore()!;
  const quickLink = computed(() => {
    return `javascript:var dDom=document.querySelector("meta[name$='scription']");var navKuanDesc = dDom ? dDom.getAttribute("content") : document.title +' '+ location.href;location.href='${mainUrl}/quick_add?title='+document.title+'&token=${userStore.info?.access_token}&description='+ navKuanDesc+'&link='+decodeURIComponent(location.href);void(0);`;
  });

  //upload
  const avatar = computed(() => {
    return userStore.info?.avatar;
  });
  const action = computed(() => {
    return `${import.meta.env.VITE_API_URL}/user/auth/v1/avatar`;
  });
  const headers = ref({
    Authorization: `Bearer ${userStore.token}`,
  });
  const handleAvatarSuccess = (res: BasicResp<{ url: string }>) => {
    userStore.changeAvatar(res.data.url + 'time=' + Date.now());
    ElMessage.success('上传成功');
  };
  const beforeAvatarUpload = (file: File) => {
    const isJPG =
      file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 1;

    if (!isJPG) {
      ElMessage.error('头像必需是jpg或png格式');
    }
    if (!isLt2M) {
      ElMessage.error('头像需要少于1M');
    }
    return isJPG && isLt2M;
  };
</script>

<template>
  <box-card>
    <template #title>个人中心</template>
    <div class="grid grid-cols-1 md:grid-cols-2 md:space-x-5">
      <div>
        <el-descriptions :column="1">
          <el-descriptions-item label-align="center">
            <el-upload
              class="avatar-uploader"
              :headers="headers"
              :action="action"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="avatar" :src="avatar" class="avatar w-14 h-14 rounded" alt="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
            </el-upload>
            <!--            <el-avatar :src="userStore.info?.avatar">-->
            <!--              <img-->
            <!--                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"-->
            <!--                alt="avatar"-->
            <!--              />-->
            <!--            </el-avatar>-->
          </el-descriptions-item>
          <el-descriptions-item label="用户名" label-align="center">
            <div class="flex space-x-2">
              <el-input class="flex-1" disabled :model-value="userStore.info?.username"></el-input>
              <el-button>修改</el-button>
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="邮箱地址" label-align="center">
            <el-input disabled :model-value="userStore.info?.email"></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="Token" label-align="center">
            <div class="flex space-x-2">
              <el-input class="flex-1" :model-value="userStore.info?.access_token"></el-input>
              <el-button @click="handleRefresh">刷新</el-button>
            </div>
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div>
        <el-input
          type="textarea"
          disabled
          :model-value="quickLink"
          :autosize="{ minRows: 5 }"
          class="mb-3"
        ></el-input>
        <div class="mb-3">
          <el-button type="primary" @click="handleCopy">复制</el-button>
        </div>
        <el-alert title="说明" :closable="false">
          <template #default>
            新建一个浏览器书签，将上面这串代码粘贴到您的浏览器书签【地址栏】，然后当您遇到想添加到优聚集的网站，那么在此网站页面上点击此书签即可
            【
            <a href="https://www.misiyu.cn/article/164.html" target="_blank">更多说明</a>
            】
          </template>
        </el-alert>
      </div>
    </div>
  </box-card>
</template>

<style lang="scss" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
  .avatar-uploader-icon svg {
    margin-top: 74px; /* (178px - 28px) / 2 - 1px */
  }
  .avatar {
    display: block;
  }
</style>
