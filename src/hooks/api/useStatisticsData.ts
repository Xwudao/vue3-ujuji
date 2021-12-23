import { ref } from 'vue';
import { reqStatisticsInfo } from '@/api/commonApi';
import { OK_CODE } from '@/app/keys';

const useStatisticsData = () => {
  const unReadMsg = ref(0);

  const refresh = () => {
    reqStatisticsInfo().then(({ data, code }) => {
      if (code === OK_CODE) {
        unReadMsg.value = data.no_read_msg;
      }
    });
  };
  refresh();
  return {
    unReadMsg,
    refresh,
  };
};

export default useStatisticsData;
