import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VendorService } from './vendor.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vendor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.css',
})
export class VendorComponent {
  constructor(private vendorService: VendorService) {}

  newVendors = { numberOfVendors: 0, ticketsPerRelease: 0 };
  createVendors: number = 0; // To hold the number of vendors
  ticketsPerReleaseBySingleVendor: number = 0; // To hold the tickets per release
  responseMessage: string = '';
  isSuccessful: boolean = false;

  createVendor() {
    this.vendorService
      .createVendor(
        this.newVendors.numberOfVendors,
        this.newVendors.ticketsPerRelease
      )
      .subscribe((createdVendor) => {
        // Assign the returned data to the local variables
        // Reset the form
        this.newVendors = { numberOfVendors: 0, ticketsPerRelease: 0 };
        this.isSuccessful = true;
        console.log('Vendor created successfully!');
        // Set the success message (optional, shown in template)
        this.responseMessage = `Vendors created successfully!`;
      });
  }
}
