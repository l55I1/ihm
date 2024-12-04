import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './homepage/homepage.component';
import { MapComponent } from './map/map.component';
import {ParkingService} from "./service/parking.service";
import {HttpClientModule} from "@angular/common/http";
import { ParkingListComponent } from './parking-list/parking-list.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    MapComponent,
    ParkingListComponent
  ],
  imports: [
    MatButtonToggleModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ParkingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
