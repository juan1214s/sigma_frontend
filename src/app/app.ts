import { Component, signal } from '@angular/core';
import { CustomerFormComponent } from "./features/customer/customer-form.component/customer-form.component";

@Component({
  selector: 'app-root',
  imports: [ CustomerFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('technical_test_sigma_frontend');
}
