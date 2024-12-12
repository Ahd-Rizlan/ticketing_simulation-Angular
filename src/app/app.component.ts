import { Component } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { VendorComponent } from './vendor/vendor.component';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';

import { ConfigurationComponent } from './configuration/configuration.component';
import { webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterModule,
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
