<script lang="ts" setup="setup"></script>

<template>
  <div class="wrapper h-screen w-screen text-center p-10">
    <div class="front w-96 mx-auto p-5 rounded border border-gray-300">
      <div class="font-bold text-lg text-gray-700">Admin Page</div>
    </div>

    <div class="router mt-4 w-96 mx-auto p-5 rounded border border-gray-300">
      <p>
        <el-button type="primary" size="small" @click="$router.push({ name: 'Front' })">
          To Front
        </el-button>
      </p>
    </div>
  </div>
  <!--  <div class="front w-screen h-screen mx-auto">-->
  <!--  </div>-->
</template>

<style lang="scss" scoped></style>
