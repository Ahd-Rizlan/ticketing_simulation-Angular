import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class logDisplayService {
  apiUrl = 'http://localhost:8080/api';
  constructor(private httpClient: HttpClient) {}

  stopSystem(): Observable<String> {
    return this.httpClient.post<String>(this.apiUrl, '/stopSimulation');
  }

  startSystem(): Observable<String> {
    return this.httpClient.post<String>(this.apiUrl, '/startSimulation');
  }
}
