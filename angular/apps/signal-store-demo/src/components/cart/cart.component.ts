import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CartStore } from './cart.store';

@Component({
  standalone: true,
  selector: 'app-cart',
  providers: [CartStore, MatButtonModule],
  template: `
    <h1 class="text-lg py-4">Cart</h1>
    @if(cartStore.basket().length) {
    <ul>
      @for (item of cartStore.basket(); track item.id) {
      <li>{{ item.name }} - €{{ item.price }}</li>
      }
    </ul>

    <h2 class="text-lg py-4">Total cost: €{{ cartStore.totalCost() }}</h2>
    <button mat-button (click)="cartStore.clear()">Clear Cart</button>
    } @else {
    <p>Your cart is empty.</p>
    }
  `,
})
export class CartComponent {
  protected readonly cartStore = inject(CartStore);
}
