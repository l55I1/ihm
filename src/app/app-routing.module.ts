import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import {MapComponent} from "./map/map.component";
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path : 'map', component:MapComponent },
  { path: 'home', component: HomepageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
