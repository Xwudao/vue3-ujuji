import { onUnmounted, ref } from 'vue';
import Clipboard from 'clipboard';

const useCopy = (
  cb?: (cnt: string) => void,
  failCb?: (cnt: string) => void
) => {
  const div = document.createElement('div');
  const text = ref('');
  const clip = new Clipboard(div, {
    text(elem: Element): string {
      return text.value;
    },
    target(elem: Element): Element {
      return div;
    },
  });
  onUnmounted(() => {
    clip?.destroy();
  });
  const copied = ref(false);
  clip.on('success', (e) => {
    if (cb) {
      cb(e.text);
    }
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 1000);
  });
  clip.on('error', (e) => {
    if (failCb) {
      failCb(e.text);
    }
  });
  const copy = (cnt: string) => {
    text.value = cnt;
    div.click();
  };
  return {
    copy,
    copied,
  };
};

export default useCopy;
