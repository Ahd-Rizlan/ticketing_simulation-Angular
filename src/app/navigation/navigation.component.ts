import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  customersCount = 0;

  constructor(private router: Router) {}

  goToVendors() {
    this.router.navigate(['/vendor']);
  }

  goToCustomers() {
    this.router.navigate(['/customer']);
    this.customersCount = 5; // Example: Set based on customer form submission.
  }

  goToNext() {
    alert('Next step initiated!'); // Replace with actual navigation logic.
  }
}
