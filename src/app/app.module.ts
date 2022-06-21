import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StreamComponent } from './stream/stream.component';
import { WatcherComponent } from './watcher/watcher.component';
import { StreamsComponent } from './streams/streams.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { KeysinputComponent } from './keysinput/keysinput.component';


@NgModule({
  declarations: [
    AppComponent,
    StreamComponent,
    WatcherComponent,
    StreamsComponent,
    KeysinputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
