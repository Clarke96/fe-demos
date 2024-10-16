import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Store } from '@ngrx/store';
import { pipe, switchMap, tap } from 'rxjs';
import { UserActions, UserSelectors } from '../../global-store';
import { Album } from '../../models';
import { InventoryService } from '../../services/inventory.service';
import { withLoadState } from '../../signal-store-features';

interface HomeState {
  albums: Album[];
}

const initialState: HomeState = {
  albums: [],
};

export const HomeStore = signalStore(
  withState(initialState),
  withLoadState(),
  withComputed((_store, globalStore = inject(Store)) => ({
    _credit: globalStore.selectSignal(UserSelectors.selectCredit),
    _basketPrice: computed(() => {
      const basket = globalStore.selectSignal(UserSelectors.selectBasket)();
      return basket.reduce((acc, item) => item.price * item.quantity + acc, 0);
    }),
  })),
  withComputed((store) => ({
    basketPriceGreaterThanCredit: computed(() => store._credit() < store._basketPrice()),
  })),
  withMethods(
    (store, inventoryService = inject(InventoryService), globalStore = inject(Store)) => ({
      loadAlbums: rxMethod<void>(
        pipe(
          tap(() => store.setLoading()),
          switchMap(() => inventoryService.getAlbums()),
          tap((albums) => patchState(store, { albums })),
          tap(() => store.setLoaded())
        )
      ),
      addToBasket: (album: Album) => {
        const item = { id: album.id, name: album.title, price: 5, quantity: 1 };
        globalStore.dispatch(UserActions.addToBasket({ item }));
      },
    })
  ),
  withHooks({
    onInit(store) {
      store.loadAlbums();
    },
  })
);
