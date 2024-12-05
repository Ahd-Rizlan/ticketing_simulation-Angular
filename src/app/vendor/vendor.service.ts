import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vendor } from './vendor.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VendorService {
  apiUrl = 'http://localhost:8080/vendor';
  constructor(private httpClient: HttpClient) {}

  createVendor(newVendor: Vendor): Observable<Vendor> {
    return this.httpClient.post<Vendor>(this.apiUrl, newVendor);
  }
}