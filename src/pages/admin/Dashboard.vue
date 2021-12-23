<script lang="ts" setup="setup">
  import { Message } from '@element-plus/icons';
  import BoxCard from '@/components/common/BoxCard.vue';
  import useStatisticsData from '@/hooks/api/useStatisticsData';
  const links = [
    {
      link: 'https://www.yuque.com/wudao-xbkay/lmzvzk/',
      label: '用户使用文档',
    },
    {
      link: 'https://www.yuque.com/wudao-xbkay/lmzvzk/znpq1r',
      label: '快速添加站点链接',
    },
    {
      link: 'https://www.yuque.com/wudao-xbkay/lmzvzk/ssqrk1',
      label: '自定义站点、盒子的图标',
    },
    {
      link: 'https://www.yuque.com/wudao-xbkay/lmzvzk/wlydwb',
      label: '添加搜索站点',
    },
  ];
  const { unReadMsg } = useStatisticsData();
</script>

<template>
  <box-card>
    <template #title>控制首页</template>
    <template #cnt>
      <el-descriptions title="">
        <el-descriptions-item v-for="(item, i) in links" :key="i">
          <el-link type="primary" :href="item.link" target="_blank">
            <el-icon size="14"><message /></el-icon>
            {{ item.label }}
          </el-link>
        </el-descriptions-item>
      </el-descriptions>
    </template>
  </box-card>
  <box-card class="mt-3">
    <template #title>提示</template>
    <template #cnt>
      <router-link
        :to="{ name: 'MsgList' }"
        class="
          box
          border border-gray-300
          p-4
          inline-flex
          flex-col
          items-center
          justify-center
          rounded
        "
      >
        <span class="font-bold text-3xl mb-2">{{ unReadMsg }}</span>
        <span>未读留言</span>
      </router-link>
    </template>
  </box-card>
</template>

<style lang="scss" scoped></style>
