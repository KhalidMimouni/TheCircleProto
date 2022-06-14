import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StreamComponent } from './stream/stream.component';
import { WatcherComponent } from './watcher/watcher.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: StreamComponent},
  {path: 'stream', pathMatch: 'full', component: WatcherComponent}

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
