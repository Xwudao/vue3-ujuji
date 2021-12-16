<script lang="ts" setup="setup">
  import { reactive, ref } from 'vue';
  import useVerify from '@/hooks/api/useVerify';
  import type { IRegisterData } from '@/api/userApi';
  import { reqUserLogin } from '@/api/userApi';
  import { OK_CODE } from '@/app/keys';
  import { ElMessage } from 'element-plus';
  import useUserStore from '@/store/hooks/useUserStore';
  import { useRouter } from 'vue-router';
  import { AgreeUrl } from '@/core/constant';

  const formData = reactive<IRegisterData>({
    username: '',
    password: '',
    email: '',
    email_verify: '',
    verify_code: '',
    verify_id: '',
  });
  const agree = ref(false);
  const rules = {
    username: [{ required: true, message: '用户名不能为空' }],
    password: [{ required: true, message: '密码不能为空' }],
    verify_code: [{ required: true, message: '验证码不能为空' }],
    email: [{ required: true, message: '邮箱地址不能为空' }],
    email_verify: [{ required: true, message: '邮箱验证码不能为空' }],
  };
  const { imageID, refresh, image } = useVerify();
  const handleSubmit = () => {};
</script>

<template>
  <div class="wrapper h-full w-full flex justify-center items-center bg-gray-100">
    <div class="card rounded w-full px-4 sm:px-0 sm:w-80 bg-white shadow-lg">
      <div class="wrapper p-4">
        <div class="title flex justify-between border-b border-gray-200 pb-1 mb-3">
          <span class="font-bold text-lg">注册</span>
          <span>
            <el-button type="text" @click="$router.push({ name: 'Login' })">立即登录</el-button>
            <el-button type="text" @click="$router.push({ name: 'Front' })">返回首页</el-button>
            <el-button type="text">忘记密码</el-button>
          </span>
        </div>
        <el-form
          ref="formEl"
          :model="formData"
          :rules="rules"
          label-width="60"
          @submit.prevent="handleSubmit"
        >
          <el-form-item lable="用户名" prop="username">
            <el-input v-model="formData.username" placeholder="输入用户名" />
          </el-form-item>
          <el-form-item lable="密码" prop="password">
            <el-input v-model="formData.password" type="password" placeholder="输入密码" />
          </el-form-item>
          <el-form-item lable="邮箱" prop="email">
            <el-input v-model="formData.email" type="email" placeholder="输入邮箱" />
          </el-form-item>
          <el-form-item lable="密码" prop="verify_code">
            <div class="flex">
              <el-input v-model="formData.verify_code" placeholder="输入验证码" class="flex-1" />
              <img
                :src="image"
                alt="verify image"
                class="h-8 ml-2 rounded cursor-pointer"
                @click="refresh"
              />
            </div>
          </el-form-item>
          <el-form-item lable="邮箱验证码" prop="email_verify">
            <el-input v-model="formData.email_verify" placeholder="输入邮箱里的验证码" />
          </el-form-item>
          <el-form-item>
            <div class="flex items-center">
              <el-checkbox v-model="agree" label="同意协议"></el-checkbox>
              <a :href="AgreeUrl" target="_blank" class="hover:underline">
                《[优聚集]用户使用与免责申明》
              </a>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button native-type="submit" class="w-full" type="primary">注册</el-button>
          </el-form-item>
        </el-form>
        <!--        <button @click="$router.push({ name: 'Admin' })">to admin</button>-->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
