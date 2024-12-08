import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService } from './customer.service';
import { Customer } from './customer.model';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent implements OnInit {
  constructor(private CustomerService: CustomerService) {}

  newCustomer: Customer = {
    isVip: false,
    ticketsPerPurchase: 0,
    retrievalInterval: 0,
  };

  responseMessage: string = '';
  isSuccessful: boolean = false;
  customerList: Customer[] = [];
  editCustomer: Customer | null = null;
  updatedCustomer: Customer = {
    isVip: false,
    ticketsPerPurchase: 0,
    retrievalInterval: 0,
  };

  ngOnInit() {
    this.getAllCustomers();
  }

  createCustomer() {
    this.CustomerService.createCustomer(this.newCustomer).subscribe(
      (createdCustomer) => {
        this.newCustomer = {
          isVip: false,
          ticketsPerPurchase: 0,
          retrievalInterval: 0,
        };
        this.isSuccessful = true;
        this.responseMessage = `Customer ID: created successfully!  
                                   Tickets per purchase: ${createdCustomer.ticketsPerPurchase}, 
                                   Retrieval interval: ${createdCustomer.retrievalInterval} seconds.`;
        this.customerList.push(createdCustomer);
      }
    );
  }

  getAllCustomers() {
    this.CustomerService.getAllCustomers().subscribe((customers) => {
      this.customerList = customers;
    });
  }

  editCustomerDetails(customer: Customer) {
    this.editCustomer = customer;
    this.updatedCustomer = { ...customer };
  }

  updateCustomer(): void {
    if (this.editCustomer) {
      this.CustomerService.updateCustomer(
        this.editCustomer.customerId!,
        this.updatedCustomer
      ).subscribe((updatedCustomer) => {
        const idCustomer = this.customerList.findIndex(
          (Customer) => Customer.customerId === updatedCustomer.customerId
        );
        this.customerList[idCustomer] = updatedCustomer;
        this.isSuccessful = true;
        this.responseMessage = `Customer ID: ${updatedCustomer.customerId} updated successfully!`;
      });
    }
  }

  cancelEdit() {
    this.editCustomer = null;
    this.updatedCustomer = {
      isVip: false,
      ticketsPerPurchase: 0,
      retrievalInterval: 0,
    };
  }

  deleteCustomer(customerId: any) {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.CustomerService.deleteCustomer(customerId).subscribe(() => {
        this.customerList = this.customerList.filter(
          (customer) => customer.customerId !== customerId
        );
        if (this.editCustomer && this.editCustomer.customerId === customerId) {
          this.cancelEdit();
        }
      });
      this.isSuccessful = true;
      this.responseMessage = `Customer ID: ${customerId} deleted successfully!`;
    }
  }
}
