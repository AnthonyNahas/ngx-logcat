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

  it('should not detect tables - an array that contains only objects',
    inject([Logcat], (logcat: Logcat) => {
      const objsArray = [
        {name: 'Anthony', age: 25, perk: 'Ghost'},
        {name: 'Elie', age: 39, perk: 'Scavenger'},
        {name: 'Unknown', age: 0, perk: 'Unknown'},
      ];
      expect(logcat.autoDetectTables([1, 2, 4, 5, 5, 6])).toBeFalsy();
      expect(logcat.autoDetectTables([1, 2, 'a', '1as', 4])).toBeFalsy();
      expect(logcat.autoDetectTables(['a', '1as'])).toBeFalsy();
      expect(logcat.autoDetectTables([1, 2, 3, objsArray])).toBeFalsy();
    }));

  it('should detect tables - an array that contains only objects',
    inject([Logcat], (logcat: Logcat) => {
      const objsArray = [
        {name: 'Anthony', age: 25, perk: 'Ghost'},
        {name: 'Elie', age: 39, perk: 'Scavenger'},
        {name: 'Unknown', age: 0, perk: 'Unknown'},
      ];
      expect(logcat.autoDetectTables(objsArray)).toBeTruthy();
      expect(logcat.autoDetectTables([[1, 2, 3], objsArray])).toBeTruthy();
      expect(logcat.autoDetectTables([[1, 2, 3], [4, 5, 6]])).toBeTruthy();
    }));

});
