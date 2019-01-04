import {Inject, Injectable} from '@angular/core';
import {Level, NgxLogcatConfig, NgxLogcatToken} from '../ngx-logcat.module';

@Injectable()
export class Logcat {

  _tag: String = 'Logcat';

  constructor(@Inject(NgxLogcatToken) public config: NgxLogcatConfig) {
  }

  canLog(level: Level): boolean {
    return this.config.level <= level && this.config.enable;
  }

  t(tag: string): Logcat {
    return this.tag(tag);
  }

  tag(tag: string): Logcat {
    this._tag = tag;
    return this;
  }

  assert(message: boolean, ...logs: any[]): Logcat {
    if (this.canLog(Level.ASSERT)) {
      console.debug(message, ...logs);
    }
    return this;
  }


  d(message: any, ...logs: any[]): Logcat {
    return this.debug(message, ...logs);
  }

  debug(message: any, ...logs: any[]): Logcat {
    if (this.canLog(Level.DEBUG)) {
      const timeStamp = new Date();
      console.group(this._tag);
      console.debug('message: ', message);
      console.debug('logs: ', ...logs);
      console.debug('timeStamp: ', timeStamp);
      console.groupEnd();
    }
    return this;
  }

  log(message: any, ...logs: any[]): Logcat {
    if (this.config.enable) {
      console.log(message, ...logs);
    }
    return this;
  }

  i(): Logcat {
    return this.info(null);
  }

  info(message: any, ...logs: any[]): Logcat {
    if (this.config.enable) {
      console.log(message, ...logs);
    }
    return this;
  }

  w() {

  }

  warn(message: any, ...logs: any[]) {
    console.warn(message, ...logs);
  }

  e() {

  }

  error(error: Error) {
    // this.errorHandler.handleError(error);
  }

  clear(): Logcat {
    console.clear();
    return this;
  }

  autoDetectTables(value: any): boolean {
    if (Array.isArray(value)) {
      const noObjs = value.filter(item =>
        typeof item === 'object' && item !== null
      );
      return noObjs.length > 0 && noObjs.length === value.length;
    }
    return false;
  }
}
