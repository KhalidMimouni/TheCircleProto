import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StreamComponent } from './stream/stream.component';
import { WatcherComponent } from './watcher/watcher.component';
import { StreamsComponent } from './streams/streams.component';
import { KeysinputComponent } from './keysinput/keysinput.component';
const routes: Routes = [
  {path: '', pathMatch: 'full', component: StreamsComponent},
  {path: 'broadcast', pathMatch: 'full', component: StreamComponent},
  {path: 'stream/:id', pathMatch: 'full', component: WatcherComponent},
  {path: 'keys', pathMatch: 'full', component: KeysinputComponent}

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
