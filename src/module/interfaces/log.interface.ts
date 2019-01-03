import {Level} from '../..';

export interface Log {
  message: any | any[],
  timeStamp: Date,
  tag?: string;
  level?: Level
}
