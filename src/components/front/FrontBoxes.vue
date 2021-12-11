<script lang="ts" setup="setup">
  import type { IBoxesData } from '@/api/siteApi';
  import { ref, watch } from 'vue';
  import BoxExpandDialog from '@/components/front/main/BoxExpandDialog.vue';
  import BoxItem from '@/components/front/main/BoxItem.vue';

  const props = defineProps<{
    boxes: IBoxesData[];
  }>();
  const notices = ref<{ [boxID: number]: string }>({});
  watch(
    () => props.boxes,
    () => {
      props.boxes.forEach((item) => {
        notices.value[item.id] = item.introduction;
      });
    }
  );
  // const handleEnter = (boxID: number, linkID: number) => {
  //   const box = props.boxes.find((item) => item.id === boxID);
  //   if (box) {
  //     const link = box.links.find((item) => item.id === linkID);
  //     if (link) {
  //       notices.value[boxID] = link.description;
  //     }
  //   }
  // };
  const showExpand = ref(false);
  const showData = ref<IBoxesData | undefined>();
  const handleExpand = (item: IBoxesData) => {
    showExpand.value = true;
    showData.value = item;
  };
</script>

<template>
  <div class="boxes">
    <box-item v-for="(box, i) in props.boxes" :key="i" :box="box" @expand="handleExpand" />
  </div>
  <box-expand-dialog :box="showData" :visible="showExpand" @close="showExpand = false" />
</template>

<style lang="scss" scoped>
  @import '../../assets/styles/mixin';
  .boxes {
    @apply mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4;
  }
</style>
