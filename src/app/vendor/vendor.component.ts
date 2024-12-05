import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { VendorService } from './vendor.service';
import { Vendor } from './vendor.model';

@Component({
  selector: 'app-vendor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.css',
})
export class VendorComponent {
  constructor(private vendorService: VendorService) {}

  newVendor: Vendor = { frequency: 0, ticketsPerRelease: 0 };
  //default pre-setting Values
  //creating a new method  which returnss nothing and calls the createVendor method from the vendorService to create new vendor
  //createdVendor is the out put from http request which wait and took by subscribe method
  //and resetted the newVendor object to default values
  createVendor() {
    this.vendorService
      .createVendor(this.newVendor)
      .subscribe((createdVendor) => {
        this.newVendor = { frequency: 0, ticketsPerRelease: 0 };
      });
  }
}
