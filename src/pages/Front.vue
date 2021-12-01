<script lang="ts" setup="setup">
  import useSiteConfig, { useSiteBoxes } from '@/hooks/api/useSiteConfig';
  import { computed, ref, toRef, watch } from 'vue';
  import FrontSearchBox from '@/components/front/FrontSearchBox.vue';
  import FrontBoxes from '@/components/front/FrontBoxes.vue';
  import FrontFooter from '@/components/front/FrontFooter.vue';

  const { siteConfig } = useSiteConfig();
  // siteSettings.background_image
  const bgImg = computed(() => {
    return `url('${siteConfig.value?.background_image}')`;
  });
  const userID = ref(-1);
  watch(
    () => siteConfig.value.user_id,
    (id) => {
      userID.value = id || -1;
    }
  );
  const { boxes } = useSiteBoxes(userID);
</script>

<template>
  <div class="front">
    <div class="bg-wrapper" />

    <!--      header-->
    <div class="headers flex justify-between">
      <div class="left"><span>[厦门] 晴转多云 22℃</span></div>
      <div class="right">
        <ul class="flex space-x-2">
          <li><a href="#">新闻</a></li>
          <li><a href="#">留言</a></li>
          <li><a href="#">最新</a></li>
          <li><a href="#">设置</a></li>
        </ul>
      </div>
    </div>
    <!--      title-->
    <div class="title text-center mt-8">
      <h3 class="font-bold text-4xl">{{ siteConfig.site_name }}</h3>
      <div class="desc mt-6 text-sm">{{ siteConfig.site_desc }}</div>
    </div>

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
