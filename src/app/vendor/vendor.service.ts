import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vendor } from './vendor.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VendorService {
  apiUrl = 'http://localhost:8080/api/vendor';
  constructor(private httpClient: HttpClient) {}

  getAllVendors(): Observable<Vendor[]> {
    return this.httpClient.get<Vendor[]>(this.apiUrl);
  }
  createVendor(newVendor: Vendor): Observable<Vendor> {
    return this.httpClient.post<Vendor>(this.apiUrl, newVendor);
  }

  updateVendor(vendorId: String, updatedVendor: Vendor): Observable<Vendor> {
    return this.httpClient.put<Vendor>(
      this.apiUrl + '/' + vendorId,
      updatedVendor
    );
  }
  deleteVendor(vendorId: String) {
    return this.httpClient.delete(this.apiUrl + '/' + vendorId);
  }
}
