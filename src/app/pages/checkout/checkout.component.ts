import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartItem, CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/ui/button/button.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

  cartItems: CartItem[] = [];
  total = 0;
  loading = false;
  errorMessage = '';
  private subscription!: Subscription;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.cartService.cartItems$.subscribe(items => {
      // redirect to menu if no items in cart
      if (items.length === 0) {
        this.router.navigate(['/menu']);
        return;
      }

      this.cartItems = items;
    });

    this.cartService.totalPrice$.subscribe(total => {
      this.total = total;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  placeOrder() {
    this.loading = true;
    this.errorMessage = '';

    const payload = {
      items: this.cartItems.map(item => ({
        menuItemId: item.menuItemId,
        quantity: item.quantity
      }))
    };

    this.orderService.createOrder(payload).subscribe({
      next: () => {
        this.cartService.clearCart();
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Failed to place order. Please try again.';
      }
    })
  }

  trackByItemId(index: number, item: CartItem): number {
    return item.menuItemId;
  }

  goBackToMenu(): void {
  this.router.navigate(['/menu']);
}
}
