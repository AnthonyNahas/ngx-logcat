import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  NgxLogcatModule  } from 'ngx-logcat';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
    imports: [
        CommonModule,
        NgxLogcatModule.forRoot(),
        HomeRoutingModule,
    ],
    declarations: [HomeComponent],
})
export class HomeModule { }
