import {inject, TestBed} from '@angular/core/testing';

import {Logcat} from './logcat.service';
import {Level, NgxLogcatConfig, NgxLogcatToken} from '../ngx-logcat.module';

describe('Logcat Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Logcat,
        {provide: NgxLogcatToken, useValue: {enable: true, level: Level.ALL}}]
    });
  });

  it('should create service', inject([Logcat], (logcat: Logcat) => {
    expect(logcat).toBeTruthy();
  }));

  it('should canlog methods validate the configuration',
    inject([Logcat, NgxLogcatToken], (logcat: Logcat, config: NgxLogcatConfig) => {
      expect(logcat.canLog(config.level)).toBeTruthy();
    }));

  it('should not log when level is set to OFF',
    inject([Logcat, NgxLogcatToken], (logcat: Logcat, config: NgxLogcatConfig) => {
      config.level = Level.OFF;
      expect(logcat.canLog(Level.DEBUG)).toBeFalsy();
      expect(logcat.canLog(Level.LOG)).toBeFalsy();
      expect(logcat.canLog(Level.INFO)).toBeFalsy();
      expect(logcat.canLog(Level.WARN)).toBeFalsy();
      expect(logcat.canLog(Level.ERROR)).toBeFalsy();
    }));

  it('should only log errors when level is only set to ERROR',
    inject([Logcat, NgxLogcatToken], (logcat: Logcat, config: NgxLogcatConfig) => {
      config.level = Level.ERROR;
      expect(logcat.canLog(Level.DEBUG)).toBeFalsy();
      expect(logcat.canLog(Level.LOG)).toBeFalsy();
      expect(logcat.canLog(Level.INFO)).toBeFalsy();
      expect(logcat.canLog(Level.WARN)).toBeFalsy();
      expect(logcat.canLog(Level.ERROR)).toBeTruthy();
    }));

  it('should log anything when level is only set to ALL or DEBUG',
    inject([Logcat, NgxLogcatToken], (logcat: Logcat, config: NgxLogcatConfig) => {
      config.level = Level.ALL;
      expect(logcat.canLog(Level.DEBUG)).toBeTruthy();
      expect(logcat.canLog(Level.LOG)).toBeTruthy();
      expect(logcat.canLog(Level.INFO)).toBeTruthy();
      expect(logcat.canLog(Level.WARN)).toBeTruthy();
      expect(logcat.canLog(Level.ERROR)).toBeTruthy();

      config.level = Level.DEBUG;
      expect(logcat.canLog(Level.DEBUG)).toBeTruthy();
      expect(logcat.canLog(Level.LOG)).toBeTruthy();
      expect(logcat.canLog(Level.INFO)).toBeTruthy();
      expect(logcat.canLog(Level.WARN)).toBeTruthy();
      expect(logcat.canLog(Level.ERROR)).toBeTruthy();
    }));
});
