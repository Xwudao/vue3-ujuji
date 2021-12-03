<script lang="ts" setup="setup">
  import useSiteSettings from '@/store/hooks/useSiteSettings';
  import { watch } from 'vue';

  const siteSettings = useSiteSettings();
  watch(
    () => {
      return siteSettings.site_name;
    },
    () => {
      console.log(siteSettings);
    }
  );
</script>

<template>
  <div class="title text-center mt-8">
    <h3 class="font-bold text-4xl">{{ siteSettings.$state.site_name }}</h3>
    <!--    <h3 class="font-bold text-4xl">{{ siteSettings.$state.site_name }}</h3>-->
    <!--    <h3 class="font-bold text-4xl">{{ refSettings.site_name }}</h3>-->
    <div class="desc mt-6 text-sm">{{ siteSettings.$state.site_desc }}</div>
  </div>
</template>

<style lang="scss" scoped></style>
