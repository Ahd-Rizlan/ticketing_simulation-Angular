import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from './configuration.service';

import { FormsModule } from '@angular/forms';
import { Configuration } from './configuration.model';

@Component({
  selector: 'app-configuration',
  imports: [CommonModule, FormsModule],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css',
})
export class ConfigurationComponent implements OnInit {
  constructor(private ConfigurationService: ConfigurationService) {}

  newConfiguration: Configuration = {
    id: '1',
    totalTickets: 0,
    maxTicketCapacity: 0,
    ticketReleaseRate: 0,
    customerRetrievalRate: 0,
  };

  responceMessage: string = '';

  isSuccessful: boolean = false;

  ConfigurationList: Configuration[] = [];

  editConfiguration: Configuration | null = null;

  deletedConfiguration: Configuration | null = null;

  updatedConfiguration: Configuration = {
    id: '1',
    totalTickets: 0,
    maxTicketCapacity: 0,
    ticketReleaseRate: 0,
    customerRetrievalRate: 0,
  };

  ngOnInit() {
    this.getAllConfigurations();
    console.log('Configuration List:', this.updatedConfiguration);
  }

  //default pre-setting Values
  //creating a new method  which returnss nothing and calls the createConfiguration method from the ConfigurationService to create new Configuration
  //createdConfiguration is the out put from http request which wait and took by subscribe method
  //and resetted the newConfiguration object to default values
  createConfiguration() {
    this.ConfigurationService.createConfiguration(
      this.newConfiguration
    ).subscribe((createdConfiguration) => {
      this.newConfiguration = {
        id: '1',
        totalTickets: 0,
        maxTicketCapacity: 0,
        ticketReleaseRate: 0,
        customerRetrievalRate: 0,
      };
      this.isSuccessful = true;
      this.responceMessage = `Configuration  created successfully!  
                                   Mavimum Event Tickets: ${createdConfiguration.totalTickets}, 
                                   Maximum Pool Capacity: ${createdConfiguration.maxTicketCapacity},
                                   Ticket Release Rate: ${createdConfiguration.ticketReleaseRate},
                                   Customer Retrieval Rate: ${createdConfiguration.customerRetrievalRate}.`;
      this.ConfigurationList.push(createdConfiguration);
    });
  }

  getAllConfigurations() {
    this.ConfigurationService.getAllConfigurations().subscribe(
      (Configurations) => {
        this.ConfigurationList = this.ConfigurationList.concat(Configurations);
      }
    );
  }

  //editing the Configuration
  editConfigurationDetails(Configuration: Configuration) {
    this.editConfiguration = Configuration; //assigning the Configuration to editConfiguration
    this.updatedConfiguration = { ...Configuration }; //copy of old Configuration to updatedConfiguration
  }

  // updateConfiguration(): void {
  //   if (this.editConfiguration) {
  //     this.ConfigurationService.updateConfiguration(
  //       this.editConfiguration.id,
  //       this.updatedConfiguration
  //     ).subscribe((updatedConfiguration) => {
  //       const idConfiguration = this.ConfigurationList.findIndex(
  //         (Configuration) => Configuration.id === updatedConfiguration.id
  //       );
  //       if (idConfiguration !== -1) {
  //         this.ConfigurationList[idConfiguration] = updatedConfiguration;
  //         //close Form
  //       }

  //       this.editConfiguration = null;
  //       this.isSuccessful = true;
  //       this.responceMessage = `Configuration  created successfully!
  //                                  Mavimum Event Tickets: ${updatedConfiguration.totalTickets},
  //                                  Maximum Pool Capacity: ${updatedConfiguration.maxTicketCapacity},
  //                                  Ticket Release Rate: ${updatedConfiguration.ticketReleaseRate},
  //                                  Customer Retrieval Rate: ${updatedConfiguration.customerRetrievalRate}.`;
  //       // this.getAllConfigurations();
  //     });
  //   }
  // }
  cancelEdit() {
    this.editConfiguration = null;
    this.updatedConfiguration = {
      id: '1',
      totalTickets: 0,
      maxTicketCapacity: 0,
      ticketReleaseRate: 0,
      customerRetrievalRate: 0,
    };
  }

  deleteConfiguration(ConfigurationId: any) {
    if (confirm('Are you sure you want to delete this Configuration?')) {
      this.ConfigurationService.deleteConfiguration(ConfigurationId).subscribe(
        () => {
          this.ConfigurationList = this.ConfigurationList.filter(
            (Configuration) => Configuration.id !== ConfigurationId
          );
          if (
            this.editConfiguration &&
            this.editConfiguration.id === ConfigurationId
          ) {
            this.cancelEdit();
          }
        }
      );
      this.deletedConfiguration = null;
      this.isSuccessful = true;
      this.responceMessage = `Configuration ID: ${ConfigurationId} deleted successfully!`;
    }
  }
}
