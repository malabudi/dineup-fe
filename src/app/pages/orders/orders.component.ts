import { Component } from '@angular/core';
import { ResponseOrderDto } from '../../models/order.models';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { StatusBadgeComponent } from '../../components/ui/status-badge/status-badge.component';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from "../../components/ui/button/button.component";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent, RouterLink, ButtonComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  orders: ResponseOrderDto[] = [];
  loading = true;
  error = false;

  constructor(
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderService.getMyOrders().subscribe({
      next: (orders) => {
        // Sort orders by orderDate in descending order (newest first)
        this.orders = orders.sort((a, b) => 
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      );
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load orders', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  trackByOrderId(index: number, order: ResponseOrderDto): number {
    return order.id;
  }
}
