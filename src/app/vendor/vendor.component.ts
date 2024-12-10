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
  createVendors: number = 0;
  ticketsPerReleaseBySingleVendor: number = 0;
  responseMessage: string = '';
  isSuccessful: boolean = false;

  createVendor() {
    this.vendorService
      .createVendor(
        this.newVendors.numberOfVendors,
        this.newVendors.ticketsPerRelease
      )
      .subscribe((createdVendor) => {
        // Reset the form
        this.newVendors = { numberOfVendors: 0, ticketsPerRelease: 0 };
        this.isSuccessful = true;

        // Set the success message (optional, shown in template)
        this.responseMessage = `Vendor created successfully!  
                             Tickets per release: ${createdVendor.ticketsPerRelease}., 
                             Number of Vendors: ${createdVendor.numberOfVendors}.`;
      });
  }
}
