<script lang="ts" setup="setup">
  import { reactive, ref } from 'vue';
  import useVerify from '@/hooks/api/useVerify';
  import type { ILoginData } from '@/api/userApi';
  import { reqUserLogin } from '@/api/userApi';
  import { OK_CODE } from '@/app/keys';
  import { ElMessage } from 'element-plus';
  import useUserStore from '@/store/hooks/useUserStore';
  import { useRouter } from 'vue-router';
  const formData = reactive<ILoginData>({
    username: '',
    password: '',
    verify_str: '',
    verify_id: '',
  });
  const rules = {
    username: [{ required: true, message: '用户名不能为空' }],
    password: [{ required: true, message: '密码不能为空' }],
    verify_str: [{ required: true, message: '验证码不能为空' }],
  };
  const { imageID, refresh, image } = useVerify();
  const userStore = useUserStore();
  const router = useRouter();
  const handleSubmit = () => {
    reqUserLogin(Object.assign({}, formData, { verify_id: imageID.value })).then(
      ({ code, data, msg }) => {
        if (code === OK_CODE) {
          ElMessage.success(msg);
          // userStore.load(data);
          router.push({ name: 'Admin' });
        } else {
          ElMessage.error(msg);
        }
      }
    );
  };
</script>

<template>
  <div class="wrapper h-full w-full flex justify-center items-center bg-gray-100">
    <div class="card rounded w-full px-4 sm:px-0 sm:w-80 bg-white shadow">
      <div class="wrapper p-4">
        <div class="title border-b border-gray-200 pb-1 mb-3">
          <span class="font-bold text-lg">登录</span>
        </div>
        <el-form :model="formData" :rules="rules" label-width="60" @submit.prevent="handleSubmit">
          <el-form-item lable="用户名" prop="username">
            <el-input v-model="formData.username" placeholder="输入用户名" />
          </el-form-item>
          <el-form-item lable="密码" prop="password">
            <el-input v-model="formData.password" type="password" placeholder="输入密码" />
          </el-form-item>
          <el-form-item lable="密码" prop="verify_str">
            <div class="flex">
              <el-input v-model="formData.verify_str" placeholder="输入验证码" class="flex-1" />
              <img
                :src="image"
                alt="verify image"
                class="h-8 ml-2 rounded cursor-pointer"
                @click="refresh"
              />
            </div>
          </el-form-item>
          <el-form-item>
            <el-button native-type="submit" class="w-full" type="primary">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
