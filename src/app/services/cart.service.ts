import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

export interface CartItem {
  menuItemId: number;
  menuItemName: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);

  // Public observable for cart items
  cartItems$ = this.cartItemsSubject.asObservable();

  // Derived observables for item count and price total as cart updates
  itemCount$: Observable<number> = this.cartItems$.pipe(
    map((items: CartItem[]) => items.reduce((count, item) => count + item.quantity, 0))
  );

  totalPrice$: Observable<number> = this.cartItems$.pipe(
    map((items: CartItem[]) => items.reduce((total, item) => total + (item.price * item.quantity), 0))
  );

  get currentItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  addItemToCart(item: Omit<CartItem, 'quantity'>): void {
    const curItems = this.currentItems;
    const existingItemIndex = curItems.findIndex(i => i.menuItemId === item.menuItemId);

    if (existingItemIndex > -1) {
      // If item already exists, update quantity
      const updatedItems = curItems.map((cartItem, index) => 
        index === existingItemIndex 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      );
      this.cartItemsSubject.next(updatedItems);
    } else {
      // New Item, add to cart with quantity 1
      this.cartItemsSubject.next([...curItems, { ...item, quantity: 1 }]);
    }
  }

  removeItemFromCart(menuItemId: number): void {
    const updatedItems = this.currentItems.filter(i => i.menuItemId !== menuItemId);
    this.cartItemsSubject.next(updatedItems);
  }

  decrementItemQuantity(menuItemId: number): void {
    const curItems = this.currentItems;
    const existingItemIndex = curItems.findIndex(i => i.menuItemId === menuItemId);

    if (existingItemIndex > -1) {
      const existingItem = curItems[existingItemIndex];
      if (existingItem.quantity === 1) {
        this.removeItemFromCart(menuItemId);
      } else {
        const updatedItems = curItems.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
        this.cartItemsSubject.next(updatedItems);
      }
    }
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }
}
