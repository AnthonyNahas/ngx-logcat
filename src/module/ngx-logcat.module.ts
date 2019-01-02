import {CommonModule} from '@angular/common';
import {NgModule, ModuleWithProviders, InjectionToken} from '@angular/core';

import {LibComponent} from './component/lib.component';
import {Logcat} from './service/logcat.service';
import {defaultLogcatConfig, NgxLogcatConfig} from './interfaces/config.interface';

// Export module's public API
export {LibComponent} from './component/lib.component';
export {Logcat} from './service/logcat.service';
export {Level} from './enum/level.enum';
export {defaultLogcatConfig, NgxLogcatConfig} from './interfaces/config.interface';

export const NgxLogcatToken = new InjectionToken<NgxLogcatConfig>('NgxAuthFirebaseUIConfig');

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [LibComponent],
  declarations: [LibComponent]
})
export class NgxLogcatModule {
  static forRoot(config?: NgxLogcatConfig): ModuleWithProviders {
    // Object.assign(config, defaultLogcatConfig);
    return {
      ngModule: NgxLogcatModule,
      providers:
        [
          Logcat,
          {provide: NgxLogcatToken, useValue: config}
        ]
    };
  }
}
