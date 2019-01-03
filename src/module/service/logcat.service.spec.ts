import {TestBed, inject} from '@angular/core/testing';

import {Logcat} from './logcat.service';
import {NgxLogcatConfig, NgxLogcatToken} from '../ngx-logcat.module';
import {Level} from '../enum/level.enum';

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
      expect(logcat.canLog()).toBeTruthy();
    }));

});
