import { reqNews } from '@/api/commonApi';
import { OK_CODE } from '@/app/keys';
import { ref } from 'vue';

const useNews = () => {
  // const
  const news = ref([] as string[]);
  const loading = ref(false);
  const refresh = () => {
    loading.value = true;
    reqNews()
      .then(({ code, data }) => {
        if (code === OK_CODE) {
          try {
            const jsonD = JSON.parse(data) as any;
            const dd = jsonD.data[0].content;
            const div = document.createElement('div');
            div.innerHTML = dd;
            const pTag = div.querySelectorAll('p');
            //length, index 0,1,2,3...
            //沒有数组的方法
            let arr: string[] = [];
            Array.prototype.slice.call(pTag).map((item) => {
              arr.push(item.innerText);
            });
            arr.splice(0, 3);
            news.value = arr;
          } catch (e) {}
        }
      })
      .finally(() => {
        loading.value = false;
      });
  };
  return {
    news,
    refresh,
    loading,
  };
};

export default useNews;
