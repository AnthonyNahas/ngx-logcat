import {Inject, Injectable} from '@angular/core';
import {Level, LogKeyCSS, NgxLogcatConfig, NgxLogcatToken} from '../ngx-logcat.module';


@Injectable()
export class Logcat {

  _tag = 'Logcat';

  infoCSS = 'background: #222; color: #bada55';
  warnCSS = 'background: #222; color: #bada55';

  timeStampCSS = `color: #1558c4; font-weight: bold`;


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
    console.group(`%c ${this._tag}`, this.getLogPropertyCSS(LogKeyCSS.TAG));

    switch (level) {
      case Level.DEBUG:
        this.processTablesWhenDetected(Level.DEBUG, message);
        console.debug('% clogs: ', this.getLogPropertyCSS(LogKeyCSS.LOGS), ...logs);
        console.debug('% ctimeStamp: ', this.getLogPropertyCSS(LogKeyCSS.TIMESTAMP), timeStamp);
        break;
      case Level.LOG:
        this.processTablesWhenDetected(Level.LOG, message);
        console.log('%c logs: ', this.getLogPropertyCSS(LogKeyCSS.LOGS), ...logs);
        console.log('%c timeStamp: ', this.getLogPropertyCSS(LogKeyCSS.TIMESTAMP), timeStamp);
        break;
      case Level.INFO:
        console.info('%c message: ', this.getLogPropertyCSS(LogKeyCSS.MESSAGE), message);
        console.info('%c logs: ', this.getLogPropertyCSS(LogKeyCSS.LOGS), ...logs);
        console.info('%c timeStamp: ', this.getLogPropertyCSS(LogKeyCSS.TIMESTAMP), timeStamp);
        break;
      case Level.WARN:
        console.warn('%c message: ', this.getLogPropertyCSS(LogKeyCSS.MESSAGE), message);
        console.warn('%c logs: ', this.getLogPropertyCSS(LogKeyCSS.LOGS), ...logs);
        console.warn('%c timeStamp: ', this.getLogPropertyCSS(LogKeyCSS.TIMESTAMP), timeStamp);
        break;
      case Level.ERROR:
        console.error('%c message: ', this.getLogPropertyCSS(LogKeyCSS.MESSAGE), message);
        console.error('%c logs: ', this.getLogPropertyCSS(LogKeyCSS.LOGS), ...logs);
        console.error('%c timeStamp: ', this.getLogPropertyCSS(LogKeyCSS.TIMESTAMP), timeStamp);
        break;
    }
    console.groupEnd();
  }

  processTablesWhenDetected(level: Level, message: any): void {
    if (this.autoDetectTables(message)) {
      switch (level) {
        case Level.DEBUG:
          console.debug('%c message: ', this.getLogPropertyCSS(LogKeyCSS.MESSAGE), 'table has been detected');
          console.table(message);
          break;

        case Level.LOG:
          console.log('%c message: ', this.getLogPropertyCSS(LogKeyCSS.MESSAGE), 'table has been detected');
          console.table(message);
          break;
      }
    } else {
      switch (level) {
        case Level.DEBUG:
          console.debug('%c message: ', this.getLogPropertyCSS(LogKeyCSS.MESSAGE), message);
          break;
        case Level.LOG:
          console.log('%c message: ', this.getLogPropertyCSS(LogKeyCSS.MESSAGE), message);
          break;
      }
    }
  }

  /**
   * Detect automatically any array that contains only objects to be rendered
   * as a table to the console.
   *
   * @param value - the value to check and detect
   */
  autoDetectTables(value: any): boolean {
    if (Array.isArray(value)) {
      const noObjs = value.filter(item =>
        typeof item === 'object' && item !== null
      );
      return noObjs.length > 0 && noObjs.length === value.length;
    }
    return false;
  }

  getLogPropertyColor(logKey: LogKeyCSS): string {
    switch (logKey) {
      case LogKeyCSS.TAG:
        return '#6612ba';
      case LogKeyCSS.MESSAGE:
        return '#ff599c';
      case LogKeyCSS.LOGS:
        return '#1E8449';
      case LogKeyCSS.TIMESTAMP:
        return '#79D8F0';
    }
  }

  getLogPropertyCSS(logKey: LogKeyCSS): string {
    switch (logKey) {
      case LogKeyCSS.TAG:
        return `color: ${this.getLogPropertyColor(LogKeyCSS.TAG)}; font-weight: bold`;
      case LogKeyCSS.MESSAGE:
        return `color: ${this.getLogPropertyColor(LogKeyCSS.MESSAGE)}; font-weight: bold`;
      case LogKeyCSS.LOGS:
        return `color: ${this.getLogPropertyColor(LogKeyCSS.LOGS)}; font-weight: bold`;
      case LogKeyCSS.TIMESTAMP:
        return `color: ${this.getLogPropertyColor(LogKeyCSS.TIMESTAMP)}; font-weight: bold`;
    }
  }

}
