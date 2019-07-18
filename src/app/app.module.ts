import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from "@angular/common/http";

import { AppComponent } from './app.component';
import { MusicDataService } from './service/music.data.service';


@NgModule({
  imports:      [ BrowserModule, FormsModule,  HttpClientModule  ],
  declarations: [ AppComponent  ],
  bootstrap:    [ AppComponent ],
  providers : [ MusicDataService ]
})
export class AppModule { }
