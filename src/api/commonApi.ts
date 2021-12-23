import useHttp from '@/api/useHttp';
import type { BasicResp } from '@/api/types';
import exp from 'constants';

export interface IWeatherData {
  errNo: string;
  data: IData;
}

export interface IData {
  weather: IWeather;
}

export interface IWeather {
  setting: ISetting;
  content: IContent;
}

export interface ISetting {
  city: string;
}

export interface IContent {
  week: string;
  city: string;
  today: IToday;
  tomorrow: ITomorrow;
  thirdday: IThirdday;
  fourthday: IFourthday;
  fifthday: IFifthday;
  linkseven: string;
  source: ISource;
  cityname: string;
  calendar: ICalendar;
  currenttemp: string;
  pslink: string;
  weatherType: string;
  isauto: boolean;
  ipcity: string;
  province: string;
}

export interface IToday {
  time: string;
  date: string;
  img: string[];
  condition: string;
  wind: string;
  temp: string;
  link: string;
  imgs: IImgs;
  pm25: string;
  pollution: string;
  pm25url: string;
}

export interface IImgs {
  0: string;
  1: string;
}

export interface ITomorrow {
  time: string;
  date: string;
  img: string[];
  condition: string;
  wind: string;
  temp: string;
  link: string;
  imgs: IImgs;
  pm25: string;
  pollution: string;
  pm25url: string;
}

export interface IThirdday {
  time: string;
  date: string;
  img: string[];
  condition: string;
  wind: string;
  temp: string;
  link: string;
  imgs: IImgs;
  pm25: string;
  pollution: string;
  pm25url: string;
}

export interface IFourthday {
  time: string;
  date: string;
  img: string[];
  condition: string;
  wind: string;
  temp: string;
  link: string;
  imgs: IImgs;
}

export interface IFifthday {
  time: string;
  date: string;
  img: string[];
  condition: string;
  wind: string;
  temp: string;
  link: string;
  imgs: IImgs;
}

export interface ISource {
  name: string;
  url: string;
}

export interface ICalendar {
  time: string;
  lunar: string;
  festival: boolean;
  weatherSourceUrl: string;
}
export const reqWeather = (city: string) => {
  return useHttp<BasicResp<string>>({
    url: `/weather/v1?city=${encodeURIComponent(city)}`,
    method: 'get',
  });
};

export const reqNews = () => {
  return useHttp<BasicResp<string>>({
    url: `/news/v1`,
    method: 'get',
  });
};

export interface ILatestLink {
  id: number;
  icon: string;
  box_id: number;
  link: string;
  title: string;
  item_order: number;
  description: string;
  created_at: string;
}

export const reqLatestLinks = (userID: number, n = 15) => {
  return useHttp<BasicResp<ILatestLink[]>>({
    url: `link/v1/latest/${userID}?count=${n}`,
    method: 'get',
  });
};
export interface IStatisticsData {
  no_read_msg: number;
}

export const reqStatisticsInfo = () => {
  return useHttp<BasicResp<IStatisticsData>>({
    url: `/statistics/auth/v1/all`,
    method: 'get',
  });
};
