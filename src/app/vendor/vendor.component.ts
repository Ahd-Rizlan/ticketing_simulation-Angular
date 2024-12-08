import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VendorService } from './vendor.service';
import { Vendor } from './vendor.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vendor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.css',
})
export class VendorComponent implements OnInit {
  constructor(private vendorService: VendorService) {}

  newVendor: Vendor = { frequency: 0, ticketsPerRelease: 0 };

  responseMessage: string = '';
  isSuccessful: boolean = false;
  vendorList: Vendor[] = [];
  editVendor: Vendor | null = null;
  updatedVendor: Vendor = { frequency: 0, ticketsPerRelease: 0 };

  ngOnInit() {
    this.getAllVendors();
  }

  //default pre-setting Values
  //creating a new method  which returnss nothing and calls the createVendor method from the vendorService to create new vendor
  //createdVendor is the out put from http request which wait and took by subscribe method
  //and resetted the newVendor object to default values
  createVendor() {
    this.vendorService
      .createVendor(this.newVendor)
      .subscribe((createdVendor) => {
        this.newVendor = { frequency: 0, ticketsPerRelease: 0 };
        this.isSuccessful = true;
        this.responseMessage = `Vendor ID: created successfully!  
                                   Tickets per release: ${createdVendor.ticketsPerRelease}, 
                                   Frequency: ${createdVendor.frequency} seconds.`;
        this.vendorList.push(createdVendor);
      });
  }

  getAllVendors() {
    this.vendorService.getAllVendors().subscribe((vendors) => {
      this.vendorList = vendors;
    });
  }

  //editing the vendor
  editVendorDetails(vendor: Vendor) {
    this.editVendor = vendor; //assigning the vendor to editVendor
    this.updatedVendor = { ...vendor }; //copy of old vendor to updatedVendor
  }

  updateVendor(): void {
    if (this.editVendor) {
      this.vendorService
        .updateVendor(this.editVendor.vendorId!, this.updatedVendor)
        .subscribe((updatedVendor) => {
          const idVendor = this.vendorList.findIndex(
            (Vendor) => Vendor.vendorId === updatedVendor.vendorId
          );
          if (idVendor !== -1) {
            this.vendorList[idVendor] = updatedVendor;
            //close Form
          }

          this.editVendor = null;
          this.isSuccessful = true;
          this.responseMessage = `Vendor ID: ${updatedVendor.vendorId} updated successfully! 
                                   Tickets per release: ${updatedVendor.ticketsPerRelease}, 
                                   Frequency: ${updatedVendor.frequency} seconds.`;
          // this.getAllVendors();
        });
    }
  }
  cancelEdit() {
    this.editVendor = null;
    this.updatedVendor = { frequency: 0, ticketsPerRelease: 0 };
  }

  deleteVendor(vendorId: any) {
    if (confirm('Are you sure you want to delete this vendor?')) {
      this.vendorService.deleteVendor(vendorId).subscribe(() => {
        this.vendorList = this.vendorList.filter(
          (vendor) => vendor.vendorId !== vendorId
        );
        if (this.editVendor && this.editVendor.vendorId === vendorId) {
          this.cancelEdit();
        }
      });
      this.isSuccessful = true;
      this.responseMessage = `Vendor ID: ${vendorId} deleted successfully!`;
    }
  }
}
