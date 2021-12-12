<script lang="ts" setup="setup">
  import { ref } from 'vue';
  import AppIcon from '@/components/common/AppIcon.vue';
  import useLatestLink from '@/hooks/api/useLatestLink';
  import { formatDateYMD } from '@/utils/date';
  import { Loading } from '@element-plus/icons';
  import AppSmallLoading from '@/components/common/AppSmallLoading.vue';
  const visible = ref(false);
  const { loading: loadingLink, refresh, links } = useLatestLink();
  const handleShow = () => {
    refresh();
  };
</script>

<template>
  <el-popover
    placement="bottom"
    title="最新添加的站点"
    :width="300"
    trigger="click"
    @show="handleShow"
  >
    <template #default>
      <app-small-loading v-if="loadingLink" />
      <ul>
        <li v-for="(item, i) in links" :key="i">
          <a
            :href="item.link"
            target="_blank"
            class="flex w-full hover:bg-gray-200 space-x-1 px-1 py-1 rounded"
          >
            <span class="flex-1 truncate">{{ item.title }}</span>
            <span class="text-gray-400 text-xs">{{ formatDateYMD(item.created_at) }}</span>
          </a>
        </li>
      </ul>
    </template>
    <template #reference>
      <a href="#" class="flex items-center space-x-0.5" @click="visible = true">
        <app-icon class="text-lg" icon="akar-icons:link-on" />
        <span>最新</span>
      </a>
    </template>
  </el-popover>
</template>

<style lang="scss" scoped></style>
