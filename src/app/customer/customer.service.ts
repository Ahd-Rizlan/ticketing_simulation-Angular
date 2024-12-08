import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from './customer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = 'http://localhost:8080/api/customer';
  constructor(private httpClient: HttpClient) {}

  getAllCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.apiUrl);
  }
  createCustomer(newCustomer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(this.apiUrl, newCustomer);
  }
  updateCustomer(
    customerId: String,
    updatedCustomer: Customer
  ): Observable<Customer> {
    return this.httpClient.put<Customer>(
      this.apiUrl + '/' + customerId,
      updatedCustomer
    );
  }
  deleteCustomer(customerId: String) {
    return this.httpClient.delete(this.apiUrl + '/' + customerId);
  }
}
