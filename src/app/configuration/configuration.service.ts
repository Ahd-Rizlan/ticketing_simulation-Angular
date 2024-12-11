import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from './configuration.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private apiUrl = 'http://localhost:8080/api/configuration';

  constructor(private http: HttpClient) {}

  getConfigurations(): Observable<Configuration> {
    return this.http.get<Configuration>(this.apiUrl);
  }

  createOrUpdateConfiguration(
    config: Configuration
  ): Observable<Configuration> {
    return this.http.post<Configuration>(this.apiUrl, config, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  updateConfiguration(config: Configuration): Observable<Configuration> {
    return this.http.put<Configuration>(this.apiUrl, config, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  deleteConfiguration(): Observable<string> {
    return this.http.delete<string>(this.apiUrl);
  }
}
