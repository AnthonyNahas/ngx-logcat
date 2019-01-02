import {Inject, Injectable} from '@angular/core';
import {Level, NgxLogcatConfig, NgxLogcatToken} from '../ngx-logcat.module';

@Injectable()
export class Logcat {

  constructor(@Inject(NgxLogcatToken) public config: NgxLogcatConfig) {
  }

  canLog(level: Level): boolean {
    return this.config.level >= level;
  }


  d() {

  }

  log(value: any, ...rest: any[]) {
    if (this.config.enable) {
      console.log(value, ...rest);
    }
  }

  debug(value: any, ...rest: any[]) {
    if (this.canLog(Level.DEBUG)) {
      console.debug(value, ...rest);
    }
  }

  error(error: Error) {
    // this.errorHandler.handleError(error);
  }

  warn(value: any, ...rest: any[]) {
    console.warn(value, ...rest);
  }

}
