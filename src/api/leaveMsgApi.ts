import useHttp from '@/api/useHttp';
import type { BasicResp, ListResp } from '@/api/types';

export enum MsgType {
  COMMON,
  FIXED,
}

export interface IMsgData {
  id: number;
  user_id: number;
  fixed: boolean;
  nickname: string;
  content: string;
  read: boolean;
  reply: string;
  created_at: string;
}
export const reqLeaveMsg = (userID: number, msgType: MsgType, page: number, size: number) => {
  return useHttp<ListResp<IMsgData>>({
    url: `leave_msg/v1/${msgType}/${userID}`,
    method: 'get',
    params: { page, size },
  });
};
export interface IReqMsgParam {
  content: string;
  nickname: string;
  verify_str: string;
  verify_id: string;
  code?: number;
  user_id: number;
}
export const reqAddMsg = (p: IReqMsgParam) => {
  return useHttp<BasicResp<null>>({
    url: `/leave_msg/v1`,
    method: 'post',
    data: { ...p },
  });
};

export interface IMsgInfo {
  id: number;
  user_id: number;
  fixed: boolean;
  nickname: string;
  content: string;
  read: boolean;
  reply: string;
  created_at: string;
}
export const reqMsgList = (page: number, size: number) => {
  return useHttp<ListResp<IMsgInfo>>({
    url: `/leave_msg/auth/v1/all?page=${page}&size=${size}`,
    method: 'get',
  });
};
export const reqMsgRead = (id: number) => {
  return useHttp<BasicResp<null>>({
    url: `/leave_msg/auth/v1/read/${id}`,
    method: 'put',
  });
};
// leave_msg/auth/v1/fixed/msg/511/1
export const reqMsgFixed = (id: number, type: MsgType) => {
  return useHttp<BasicResp<null>>({
    url: `/leave_msg/auth/v1/fixed/msg/${id}/${type}`,
    method: 'post',
  });
};
// leave_msg/auth/v1/reply/511
export const reqMsgReply = (id: number, reply: string) => {
  return useHttp<BasicResp<null>>({
    url: `leave_msg/auth/v1/reply/${id}`,
    method: 'put',
    data: { reply },
  });
};
// /leave_msg/auth/v1/user/511
export const reqMsgDelete = (id: number) => {
  return useHttp<BasicResp<null>>({
    url: `/leave_msg/auth/v1/user/${id}`,
    method: 'delete',
  });
};
