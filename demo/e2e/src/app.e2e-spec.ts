import { NgxLogcatDemoPage } from './app.po';

describe('ngx-logcat-demo App', () => {
  let page: NgxLogcatDemoPage;

  beforeEach(() => {
    page = new NgxLogcatDemoPage ();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
