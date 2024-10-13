import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserSelectors } from '../global-store';

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [MatButtonModule, MatIconModule, MatToolbar, RouterModule],
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        height: max-content;
        min-height: 100%;
        width: 100%;
      }
    `,
  ],
  template: `
    <mat-toolbar class="flex flex-row justify-between !bg-emerald-200">
      <button mat-button routerLink="home">Home</button>

      <div class="px-4">Store credit: €{{ storeCredit() }}</div>
      <button mat-button routerLink="cart">
        <mat-icon>shopping_cart</mat-icon> {{ numberOfItems() }}
      </button>
    </mat-toolbar>
    <div class="p-6 sm:p-10 bg-emerald-50 w-full h-full flex-auto">
      <ng-content />
    </div>
  `,
})
export class ShellComponent {
  store = inject(Store);

  protected readonly numberOfItems = this.store.selectSignal(UserSelectors.selectNumberOfItems);
  protected readonly storeCredit = this.store.selectSignal(UserSelectors.selectCredit);
}
