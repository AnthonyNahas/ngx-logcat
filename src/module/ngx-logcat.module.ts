import {CommonModule} from '@angular/common';
import {NgModule, ModuleWithProviders, InjectionToken, Inject} from '@angular/core';

import {Logcat} from './service/logcat.service';
import {defaultLogcatConfig, NgxLogcatConfig} from './interfaces/config.interface';

// Export module's public API
export {Logcat} from './service/logcat.service';
export {Level} from './enum/level.enum';
export {defaultLogcatConfig, NgxLogcatConfig} from './interfaces/config.interface';

export const NgxLogcatToken = new InjectionToken<NgxLogcatConfig>('NgxAuthFirebaseUIConfig');

export function mergeDefaultConfig(config: NgxLogcatConfig) {
  return config === defaultLogcatConfig ? config : Object.assign(config, defaultLogcatConfig);
}

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [],
  declarations: []
})
export class NgxLogcatModule {

  static forRoot(config: NgxLogcatConfig = defaultLogcatConfig): ModuleWithProviders {
    return {
      ngModule: NgxLogcatModule,
      providers:
        [
          Logcat,
          {provide: NgxLogcatToken, useValue: config}
        ]
    };
  }

  constructor(@Inject(NgxLogcatToken) config: NgxLogcatConfig) {
    config = mergeDefaultConfig(config);
  }
}
