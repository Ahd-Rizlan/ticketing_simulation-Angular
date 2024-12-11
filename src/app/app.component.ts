import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VendorComponent } from './vendor/vendor.component';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { ConfigurationComponent } from './configuration/configuration.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    VendorComponent,
    CustomerComponent,
    ConfigurationComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ticketing_simulation';
}
