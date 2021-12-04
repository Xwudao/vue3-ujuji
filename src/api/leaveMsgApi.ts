import useHttp from '@/api/useHttp';
import type { ListResp } from '@/api/types';

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
