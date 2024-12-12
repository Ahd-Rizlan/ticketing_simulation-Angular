import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ButtonsService {
  private apiUrl = 'http://localhost:8080/api/configuration';

  constructor(private http: HttpClient) {}

  StopSimulation(): Observable<any> {
    return this.http.post<any>(this.apiUrl, '/StopSimulation');
  }
  StartSimulation(): Observable<any> {
    return this.http.post<any>(this.apiUrl, '/StartSimulation');
  }
}
