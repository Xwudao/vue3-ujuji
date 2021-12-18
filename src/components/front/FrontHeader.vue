<script lang="ts" setup="setup">
  import useWeatherStore from '@/store/hooks/useWeatherStore';
  import { computed, ref } from 'vue';
  import city from '@/assets/data/city.json';
  import MsgDialog from '@/components/front/header/MsgDialog.vue';
  import NewsDialog from '@/components/front/header/NewsDialog.vue';
  import LatestLinkDialog from '@/components/front/header/LatestLinkDialog.vue';
  import SettingBtn from '@/components/front/header/SettingBtn.vue';

  const weatherStore = useWeatherStore();
  const showPopover = ref(false);
  const cityVal = ref<string[]>([]);
  const info = computed(() => {
    const i = weatherStore.data?.data?.weather.content;
    if (!i) return '';
    return `[${i?.city}] ${i?.today.condition} ${i?.today.temp}`;
  });

  const handleChange = (val: string[]) => {
    if (!val.length) return;
    weatherStore.changeCity(val[val.length - 1]);
    showPopover.value = false;
  };
</script>

<template>
  <div class="headers flex justify-between text-sm px-2">
    <div class="left">
      <el-popover
        placement="bottom"
        title="城市选择"
        :width="220"
        trigger="click"
        :visible="showPopover"
      >
        <template #default>
          <el-cascader
            v-model="cityVal"
            placeholder="可搜索城市哟～"
            filterable
            size="mini"
            :options="city"
            @change="handleChange"
          ></el-cascader>
          <div class="mt-2 flex justify-end">
            <el-button size="small" type="text" @click="showPopover = false">取消</el-button>
          </div>
        </template>
        <template #reference>
          <span class="cursor-pointer" @click="showPopover = true">{{ info }}</span>
          <!--          <el-tooltip-->
          <!--            class="item"-->
          <!--            effect="light"-->
          <!--            :content="weatherStore.detailWeather"-->
          <!--            placement="bottom"-->
          <!--          >-->
          <!--          </el-tooltip>-->
        </template>
      </el-popover>
    </div>
    <div class="right">
      <ul class="flex space-x-2">
        <li><news-dialog /></li>
        <li><msg-dialog /></li>
        <li><latest-link-dialog /></li>
        <li><setting-btn /></li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
