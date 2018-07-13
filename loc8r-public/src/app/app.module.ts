import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { HomeListComponent } from './home-list/home-list.component';
import { DistancePipe } from './distance.pipe';

@NgModule({
  declarations: [
    HomeListComponent,
    DistancePipe
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [HomeListComponent] // entry point of the app. make homelist the default component.
})
export class AppModule { }
