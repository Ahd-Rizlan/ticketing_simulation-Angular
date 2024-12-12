import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonsService } from './buttons.service'; // Ensure correct import path

// import { CustomerService } from './customer.service';

@Component({
  selector: 'app-Button',
  standalone: true,
  providers: [ButtonsService],
  imports: [CommonModule, FormsModule],
  templateUrl: './buttons.component.html',
})
export class ButtonComponent {
  constructor(private buttonsService: ButtonsService) {}

  stopSimulation() {
    console.log('Simulation stopped!');
    this.buttonsService.StopSimulation();
  }
  startSimulation() {
    this.buttonsService.StartSimulation();
    console.log('Simulation started!');
  }
}
