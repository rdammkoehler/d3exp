import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MetricBallComponent } from './metric-ball/metric-ball.component';

@NgModule({
  declarations: [
    AppComponent,
    MetricBallComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
