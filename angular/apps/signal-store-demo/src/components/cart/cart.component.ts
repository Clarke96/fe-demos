import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartStore } from './cart.store';

@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [MatButtonModule, MatIconModule],
  providers: [CartStore],
  template: `
    <div class="flex flex-row justify-center align-center gap-4">
      <span class="text-xl">Cart</span><mat-icon>shopping_cart</mat-icon>
    </div>
    @if(cartStore.basket().length) {
    <table class="w-3/5 mt-20 ml-auto mr-auto table-fixed">
      @for (item of cartStore.basket(); track item.id) {
      <tr>
        <td class="w-1/8 p-2">{{ item.name }} ({{ item.quantity }})</td>
        <td class="w-5/8 text-right p-2">€{{ item.price * item.quantity }}</td>
        <td class="w-1/4 p-2 text-center">
          <button mat-icon-button (click)="cartStore.remove(item)">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </tr>
      }
      <tr class="border-t border-t-emerald-900 p-2 pt-4 mt-4">
        <td class="p-2">Total cost:</td>
        <td class="p-2 text-right">€{{ cartStore.totalCost() }}</td>
        <td class="p-2 text-center">
          <button mat-icon-button (click)="cartStore.clear()">
            <mat-icon>delete_outline</mat-icon>
          </button>
        </td>
      </tr>
    </table>

    } @else {
    <p class="text-center pt-10">Your cart is empty.</p>
    }
  `,
})
export class CartComponent {
  protected readonly cartStore = inject(CartStore);
}
