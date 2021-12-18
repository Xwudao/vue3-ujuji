<script lang="ts" setup="setup">
  import { reactive, ref } from 'vue';
  import useVerify from '@/hooks/api/useVerify';
  import type { IUpdatePassParams } from '@/api/verifyApi';
  import { reqFindPassEmailVerify, reqUpdatePassByEmailVerify } from '@/api/verifyApi';
  import { OK_CODE } from '@/app/keys';
  import { ElMessage } from 'element-plus';
  import { useRouter } from 'vue-router';
  const active = ref(0);

  const formData = reactive({
    email: '',
    verify_code: '',
    verify_id: '',
  });
  const rules = {
    email: [{ required: true, message: '邮箱不能为空' }],
    verify_code: [{ required: true, message: '验证码不能为空' }],
  };
  const { imageID, refresh, image } = useVerify();
  const formEl = ref<HTMLFormElement>(null!);
  const handleSendVerify = () => {
    formEl.value.validate().then(async (ok: boolean) => {
      if (!ok) return;
      reqFindPassEmailVerify(Object.assign(formData, { verify_id: imageID.value })).then(
        ({ msg, code }) => {
          if (code === OK_CODE) {
            ElMessage.success(msg);
            active.value = 1;
            refresh();
            return;
          }
          ElMessage.error(msg);
        }
      );
    });
  };
  //steps-2
  const formData2 = reactive<IUpdatePassParams>({
    email: '',
    email_code: '',
    password: '',
    verify_code: '',
    verify_id: '',
  });
  const formEl2 = ref<HTMLFormElement>(null!);
  const rules2 = {
    email: [{ required: true, message: '邮箱不能为空' }],
    email_code: [{ required: true, message: '邮箱验证码不能为空' }],
    password: [{ required: true, message: '新密码不能为空' }],
    verify_code: [{ required: true, message: '验证码不能为空' }],
  };
  const router = useRouter();
  const handleUpdate = () => {
    formEl2.value.validate().then(async (ok: boolean) => {
      if (!ok) return;
      reqUpdatePassByEmailVerify(Object.assign({}, formData2, { verify_id: imageID.value })).then(
        ({ code, msg }) => {
          if (code === OK_CODE) {
            ElMessage.success(msg);
            router.push({ name: 'Login' });
            return;
          }
          ElMessage.error(msg);
        }
      );
    });
  };
</script>

<template>
  <div class="wrapper h-full w-full flex justify-center items-center bg-gray-100">
    <div class="card rounded w-full px-4 sm:px-0 sm:w-96 bg-white shadow-lg">
      <div class="wrapper p-4">
        <div class="title flex justify-between border-b border-gray-200 pb-1 mb-3">
          <span class="font-bold text-lg">找回密码</span>
          <span>
            <el-button type="text" @click="$router.push({ name: 'Login' })">立即登录</el-button>
            <el-button type="text" @click="$router.push({ name: 'Register' })">立即注册</el-button>
            <el-button type="text" @click="$router.push({ name: 'Front' })">返回首页</el-button>
          </span>
        </div>
        <div class="cnt">
          <el-steps :active="active" finish-status="success">
            <el-step title="发送邮件"></el-step>
            <el-step title="更新密码"></el-step>
          </el-steps>

          <!--    steps-->
          <div v-show="active === 0" class="send-verify">
            <el-form
              ref="formEl"
              :model="formData"
              :rules="rules"
              label-width="60"
              @submit.prevent="handleSendVerify"
            >
              <el-form-item lable="邮箱" prop="email">
                <el-input v-model="formData.email" placeholder="输入邮箱" />
              </el-form-item>
              <el-form-item lable="验证码" prop="verify_code">
                <div class="flex">
                  <el-input
                    v-model="formData.verify_code"
                    placeholder="输入验证码"
                    class="flex-1"
                  />
                  <img
                    :src="image"
                    alt="verify image"
                    class="h-8 ml-2 rounded cursor-pointer"
                    @click="refresh"
                  />
                </div>
              </el-form-item>
              <el-form-item>
                <div class="flex">
                  <el-button native-type="submit" class="w-full" type="primary">发送邮件</el-button>
                  <el-button native-type="submit" class="w-full" type="danger" @click="active = 1">
                    已发送，进入第2步
                  </el-button>
                </div>
              </el-form-item>
              <el-form-item>
                <el-alert title="温馨提示" type="info" :closable="false" class="">
                  <template #default>
                    <span style="line-height: 1rem">
                      当找回密码发送邮件成功时，邮件内的验证码有效期30分钟，30分钟内无法再次发送找回邮件。若收件箱无邮件，请于垃圾箱内找寻验证码。
                    </span>
                  </template>
                </el-alert>
              </el-form-item>
            </el-form>
          </div>
          <!--          steps -2 -->
          <div v-show="active === 1" class="update-pass">
            <el-form
              ref="formEl2"
              :model="formData2"
              :rules="rules2"
              label-width="60"
              @submit.prevent="handleUpdate"
            >
              <el-form-item lable="邮箱" prop="email">
                <el-input v-model="formData2.email" placeholder="输入邮箱" />
              </el-form-item>
              <el-form-item lable="邮箱验证码" prop="email_code">
                <el-input v-model="formData2.email_code" placeholder="邮箱验证码" />
              </el-form-item>
              <el-form-item lable="验证码" prop="verify_code">
                <div class="flex">
                  <el-input
                    v-model="formData2.verify_code"
                    placeholder="输入验证码"
                    class="flex-1"
                  />
                  <img
                    :src="image"
                    alt="verify image"
                    class="h-8 ml-2 rounded cursor-pointer"
                    @click="refresh"
                  />
                </div>
              </el-form-item>
              <el-form-item lable="新密码" prop="password">
                <el-input v-model="formData2.password" type="password" placeholder="新密码" />
              </el-form-item>
              <el-form-item>
                <div class="flex">
                  <el-button native-type="submit" class="w-full" type="primary">重置密码</el-button>
                  <!--                  <el-button native-type="submit" class="w-full" type="danger" @click="active = 1">-->
                  <!--                    已发送，进入第2步-->
                  <!--                  </el-button>-->
                </div>
              </el-form-item>
              <el-form-item>
                <el-alert title="温馨提示" type="info" :closable="false" class="">
                  <template #default>
                    <span style="line-height: 1rem">
                      当找回密码发送邮件成功时，邮件内的验证码有效期30分钟，30分钟内无法再次发送找回邮件。若收件箱无邮件，请于垃圾箱内找寻验证码。
                    </span>
                  </template>
                </el-alert>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
