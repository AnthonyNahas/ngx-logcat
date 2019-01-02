import { Component } from '@angular/core';

@Component({
  selector: 'my-lib-component',
  templateUrl: './lib.component.html',
  styleUrls: ['./lib.component.scss']
})
export class LibComponent {
  description = 'Ngx-logcat is an angular open source library for logging and debugging purposes';
}
