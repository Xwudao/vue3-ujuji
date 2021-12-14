import useHttp from '@/api/useHttp';
import type { BasicResp } from '@/api/types';
import type { IBoxesData } from '@/api/siteApi';

const reqPwdBox = (userID: number, pwd: string) => {
  return useHttp<BasicResp<IBoxesData>>({
    url: `box/v1/box/${userID}/pwd/${pwd}`,
    method: 'get',
  });
};

export { reqPwdBox };
