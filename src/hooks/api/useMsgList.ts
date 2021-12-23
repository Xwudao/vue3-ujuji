import { watch, ref } from 'vue';
import type { IMsgInfo } from '@/api/leaveMsgApi';
import { MsgType } from '@/api/leaveMsgApi';
import { reqMsgFixed, reqMsgList, reqMsgRead } from '@/api/leaveMsgApi';
import { OK_CODE } from '@/app/keys';

const useMsgList = () => {
  const loading = ref(false);
  const page = ref(1);
  const size = ref(20);
  const msg = ref<IMsgInfo[]>([]);
  const total = ref(0);

  const refresh = () => {
    loading.value = true;
    reqMsgList(page.value, size.value)
      .then(({ data, code }) => {
        if (code === OK_CODE) {
          total.value = data.total;
          msg.value = data.list || [];
        }
      })
      .finally(() => {
        loading.value = false;
      });
  };
  watch(
    [page, size],
    () => {
      refresh();
    },
    { immediate: true }
  );
  const reqRead = (id: number) => {
    reqMsgRead(id).then();
  };
  const handleFixedMsg = (msg: IMsgInfo) => {
    let type = MsgType.COMMON;
    if (!msg.fixed) {
      type = MsgType.FIXED;
    }
    reqMsgFixed(msg.id, type).finally(() => {
      refresh();
    });
  };
  const handlePageChanged = (n: number) => {
    page.value = n;
  };
  return {
    handleFixedMsg,
    reqRead,
    loading,
    handlePageChanged,
    page,
    size,
    refresh,
    total,
    msg,
  };
};

export default useMsgList;
