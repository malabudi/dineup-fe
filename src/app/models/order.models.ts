import { OrderStatus } from './order-status.enum';

export interface RequestLineItemDto {
  menuItemId: number;
  quantity: number;
}

export interface CreateOrderDto {
  items: RequestLineItemDto[];
}

export interface ResponseLineItemDto {
  id: number;
  orderId: number;
  menuItemId: number;
  menuItemName: string;
  quantity: number;
  price: number;
  lineTotal: number;
}

export interface ResponseOrderDto {
  id: number;
  customerId: number;
  customerName: string;
  items: ResponseLineItemDto[];
  orderDate: string;
  status: OrderStatus;
  total: number;
}

export interface UpdateOrderStatusDto {
  orderId: number;
  orderStatus: OrderStatus;
}