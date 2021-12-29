import useHttp from '@/api/useHttp';
import type { BasicResp } from '@/api/types';
export interface IRegisterData {
  verify_id: string;
  verify_code: string;
  username: string;
  email: string;
  email_verify: string;
  password: string;
}
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
const reqUserRegister = (params: IRegisterData) => {
  return useHttp<BasicResp<null>>({
    url: `/user/v1`,
    method: 'post',
    data: { ...params },
  });
};
///user/auth/v1/token/refresh
const reqRefreshToken = () => {
  return useHttp<BasicResp<{ token: string }>>({
    url: `/user/auth/v1/token/refresh`,
    method: 'post',
  });
};
///user/auth/v1/avatar

// const reqUploadUserAvatar = () => {
//   return useHttp({
//     url: `/user/auth/v1/avatar`,
//     method: 'post',
//   });
// };
export { reqUserLogin, reqRefreshToken, reqUserRegister };
