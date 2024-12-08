import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VendorComponent } from './vendor/vendor.component';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, VendorComponent, CustomerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ticketing_simulation';
}
