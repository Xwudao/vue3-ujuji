<script lang="ts" setup="setup">
  import { reactive, ref } from 'vue';
  import useVerify from '@/hooks/api/useVerify';
  import type { ILoginData } from '@/api/userApi';
  import { reqUserLogin } from '@/api/userApi';
  import { OK_CODE } from '@/app/keys';
  import { ElMessage } from 'element-plus';
  import useUserStore from '@/store/hooks/useUserStore';
  import { useRouter } from 'vue-router';
  import { AgreeUrl } from '@/core/constant';
  const formData = reactive<ILoginData>({
    username: '',
    password: '',
    verify_str: '',
    verify_id: '',
  });
  const agree = ref(true);
  const rules = {
    username: [{ required: true, message: '用户名不能为空' }],
    password: [{ required: true, message: '密码不能为空' }],
    verify_str: [{ required: true, message: '验证码不能为空' }],
  };
  const { imageID, refresh, image } = useVerify();
  const userStore = useUserStore();
  const router = useRouter();
  const formEl = ref<HTMLFormElement>(null!);
  const handleSubmit = () => {
    formEl.value.validate().then((ok: boolean) => {
      if (!ok) return;
      if (!agree.value) {
        ElMessage.info('请先同意协议');
        return;
      }
      reqUserLogin(Object.assign({}, formData, { verify_id: imageID.value })).then(
        ({ code, data, msg }) => {
          if (code === OK_CODE) {
            ElMessage.success(msg);
            userStore.load(data);
            router.push({ name: 'Admin' });
          } else {
            ElMessage.error(msg);
          }
        }
      );
    });
  };
</script>

<template>
  <div class="wrapper h-full w-full flex justify-center items-center bg-gray-100">
    <div class="card rounded w-full px-4 sm:px-0 sm:w-80 bg-white shadow-lg">
      <div class="wrapper p-4">
        <div class="title flex justify-between border-b border-gray-200 pb-1 mb-3">
          <span class="font-bold text-lg">登录</span>
          <span>
            <el-button type="text" @click="$router.push({ name: 'Register' })">立即注册</el-button>
            <el-button type="text" @click="$router.push({ name: 'Front' })">返回首页</el-button>
            <el-button type="text" @click="$router.push({ name: 'FindPass' })">忘记密码</el-button>
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
          <el-form-item lable="验证码" prop="verify_str">
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
            <div class="flex items-center">
              <el-checkbox v-model="agree" label="同意协议"></el-checkbox>
              <a :href="AgreeUrl" target="_blank" class="hover:underline">
                《[优聚集]用户使用与免责申明》
              </a>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button native-type="submit" class="w-full" type="primary">登录</el-button>
          </el-form-item>
        </el-form>
        <!--        <button @click="$router.push({ name: 'Admin' })">to admin</button>-->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
