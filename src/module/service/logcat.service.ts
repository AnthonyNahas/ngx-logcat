import {Inject, Injectable} from '@angular/core';
import {Level, NgxLogcatConfig, NgxLogcatToken} from '../ngx-logcat.module';

@Injectable()
export class Logcat {

  _tag: String;

  constructor(@Inject(NgxLogcatToken) public config: NgxLogcatConfig) {
  }

  private _canLog(level: Level): boolean {
    return this.config.level >= level && this.config.enable;
  }

  t(tag: string) {
    return this.tag(tag);
  }

  tag(tag: string) {
    this._tag = tag;
    return this;
  }


  d() {
    return this.debug(null);
  }

  debug(value: any, ...rest: any[]) {
    if (this._canLog(Level.DEBUG)) {
      console.debug(value, ...rest);
    }
    return this;
  }

  log(value: any, ...rest: any[]) {
    if (this.config.enable) {
      console.log(value, ...rest);
    }
    return this;
  }

  error(error: Error) {
    // this.errorHandler.handleError(error);
  }

  warn(value: any, ...rest: any[]) {
    console.warn(value, ...rest);
  }

  clear() {
    console.clear();
    return this;
  }
}
