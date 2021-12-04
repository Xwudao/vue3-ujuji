export interface BasicResp<T> {
  code: number;
  data: T;
  msg: string;
}
export interface ListResp<T> {
  code: number;
  data: {
    total: number;
    list: T[];
  };
  msg: string;
}
