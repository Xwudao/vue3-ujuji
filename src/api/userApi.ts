import useHttp from '@/api/useHttp';
import type { BasicResp } from '@/api/types';

export interface ILoginData {
  verify_id: string;
  verify_str: string;
  username: string;
  // email: string;
  password: string;
}

export interface ILoginReturn {
  info: IInfo;
  token: string;
}

export interface IInfo {
  id: number;
  username: string;
  role: string;
  access_token: string;
  email: string;
  avatar: string;
  vip_expiration: string;
}
const reqUserLogin = (params: ILoginData) => {
  return useHttp<BasicResp<ILoginReturn>>({
    url: `user/v1/login`,
    method: 'post',
    data: { ...params },
  });
};
export { reqUserLogin };