import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { OrderStatus } from '../../../models/order-status.enum';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.scss'
})
export class StatusBadgeComponent {
  @Input() status!: OrderStatus;
}
