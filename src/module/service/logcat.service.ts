import {Inject, Injectable} from '@angular/core';
import {Level, NgxLogcatConfig, NgxLogcatToken} from '../ngx-logcat.module';

@Injectable()
export class Logcat {

  _tag: String;

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


  d(): Logcat {
    return this.debug(null);
  }

  debug(value: any, ...rest: any[]): Logcat {
    if (this.canLog(Level.DEBUG)) {
      console.debug(value, ...rest);
    }
    return this;
  }

  log(value: any, ...rest: any[]): Logcat {
    if (this.config.enable) {
      console.log(value, ...rest);
    }
    return this;
  }

  i(): Logcat {
    return this.info(null);
  }

  info(value: any, ...rest: any[]): Logcat {
    if (this.config.enable) {
      console.log(value, ...rest);
    }
    return this;
  }

  w() {

  }

  warn(value: any, ...rest: any[]) {
    console.warn(value, ...rest);
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
}
