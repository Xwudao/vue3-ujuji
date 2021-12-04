import useHttp from '@/api/useHttp';
import type { BasicResp } from '@/api/types';

export interface IVerifyData {
  id: string;
  img: string;
}
export const reqVerify = () => {
  return useHttp<BasicResp<IVerifyData>>({
    url: `verify/v1`,
    method: 'get',
  });
};
