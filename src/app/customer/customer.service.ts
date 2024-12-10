import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = 'http://localhost:8080/api';
  constructor(private httpClient: HttpClient) {}

  createCustomer(
    NumberOFCustomers: number,
    TicketsPerPurchase: number,
    isVip: boolean
  ): Observable<any> {
    const formData = new FormData();
    formData.append('NumberOFCustomers', NumberOFCustomers.toString());
    formData.append('TicketsPerPurchase', TicketsPerPurchase.toString());
    formData.append('isVip', isVip.toString());

    return this.httpClient.post<any>(
      this.apiUrl + '/createCustomers',
      formData
    );
  }
}
