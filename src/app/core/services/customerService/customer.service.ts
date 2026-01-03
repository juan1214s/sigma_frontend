import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  CustomerCreateDto,
  CustomerResponseDto,
} from '../../../shared/models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly baseUrl = `${environment.apiUrl}/customers`;

  constructor(private http: HttpClient) {}

  createCustomer(dto: CustomerCreateDto): Observable<string> {
    return this.http.post<string>(this.baseUrl, dto);
  }

  getCustomerById(id: string): Observable<CustomerResponseDto> {
    return this.http.get<CustomerResponseDto>(`${this.baseUrl}/${id}`);
  }

  changeStatus(id: string, active: boolean): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/status`, { active });
  }
}
