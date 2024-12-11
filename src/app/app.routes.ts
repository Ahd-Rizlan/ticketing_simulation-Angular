import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent } from './configuration/configuration.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CustomerComponent } from './customer/customer.component';
import { VendorComponent } from './vendor/vendor.component';

export const routes: Routes = [
  { path: '', component: ConfigurationComponent },
  { path: 'navigation', component: NavigationComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'vendor', component: VendorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
