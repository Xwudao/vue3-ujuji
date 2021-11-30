<script lang="ts" setup="setup">
  import useSiteConfig from '@/hooks/api/useSiteConfig';
  import { computed } from 'vue';

  const { siteConfig } = useSiteConfig();
  // siteSettings.background_image
  const bgImg = computed(() => {
    return `url('${siteConfig.value?.background_image}')`;
  });
  const siteColor = computed(() => {
    return siteConfig.value?.site_name_color || '#fff';
  });
  const boxTitleColor = computed(() => {
    return siteConfig.value?.box_title_color || '#fff';
  });
  const boxLinkColor = computed(() => {
    return siteConfig.value?.box_link_color || '#fff';
  });
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
      <h3 class="font-bold text-3xl">{{ siteConfig.site_name }}</h3>
      <div class="desc mt-3 text-sm">{{ siteConfig.site_desc }}</div>
    </div>

    <!--    box-->

    <div class="boxes">
      <div v-for="i in 10" :key="i" class="box">
        <div class="box-title text-center font-bold text-base">你好</div>
        <div class="box-desc">这是描述</div>
        <div class="box-items">
          <a v-for="m in 40" :key="m" class="box-link" href="#">站站点.点...</a>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>&copy; 2021 &nbsp; Powered By wudao!</p>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
  @import '../assets/styles/mixin';
  .front {
    @apply h-full w-full;
  }

  :global(.front) {
    --site-name-color: v-bind(siteColor);
    --box-title-color: v-bind(boxTitleColor);
    --box-link-color: v-bind(boxLinkColor);
    --box-background-color: v-bind('siteConfig.box_background_color');
    /*box_back_hover_color*/
    /*box_link_hover_color*/
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
  .box-title {
    color: var(--box-title-color);
  }
  .box-link {
    color: var(--box-link-color);
  }
  .boxes {
    @apply mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4;

    .box {
      @apply bg-gray-600 bg-opacity-40 rounded-lg p-3 m-1 transition-all;
      background: var(--box-background-color);
      &:hover {
        background: var(--box-back-hover-color);
      }
    }
    .box-desc {
      @apply text-xs text-center;
      color: var(--box-title-color);
    }
    .box-items {
      @apply flex flex-wrap items-center h-40 overflow-y-auto mt-2 space-y-4 text-sm text-center;
      @include hide-scroll;
    }
    .box-link {
      @apply w-1/3;
      &:hover {
        color: var(--box-link-hover-color);
      }
    }
  }
  .footer {
    @apply text-center my-5;
    color: var(--site-name-color);
  }
</style>
