import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent {
  constructor(private CustomerService: CustomerService) {}

  responseMessage: string = '';
  isSuccessful: boolean = false;

  newCustomer = {
    NumberOFCustomers: 0,
    TicketsPerPurchase: 0,
    isVip: false,
  };

  createCustomer() {
    this.CustomerService.createCustomer(
      this.newCustomer.NumberOFCustomers,
      this.newCustomer.TicketsPerPurchase,
      this.newCustomer.isVip
    ).subscribe((createdCustomer) => {
      this.newCustomer = {
        isVip: false,
        TicketsPerPurchase: 0,
        NumberOFCustomers: 0,
      };
      this.isSuccessful = true;
      this.responseMessage = `CustomerScreated successfully!`;
      console.log('Customer created successfully!');
    });
  }
}
