<script lang="ts" setup="setup">
  import useCounter from '@/store/useCounter';
  import { storeToRefs } from 'pinia';
  import AppIcon from '@/components/common/AppIcon.vue';

  const counter = useCounter();
  const refCounter = storeToRefs(counter);
</script>

<template>
  <div class="wrapper h-screen w-screen text-center p-10">
    <div class="front w-96 mx-auto p-5 rounded border border-gray-300">
      <div class="font-bold text-lg text-gray-700">Front</div>
    </div>

    <div class="box mt-4 w-96 mx-auto p-5 rounded border border-gray-300">
      <div class="title font-bold text-left mb-3">Pinia:</div>
      <p>
        <el-button size="small" @click="counter.add(1)">+1</el-button>
        <el-button size="small" @click="counter.add(10)">+10</el-button>
      </p>
      <p class="mt-5">
        <span>{{ refCounter.count }}</span>
      </p>
    </div>

    <div class="router mt-4 w-96 mx-auto p-5 rounded border border-gray-300">
      <div class="title font-bold text-left mb-3">Router:</div>
      <p>
        <el-button type="primary" size="small" @click="$router.push({ name: 'Admin' })">
          To Admin
        </el-button>
      </p>
    </div>

    <div class="iconify mt-4 w-96 mx-auto p-5 rounded border border-gray-300">
      <div class="title font-bold text-left mb-3">Iconfiy:</div>
      <p>
        <app-icon icon="mdi:account-circle" />
        <app-icon icon="ion:search" class="text-lg" />
      </p>
    </div>
  </div>
  <!--  <div class="front w-screen h-screen mx-auto">-->
  <!--  </div>-->
</template>

<style lang="scss" scoped></style>
