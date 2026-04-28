import { Component, Input } from '@angular/core';
import { ResponseMenuItemDto } from '../../../models/menu.models';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-item-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-item-card.component.html',
  styleUrl: './menu-item-card.component.scss'
})
export class MenuItemCardComponent {

  @Input() menuItem!: ResponseMenuItemDto;

  quantity = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // on init, sync quantity with cart state
    this.cartService.cartItems$.subscribe(items => {
      const cartItem = items.find(item => item.menuItemId === this.menuItem.id);
      this.quantity = cartItem ? cartItem.quantity : 0;
    });
  }

  add(): void {
    this.cartService.addItemToCart({
      menuItemId: this.menuItem.id,
      menuItemName: this.menuItem.name,
      price: this.menuItem.price
    });
  }

  decrement(): void {
    this.cartService.decrementItemQuantity(this.menuItem.id);
  }
}
