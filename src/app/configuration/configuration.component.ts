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

  constructor(private configurationService: ConfigurationService) {}

  ngOnInit(): void {
    this.getConfiguration();
  }

  getConfiguration(): void {
    this.configurationService.getConfigurations().subscribe((config) => {
      this.existingConfiguration = config;
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

  handleSubmit(form: any): void {
    if (!form.valid) return;

    this.isSubmitting = true;

    setTimeout(() => {
      this.saveConfiguration();
    }, 1000); // Short delay for animation effect
  }

  saveConfiguration(): void {
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
}
