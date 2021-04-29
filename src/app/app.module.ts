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
import { VendorProfileComponent } from './components/vendor-profile/vendor-profile.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationModesPipe } from './pipes/notification-modes.pipe';
import { HotelStatusPipe } from './pipes/hotel-status.pipe';
import { ConfirmationBoxComponent } from './components/common/confirmation-box/confirmation-box.component';
import { ConfirmationBackgroundColorPipe } from './components/common/confirmation-background-color.pipe';
import { ConfirmationButtonTextPipe } from './components/common/confirmation-button-text.pipe';
import { DynamicFormComponent } from './components/common/dynamic-form/dynamic-form.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { VendorSettingsComponent } from './components/vendor-settings/vendor-settings.component';
import { VendorSupportComponent } from './components/vendor-support/vendor-support.component';
import { VendorRevenueDashboardComponent } from './components/vendor-revenue-dashboard/vendor-revenue-dashboard.component';

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
    ConfirmPasswordComponent,
    VendorProfileComponent,
    NotificationComponent,
    NotificationModesPipe,
    HotelStatusPipe,
    ConfirmationBoxComponent,
    ConfirmationBackgroundColorPipe,
    ConfirmationButtonTextPipe,
    DynamicFormComponent,
    NotFoundComponent,
    VendorSettingsComponent,
    VendorSupportComponent,
    VendorRevenueDashboardComponent
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
    MatNativeDateModule,
    MatMomentDateModule
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JWTInterceptorService,
    multi: true
  }],
  entryComponents:[
    ConfirmationBoxComponent,
    ProgressBarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
