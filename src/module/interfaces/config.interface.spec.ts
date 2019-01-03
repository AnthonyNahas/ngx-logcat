import {TestBed, inject} from '@angular/core/testing';

import {mergeDefaultConfig, NgxLogcatConfig, NgxLogcatToken, defaultLogcatConfig} from '../ngx-logcat.module';
import {Level} from '../enum/level.enum';

describe('NgxLogcatConfig without provider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: []
    });
  });

  it('should not create config per default and throw DI error', () => {
    expect(() => {
      TestBed.get(NgxLogcatToken);
    }).toThrow();
  });

});

describe('NgxLogcatConfig with provider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: NgxLogcatToken, useValue: {enable: false, level: Level.DEBUG}}
      ]
    });
  });

  it('should create config per default', inject([NgxLogcatToken], (config: NgxLogcatConfig) => {
    expect(config).toBeTruthy();
  }));

  it('should logcat be enabled and level = ALL', inject([NgxLogcatToken], (config: NgxLogcatConfig) => {
    expect(config.enable).toBeFalsy();
    expect(config.level).toEqual(Level.DEBUG)
  }));
});

describe('NgxLogcatConfig with optional args - only enable', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: NgxLogcatToken, useValue: {enable: true}}
      ]
    });
  });

  it('should logcat be enabled and level = ALL', inject([NgxLogcatToken], (config: NgxLogcatConfig) => {
    mergeDefaultConfig(config);
    expect(config.enable).toBeTruthy();
    expect(config.level).toEqual(Level.ALL)
  }));
});

describe('NgxLogcatConfig with default config obj', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: NgxLogcatToken, useValue: defaultLogcatConfig}
      ]
    });
  });

  it('should logcat be enabled and level = ALL with using and providing the default config obj', inject([NgxLogcatToken], (config: NgxLogcatConfig) => {
    mergeDefaultConfig(config);
    expect(config.enable).toBeTruthy();
    expect(config.level).toEqual(Level.ALL)
  }));
});

describe('NgxLogcatConfig with empty config', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: NgxLogcatToken, useValue: {}}
      ]
    });
  });

  it('should logcat be enabled and level = ALL without using and providing the default value', inject([NgxLogcatToken], (config: NgxLogcatConfig) => {
    mergeDefaultConfig(config);
    expect(config.enable).toBeTruthy();
    expect(config.level).toEqual(Level.ALL)
  }));
});
