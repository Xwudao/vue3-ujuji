<script lang="ts" setup="setup"></script>

<template>
  <div class="card shadow bg-white rounded p-1">
    <div class="title p-2 border-b border-gray-100 pb-1 mb-1 font-bold text-base">
      <slot name="title" />
    </div>
    <div class="cnt p-2">
      <slot name="cnt" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
