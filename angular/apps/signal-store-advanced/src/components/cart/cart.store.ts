import { inject } from '@angular/core';
import { signalStore, withComputed, withMethods } from '@ngrx/signals';
import { Store } from '@ngrx/store';
import { UserActions, UserSelectors } from '../../global-store';
import { Item } from '../../models/item';

export const CartStore = signalStore(
  withComputed((_, globalStore = inject(Store)) => ({
    basket: globalStore.selectSignal(UserSelectors.selectBasket),
    totalCost: globalStore.selectSignal(UserSelectors.selectTotalCost),
  })),
  withMethods((_, globalStore = inject(Store)) => ({
    remove: (item: Item) => globalStore.dispatch(UserActions.removeFromCart({ item })),
    clear: () => globalStore.dispatch(UserActions.clearCart()),
  }))
);
