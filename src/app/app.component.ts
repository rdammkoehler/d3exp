import {AfterContentInit, Component, Input} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  onCreated(created: boolean) {
    console.log('created = ' + created);
  }
}
