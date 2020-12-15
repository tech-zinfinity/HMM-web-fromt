import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { ConfirmPasswordComponent } from './components/confirm-password/confirm-password.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddHotelsComponent } from './components/add-hotels/add-hotels.component';
import { AdminTabsComponent } from './components/admin-tabs/admin-tabs.component';
import { AdminpanelComponent } from './components/Admin/adminpanel/adminpanel.component';
import { HomeComponent } from './components/home/home.component';
import { VendorMainComponent } from './components/vendor-main/vendor-main.component';
import { VendorViewMenuComponent } from './components/vendor-view-menu/vendor-view-menu.component';
import { VendorViewOrderComponent } from './components/vendor-view-order/vendor-view-order.component';
import { ViewCustomersComponent } from './components/view-customers/view-customers.component';


const routes: Routes = [
  {path:'', component: HomeComponent, children:[
    {path: '', component: AddHotelsComponent},
    {path: 'register', component: AddHotelsComponent},
    {path: 'verify/:email', component: ConfirmPasswordComponent},
    {path:'login', component: LoginComponent, canActivate:[LoginGuard]}
  ]},
  {path:'admin', component:AdminpanelComponent, canActivate:[AuthGuard], children:[
    {path:'', component: AdminTabsComponent},
    {path: 'customers', component: ViewCustomersComponent}
  ]},
  {path:'vendor', component:VendorMainComponent, canActivate:[AuthGuard], children:[
    {path: '', component: VendorViewMenuComponent},
    {path: 'orders', component: VendorViewOrderComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
