import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import sdk from '@stackblitz/sdk';
import {Logcat} from 'ngx-logcat';
import {MockData} from './data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data = MockData;

  constructor(private titleService: Title,
              public logcat: Logcat) {
  }

  ngOnInit() {
    this.titleService.setTitle('Home | ngx-logcat');

    this.logcat
      .t('TABLE - Auto detection')
      .d(this.data);

    this.logcat
      .t('HOME_COMPONENT')
      .log('HomeComponent has been just initialized');

    this.logcat
      .t('INFO_LOG')
      .i('Here is a info log');

    this.logcat
      .t('WARN_LOG')
      .w('Here is a warning log');

    this.logcat
      .t('DEBUGGING')
      .d('This is another debug log', 123, 'are my favorite numbers');


    const error = new Error('Error occurred');

    this.logcat
      .t('ERROR - StackTrace')
      .e(error, error.stack);
  }

  editOnStackBlitz() {
    sdk.openGithubProject('AnthonyNahas/ngx-logcat/tree/master/demo');
  }

}
