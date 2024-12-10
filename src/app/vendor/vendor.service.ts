import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VendorService {
  apiUrl = 'http://localhost:8080/api';
  constructor(private httpClient: HttpClient) {}

  createVendor(
    numOfVendors: number,
    ticketsPerRelease: number
  ): Observable<any> {
    const formData = new FormData();
    formData.append('NumberOFVendors', numOfVendors.toString());
    formData.append('TicketsPerRelease', ticketsPerRelease.toString());

    return this.httpClient.post<any>(this.apiUrl + '/createVendors', formData);
  }
}
