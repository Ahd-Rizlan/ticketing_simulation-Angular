import { Component, OnInit } from '@angular/core';
import { Configuration } from './configuration.model';
import { ConfigurationService } from './configuration.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-configuration',
  imports: [CommonModule, FormsModule],
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
})
export class ConfigurationComponent implements OnInit {
  configuration: Configuration = {
    totalTickets: 0,
    maxTicketCapacity: 0,
    ticketReleaseRate: 1,
    customerRetrievalRate: 1,
  };

  existingConfiguration: Configuration | null = null;
  isFormValid = false;
  isTotalCapacityValid = true;
  isSubmitting = false;
  configurationsList: Configuration[] = [];

  constructor(private configurationService: ConfigurationService) {}

  ngOnInit(): void {
    this.getConfiguration();
  }

  getConfiguration(): void {
    this.configurationService.getConfigurations().subscribe((config) => {
      this.existingConfiguration = config;
      this.configurationsList.push(config);
    });
  }

  validateForm(): void {
    this.isFormValid =
      this.configuration.totalTickets > 0 &&
      this.configuration.maxTicketCapacity > 0 &&
      this.configuration.ticketReleaseRate > 0 &&
      this.configuration.customerRetrievalRate > 0;

    this.isTotalCapacityValid =
      this.configuration.maxTicketCapacity < this.configuration.totalTickets;
  }

  saveConfiguration(): void {
    this.isSubmitting = true;
    this.configurationService
      .createOrUpdateConfiguration(this.configuration)
      .subscribe(
        (config) => {
          this.existingConfiguration = config;

          this.isSubmitting = false;
        },
        (error) => {
          console.error('Error saving configuration:', error);
          this.isSubmitting = false;
        }
      );
  }
  deleteAllConfigurations(): void {
    this.configurationService.deleteConfiguration().subscribe(
      () => {
        this.existingConfiguration = null;
        this.configurationsList = [];
        this.getConfiguration();
      },
      (error) => {
        console.error('Error deleting configurations:', error);
      }
    );
  }
  goToNextStep() {
    console.log('Navigating to the next step...');
    // Add navigation logic here.
  }
}
