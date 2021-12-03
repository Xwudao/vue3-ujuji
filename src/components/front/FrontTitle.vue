<script lang="ts" setup="setup">
  import useSiteSettingsStore from '@/store/hooks/useSiteSettingsStore';

  const siteSettings = useSiteSettingsStore();
</script>

<template>
  <div class="title text-center mt-8">
    <h3 class="font-bold text-4xl">{{ siteSettings.site_name }}</h3>
    <div class="desc mt-6 text-sm">{{ siteSettings.site_desc }}</div>
  </div>
</template>

<style lang="scss" scoped></style>
