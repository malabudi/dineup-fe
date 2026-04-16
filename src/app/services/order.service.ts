import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  CreateOrderDto,
  ResponseOrderDto,
  UpdateOrderStatusDto
} from '../models/order.models';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly baseUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  // CUSTOMER: place a new order
  createOrder(dto: CreateOrderDto): Observable<ResponseOrderDto> {
    return this.http.post<ResponseOrderDto>(this.baseUrl, dto);
  }

  // CUSTOMER: get their own orders
  getMyOrders(): Observable<ResponseOrderDto[]> {
    return this.http.get<ResponseOrderDto[]>(`${this.baseUrl}/my-orders`);
  }

  // ADMIN: get all orders
  getAllOrders(): Observable<ResponseOrderDto[]> {
    return this.http.get<ResponseOrderDto[]>(this.baseUrl);
  }

  // ADMIN: update order status
  updateOrderStatus(dto: UpdateOrderStatusDto): Observable<ResponseOrderDto> {
    return this.http.patch<ResponseOrderDto>(this.baseUrl, dto);
  }
}