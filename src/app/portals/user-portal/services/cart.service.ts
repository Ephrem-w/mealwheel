import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  restaurant: string;
  image: string;
  customization?: {
    size?: string;
    extras?: string[];
    specialInstructions?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private discount = new BehaviorSubject<number>(0);

  cartItems$ = this.cartItems.asObservable();
  discount$ = this.discount.asObservable();

  addToCart(item: CartItem): void {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find((i) => i.id === item.id);

    if (existingItem) {
      // Update quantity if item exists
      this.updateQuantity(item.id, existingItem.quantity + 1);
    } else {
      // Add new item
      this.cartItems.next([...currentItems, { ...item, quantity: 1 }]);
    }
  }

  removeFromCart(itemId: number): void {
    const currentItems = this.cartItems.value;
    this.cartItems.next(currentItems.filter((item) => item.id !== itemId));
  }

  updateQuantity(itemId: number, quantity: number): void {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    );
    this.cartItems.next(updatedItems);
  }

  clearCart(): void {
    this.cartItems.next([]);
    this.discount.next(0);
  }

  getTotal(): Observable<number> {
    return this.cartItems$.pipe(
      map((items) =>
        items.reduce((total, item) => total + item.price * item.quantity, 0)
      )
    );
  }

  getTotalWithDiscount(): Observable<number> {
    return this.getTotal().pipe(
      map((total) => {
        const discountAmount = (total * this.discount.value) / 100;
        return total - discountAmount;
      })
    );
  }

  applyDiscount(percentage: number): void {
    this.discount.next(percentage);
  }

  getItemCount(): Observable<number> {
    return this.cartItems$.pipe(
      map((items) => items.reduce((count, item) => count + item.quantity, 0))
    );
  }

  // Method to check if an item exists in cart
  isItemInCart(itemId: number): Observable<boolean> {
    return this.cartItems$.pipe(
      map((items) => items.some((item) => item.id === itemId))
    );
  }

  // Method to get specific item quantity
  getItemQuantity(itemId: number): Observable<number> {
    return this.cartItems$.pipe(
      map((items) => {
        const item = items.find((i) => i.id === itemId);
        return item ? item.quantity : 0;
      })
    );
  }

  // Method to update item customization
  updateItemCustomization(itemId: number, customization: any): void {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.map((item) =>
      item.id === itemId
        ? {
            ...item,
            customization: {
              size: customization.size,
              extras: customization.extras,
              specialInstructions: customization.specialInstructions,
            },
          }
        : item
    );
    this.cartItems.next(updatedItems);
  }
}
