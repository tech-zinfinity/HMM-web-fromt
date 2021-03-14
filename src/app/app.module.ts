import { JWTInterceptorService } from './interceptor/jwtinterceptor.service';
import { environment } from 'src/environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from '../app/module/material/material.module';
import { AdminpanelComponent } from './components/Admin/adminpanel/adminpanel.component';
import { AdminTabsComponent } from './components/admin-tabs/admin-tabs.component';
import { AddHotelsComponent } from './components/add-hotels/add-hotels.component';
import { HomeComponent } from './components/home/home.component';
import { ViewCustomersComponent } from './components/view-customers/view-customers.component';
import { VendorMainComponent } from './components/vendor-main/vendor-main.component';
import { VendorViewMenuComponent } from './components/vendor-view-menu/vendor-view-menu.component';
import { VendorViewOrderComponent } from './components/vendor-view-order/vendor-view-order.component';
import { LoginComponent } from './components/login/login.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { ConfirmPasswordComponent } from './components/confirm-password/confirm-password.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//DB
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireModule } from "@angular/fire/";
import { AngularFireStorageModule } from "@angular/fire/storage";

@NgModule({
  declarations: [
    AppComponent,
    AdminpanelComponent,
    AdminTabsComponent,
    AddHotelsComponent,
    HomeComponent,
    ViewCustomersComponent,
    VendorMainComponent,
    VendorViewMenuComponent,
    VendorViewOrderComponent,
    LoginComponent,
    ProgressBarComponent,
    ConfirmPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JWTInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
