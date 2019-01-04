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
      console.assert(message, ...logs);
    }
    return this;
  }


  d(message: any, ...logs: any[]): Logcat {
    return this.debug(message, ...logs);
  }

  debug(message: any, ...logs: any[]): Logcat {
    if (this.canLog(Level.DEBUG)) {
      this.processLog(Level.DEBUG, message, ...logs);
    }
    return this;
  }

  log(message: any, ...logs: any[]): Logcat {
    if (this.canLog(Level.DEBUG)) {
      this.processLog(Level.LOG, message, ...logs);
    }
    return this;
  }

  i(message: any, ...logs: any[]): Logcat {
    return this.info(message, ...logs);
  }

  info(message: any, ...logs: any[]): Logcat {
    if (this.config.enable) {
      this.processLog(Level.INFO, message, ...logs);
    }
    return this;
  }

  w(message: any, ...logs: any[]) {
    return this.warn(message, ...logs);
  }

  warn(message: any, ...logs: any[]) {
    if (this.config.enable) {
      this.processLog(Level.WARN, message, ...logs);
    }
    return this;
  }

  e(message: any, ...logs: any[]) {
    return this.error(message, ...logs);
  }


  error(message: any, ...logs: any[]) {
    if (this.config.enable) {
      this.processLog(Level.ERROR, message, ...logs);
    }
    return this;
  }

  clear(): Logcat {
    console.clear();
    return this;
  }

  processLog(level: Level, message: any, ...logs: any[]) {
    const timeStamp = new Date();
    console.group(this._tag);

    switch (level) {
      case Level.DEBUG:
        this.processTablesWhenDetected(Level.DEBUG, message);
        console.debug('logs: ', ...logs);
        console.debug('timeStamp: ', timeStamp);
        break;
      case Level.LOG:
        this.processTablesWhenDetected(Level.LOG, message);
        console.log('logs: ', ...logs);
        console.log('timeStamp: ', timeStamp);
        break;
      case Level.INFO:
        console.info('message: ', message);
        console.info('logs: ', ...logs);
        console.info('timeStamp: ', timeStamp);
        break;
      case Level.WARN:
        console.warn('message: ', message);
        console.warn('logs: ', ...logs);
        console.warn('timeStamp: ', timeStamp);
        break;
      case Level.ERROR:
        console.error('message: ', message);
        console.error('logs: ', ...logs);
        console.error('timeStamp: ', timeStamp);
        break;
    }
    console.groupEnd();
  }

  processTablesWhenDetected(level: Level, message: any): void {
    if (this.autoDetectTables(message)) {
      switch (level) {
        case Level.DEBUG:
          console.debug('message: ', 'table has been detected');
          console.table(message);
          break;

        case Level.LOG:
          console.log('message: ', 'table has been detected');
          console.table(message);
          break;
      }
    } else {
      switch (level) {
        case Level.DEBUG:
          console.debug('message: ', message);
          break;
        case Level.LOG:
          console.log('message: ', message);
          break;
      }
    }
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
