import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VendorComponent } from './vendor/vendor.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, VendorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ticketing_simulation';
}
