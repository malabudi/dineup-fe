import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem, CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-drawer.component.html',
  styleUrl: './cart-drawer.component.scss'
})
export class CartDrawerComponent {

  cartItems$!: Observable<CartItem[]>;
  totalPrice$!: Observable<number>;
  isDrawerOpen$!: Observable<boolean>;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartService.cartItems$;
    this.totalPrice$ = this.cartService.totalPrice$;
    this.isDrawerOpen$ = this.cartService.isDrawerOpen$;
  }

  incrementItemQuantity(item: CartItem): void {
    this.cartService.addItemToCart({
      menuItemId: item.menuItemId,
      menuItemName: item.menuItemName,
      price: item.price
    });
  }

  decrementItemQuantity(item: CartItem): void {
    this.cartService.decrementItemQuantity(item.menuItemId);
  }

  removeItem(item: CartItem): void {
    this.cartService.removeItemFromCart(item.menuItemId);
  }

  closeDrawer(): void {
    this.cartService.closeDrawer();
  }

  proceedToCheckout(): void {
    this.closeDrawer();
    this.router.navigate(['/checkout']);
  }

  trackByItemId(index: number, item: CartItem): number {
    return item.menuItemId;
  }
}
