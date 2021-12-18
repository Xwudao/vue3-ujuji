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

export interface ISendEmailVerifyParams {
  verify_id: string;
  verify_code: string;
  username: string;
  email: string;
  email_verify: string;
  password: string;
}
export const reqEmailVerify = (p: ISendEmailVerifyParams) => {
  return useHttp<BasicResp<null>>({
    url: `/verify/v1/email/reg`,
    method: 'post',
    data: { ...p },
  });
};

export interface IFindPassParams {
  email: string;
  verify_code: string;
  verify_id: string;
}
export const reqFindPassEmailVerify = (p: IFindPassParams) => {
  return useHttp<BasicResp<null>>({
    url: `/verify/v1/email/find_pass`,
    method: 'post',
    data: { ...p },
  });
};

export interface IUpdatePassParams {
  email: string;
  email_code: string;
  verify_code: string;
  password: string;
  verify_id: string;
}
export const reqUpdatePassByEmailVerify = (p: IUpdatePassParams) => {
  return useHttp<BasicResp<null>>({
    url: `/user/v1/update_pass/email`,
    method: 'post',
    data: { ...p },
  });
};
