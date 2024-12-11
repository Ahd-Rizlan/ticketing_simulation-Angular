import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from './configuration.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  apiUrl = 'http://localhost:8080/api/configuration"';
  constructor(private httpClient: HttpClient) {}

  createConfiguration(
    newConfiguration: Configuration
  ): Observable<Configuration> {
    return this.httpClient.post<Configuration>(this.apiUrl, newConfiguration);
  }

  getAllConfigurations(): Observable<Configuration> {
    return this.httpClient.get<Configuration>(this.apiUrl);
  }

  updateConfiguration(
    ConfigurationId: String,
    updatedConfiguration: Configuration
  ): Observable<Configuration> {
    return this.httpClient.put<Configuration>(
      this.apiUrl + '/' + ConfigurationId,
      updatedConfiguration
    );
  }

  deleteConfiguration(ConfigurationId: String) {
    return this.httpClient.delete(this.apiUrl + '/' + ConfigurationId);
  }
}
