import {TestBed, inject} from '@angular/core/testing';

import {Logcat} from './logcat.service';
import {NgxLogcatToken} from '../ngx-logcat.module';
import {Level} from '../enum/level.enum';

describe('Logcat Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Logcat,
        {provide: NgxLogcatToken, useValue: {enable: true, level: Level.VERBOSE}}]
    });
  });

  it('should create service', inject([Logcat], (service: Logcat) => {
    expect(service).toBeTruthy();
  }));

});
