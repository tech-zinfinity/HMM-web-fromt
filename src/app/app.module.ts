import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from '../app/module/material/material.module';
import { AdminpanelComponent } from './components/Admin/adminpanel/adminpanel.component';
import { AdminTabsComponent } from './components/admin-tabs/admin-tabs.component';
import { AddHotelsComponent } from './components/add-hotels/add-hotels.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminpanelComponent,
    AdminTabsComponent,
    AddHotelsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
