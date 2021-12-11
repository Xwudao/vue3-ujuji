import { computed, onMounted, onUnmounted, ref } from 'vue';
import { debounce } from 'lodash-es';

const useWidth = (maxWidth: number, padding = 15) => {
  const width = ref(maxWidth);
  const strWidth = computed(() => {
    return `${width.value}px`;
  });

  const onSize = debounce(() => {
    const tmpWidth = window.innerWidth;
    if (tmpWidth > maxWidth) {
      width.value = maxWidth;
    } else {
      width.value = tmpWidth - padding;
    }
  }, 100);

  onMounted(() => {
    window.addEventListener('resize', onSize);
    onSize();
  });
  onUnmounted(() => {
    window.removeEventListener('resize', onSize);
  });

  return {
    width,
    strWidth,
  };
};

export default useWidth;
