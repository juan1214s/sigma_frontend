export interface CustomerCreateDto {
  name: string;
  email: string;
  phone: string;
  address: AddressDto;
  pay: PaymentDto;
}

export interface AddressDto {
  street: string;
  city: string;
  country: string;
}

export interface PaymentDto {
  paymentMethod: PaymentMethod;
  amount: number;
  authorized: boolean;
}

export enum PaymentMethod {
  Card = 0,
  Deposit = 1,
}
