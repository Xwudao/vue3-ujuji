<script lang="ts" setup="setup">
  import useSiteConfig from '@/hooks/api/useSiteConfig';
  import { computed } from 'vue';

  const { siteConfig } = useSiteConfig();
  // siteSettings.background_image
  const bgImg = computed(() => {
    console.log(siteConfig.value?.background_image);
    return `url('${siteConfig.value?.background_image}')`;
  });
</script>

<template>
  <div class="front">
    <div class="bg-wrapper">
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .front {
    @apply h-full w-full;
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
</style>
