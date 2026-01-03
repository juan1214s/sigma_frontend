import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';

import { CustomerService } from '../../../core/services/customerService/customer.service';
import { CustomerCreateDto, PaymentMethod } from '../../../shared/models/customer.model';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css',
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

  @ViewChild(MatStepper) stepper!: MatStepper;

  private fb = inject(FormBuilder);
  private customerService = inject(CustomerService);

  paymentMethods = PaymentMethod;
  loading = false;

  userForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
  });

  addressForm: FormGroup = this.fb.group({
    street: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
  });

  paymentForm: FormGroup = this.fb.group({
    paymentMethod: [PaymentMethod.Card, Validators.required],
    amount: [null, [Validators.required, Validators.min(1)]],
    authorized: [false, Validators.requiredTrue],
  });

submit(): void {
  if (this.userForm.invalid || this.addressForm.invalid || this.paymentForm.invalid) {
    Swal.fire({
      icon: 'warning',
      title: 'Incomplete form',
      text: 'Please complete all required fields before submitting.',
    });
    return;
  }

  const dto: CustomerCreateDto = {
    name: this.userForm.value.name,
    email: this.userForm.value.email,
    phone: this.userForm.value.phone,
    address: this.addressForm.value,
    pay: this.paymentForm.value,
  };

  Swal.fire({
    title: 'Creating customer...',
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
  });

  this.customerService.createCustomer(dto).subscribe({
    next: (id) => {
      Swal.fire({
        icon: 'success',
        title: 'Customer created',
        text: `Customer created.`,
      });

      this.resetForms();
      this.stepper.reset(); 
    },
    error: () => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Unable to create customer',
      });
    },
  });
}

  private resetForms(): void {
    this.userForm.reset();
    this.addressForm.reset();
    this.paymentForm.reset({
      paymentMethod: PaymentMethod.Card,
      authorized: false,
    });
  }
}
