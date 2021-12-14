<script lang="ts" setup="setup">
  import { computed, ref } from 'vue';
  import type { IBoxesData, ILink } from '@/api/siteApi';
  import AppIcon from '@/components/common/AppIcon.vue';
  import { reqPwdBox } from '@/api/boxApi';
  import useSiteSettingsStore from '@/store/hooks/useSiteSettingsStore';
  import { OK_CODE } from '@/app/keys';
  import { ElMessage } from 'element-plus';
  const props = defineProps<{
    box: IBoxesData;
  }>();
  const emits = defineEmits(['expand']);
  const desc = ref('');
  const pwd = ref('');
  const showPwd = ref(true);
  const links = ref<ILink[]>(props.box.links || []);

  const settingsStore = useSiteSettingsStore();
  const userID = computed(() => {
    return settingsStore.user_id || 0;
  });
  const handleSubmit = () => {
    if (!pwd.value || userID.value === 0) return;
    reqPwdBox(userID.value, pwd.value)
      .then(({ data, msg, code }) => {
        if (code === OK_CODE) {
          computedLink.value = data.links;
          ElMessage.success(msg);
          showPwd.value = false;
          return;
        }
        ElMessage.error(msg);
      })
      .catch((err) => {
        ElMessage.error(err as string);
      });
  };
  const orderByTime = ref(false);
  // watch(
  //   () => props.box,
  //   () => {
  //     const link = JSON.parse(JSON.stringify(props.box.links)) as ILink[];
  //     links.value = link || [];
  //   },
  //   { immediate: true }
  // );
  // watch(orderByTime, () => {
  //   const link = JSON.parse(JSON.stringify(links.value)) as ILink[];
  //   links.value = link.sort((item1, item2) => {
  //     return new Date(item2.created_at).getTime() - new Date(item1.created_at).getTime();
  //   });
  // });
  const computedLink = computed({
    set: (val) => {
      links.value = val as unknown as ILink[];
    },
    get: () => {
      if (!orderByTime.value) return links.value;
      const link = JSON.parse(JSON.stringify(links.value)) as ILink[];
      return link.sort((item1, item2) => {
        return new Date(item2.created_at).getTime() - new Date(item1.created_at).getTime();
      });
    },
  });
  const computedNotice = computed(() => {
    return props.box.pwd_notice || '请输入密码';
  });
  const handleEnter = (item: ILink) => {
    if (item.description) {
      desc.value = item.description;
    }
  };
  const handleBoxEnter = () => {
    desc.value = props.box.introduction || '';
  };
</script>

<template>
  <div class="box" @mouseenter="handleBoxEnter">
    <div class="box-title">
      <i v-if="props.box.icon" class="iconfont mr-2" :class="[props.box.icon]"></i>
      <span>
        {{ props.box.title }}
        <em class="text-xs">({{ computedLink.length || 0 }})</em>
      </span>
      <div class="ctrls inline-flex space-x-1 absolute top-0 right-1 text-sm">
        <div class="cursor-pointer" @click="orderByTime = !orderByTime">
          <app-icon class="icon" icon="clarity:date-line" />
        </div>
        <div class="cursor-pointer" @click="emits('expand', props.box)">
          <app-icon icon="bx:bx-expand" />
        </div>
      </div>
    </div>
    <div class="box-desc">{{ desc }}</div>
    <div class="cnt-wrapper">
      <div v-if="props.box.pwd === 'need' && showPwd" class="pwd">
        <input
          v-model="pwd"
          class="pwd-input"
          type="password"
          :placeholder="computedNotice"
          @keyup.enter="handleSubmit"
        />
        <button class="pwd-btn" @click="handleSubmit">确认</button>
      </div>
      <div v-else class="box-items">
        <a
          v-for="(link, m) in computedLink"
          :key="m"
          class="box-link"
          :href="link.link"
          target="_blank"
          @mouseenter.stop="handleEnter(link)"
        >
          <i v-if="link.icon" class="iconfont mr-1" :class="[link.icon]"></i>
          <span>{{ link.title }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '../../../assets/styles/mixin';
  .box-title {
    color: var(--box-title-color);
    @apply relative text-center font-bold text-lg mb-1;

    &:hover {
      .ctrls {
        @apply inline-flex transition-all;
      }
    }

    .ctrls {
      @apply hidden transition-all;
      color: var(--box-title-color);
    }
    .icon {
      color: var(--box-title-color);
    }
  }
  .box-link {
    color: var(--box-link-color);
  }
  .box {
    @apply bg-gray-600 bg-opacity-40 rounded-2xl p-3 m-1 transition-all;
    @apply flex flex-col justify-center;
    background: var(--box-background-color);
    &:hover {
      background: var(--box-back-hover-color);
    }
  }
  .box-desc {
    @apply text-xs text-center truncate w-full h-3.5 mb-0.5;
    color: var(--box-title-color);
  }
  .cnt-wrapper {
    @apply h-36 flex flex-col justify-center;
  }
  .box-items {
    @apply flex flex-wrap items-center h-32 overflow-y-auto text-sm text-center;
    @include hide-scroll;
  }
  .box-link {
    @apply w-1/3 my-3;
    &:hover {
      color: var(--box-link-hover-color);
    }
  }
  .pwd {
    @apply h-8 flex items-center justify-center px-3 mb-4;
    .pwd-input {
      @apply flex-1 px-2 py-1 rounded outline-none h-full border appearance-none;
      border-color: var(--box-title-color);
      background-color: var(--box-background-color);
      color: var(--box-link-color);
    }
    .pwd-btn {
      @apply ml-3 rounded px-3 h-full border text-xs;
      border-color: var(--box-title-color);
      background: var(--box-background-color);
      color: var(--box-title-color);
    }
  }
</style>
