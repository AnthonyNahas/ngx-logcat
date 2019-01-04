import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import sdk from '@stackblitz/sdk';
import {Logcat} from 'ngx-logcat';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private titleService: Title,
              public logcat: Logcat) {
  }

  ngOnInit() {
    this.titleService.setTitle('Home | ngx-logcat');
    this.logcat
      .t('HOME_COMPONENT')
      .log('HomeComponent has been just initialized');
    this.logcat
      .t('DEBUGGING')
      .d('This is another debug log', 123, 'are my favorite numbers');
  }

  editOnStackBlitz() {
    sdk.openGithubProject('AnthonyNahas/ngx-logcat/tree/master/demo');
  }

}
