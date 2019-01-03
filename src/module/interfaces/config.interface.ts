import {Level} from '../..';

export interface NgxLogcatConfig {
  enable?: boolean,
  level?: Level
}

export const defaultLogcatConfig: NgxLogcatConfig = {
  enable: true,
  level: 0
};
