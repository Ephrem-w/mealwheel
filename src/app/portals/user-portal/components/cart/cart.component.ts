import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  @Output() closeCart = new EventEmitter<void>();
  promoCode: string = '';
  promoCodeError: string = '';

  constructor(public cartService: CartService) {}

  onClose(): void {
    this.closeCart.emit();
  }

  updateQuantity(item: any, change: number): void {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      this.cartService.updateQuantity(item.id, newQuantity);
    }
  }

  removeItem(itemId: number): void {
    if (confirm('Are you sure you want to remove this item?')) {
      this.cartService.removeFromCart(itemId);
    }
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart();
    }
  }

  applyPromoCode(): void {
    if (this.promoCode.toLowerCase() === 'welcome20') {
      this.cartService.applyDiscount(20);
      this.promoCodeError = '';
    } else {
      this.promoCodeError = 'Invalid promo code';
    }
  }

  proceedToCheckout(): void {
    console.log('Proceeding to checkout...');
  }

  getItemTotal(price: number, quantity: number): number {
    return price * quantity;
  }
}
