<script lang="ts" setup="setup">
  import { computed } from 'vue';
  import FrontSearchBox from '@/components/front/FrontSearchBox.vue';
  import FrontBoxes from '@/components/front/FrontBoxes.vue';
  import FrontFooter from '@/components/front/FrontFooter.vue';
  import useSiteData from '@/hooks/app/useSiteData';
  import FrontHeader from '@/components/front/FrontHeader.vue';
  import FrontTitle from '@/components/front/FrontTitle.vue';

  const { boxes, siteConfig } = useSiteData();

  // const { siteConfig } = useSiteConfig();
  // siteSettings.background_image
  const bgImg = computed(() => {
    return `url('${siteConfig.value?.background_image}')`;
  });
</script>

<template>
  <div class="front">
    <div class="bg-wrapper" />

    <!--      header-->
    <front-header />
    <!--      title-->
    <front-title />

    <front-search-box />

    <!--    box-->
    <front-boxes :boxes="boxes" />

    <!--    footer-->
    <front-footer />
  </div>
</template>

<style lang="scss" scoped>
  @import '../assets/styles/mixin';
  .front {
    @apply h-full w-full;
  }

  :global(.front) {
    --site-name-color: v-bind('siteConfig.site_name_color');
    --box-title-color: v-bind('siteConfig.box_title_color');
    --box-link-color: v-bind('siteConfig.box_link_color');
    --box-background-color: v-bind('siteConfig.box_background_color');
    --box-link-hover-color: v-bind('siteConfig.box_link_hover_color');
    --box-back-hover-color: v-bind('siteConfig.box_back_hover_color');
  }

  .bg-wrapper {
    opacity: 0.8;
    z-index: -10;
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-attachment: fixed;
    background-size: cover;
    background-position: 50%;
    min-height: 100vh;
    background-image: v-bind(bgImg);

    :before {
      content: ' ';
      position: fixed;
      z-index: -10;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-position: center 0;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  .headers {
    color: var(--site-name-color);
  }

  .title {
    color: var(--site-name-color);
  }
</style>
