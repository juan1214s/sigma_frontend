import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CustomerService } from '../../../core/services/customerService/customer.service';
import { CustomerCreateDto, PaymentMethod } from '../../../shared/models/customer.model';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  templateUrl: './customer-form.component.html',
  imports: [
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
})
export class CustomerFormComponent {
  paymentMethods = PaymentMethod;

  userForm: FormGroup;
  addressForm: FormGroup;
  paymentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });

    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });

    this.paymentForm = this.fb.group({
      paymentMethod: [PaymentMethod.Card, Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      authorized: [false, Validators.requiredTrue],
    });
  }

  submit(): void {
    const dto: CustomerCreateDto = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
      address: this.addressForm.value,
      pay: this.paymentForm.value,
    };

    this.customerService.createCustomer(dto).subscribe({
      next: (id) => alert(`Cliente creado con ID: ${id}`),
      error: () => alert('Error al crear cliente'),
    });
  }
}
