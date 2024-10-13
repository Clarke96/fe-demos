import { computed, inject } from '@angular/core';
import { Album, Artist } from '@database';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Store } from '@ngrx/store';
import { pipe, switchMap, tap } from 'rxjs';
import { UserSelectors } from '../../global-store';
import { UserActions } from '../../global-store/user/user.actions';
import { withLoadState } from '../../signal-store-features';
import { InventoryService } from './../../services/inventory.service';

export interface ArtistState {
  artist: Artist | null;
  displayWarning: boolean;
}

export const ArtistStore = signalStore(
  withState<ArtistState>({ artist: null, displayWarning: false }),
  withLoadState(),
  withComputed((_, globalStore = inject(Store)) => ({
    isPriceIssue: computed(() => {
      const userCredit = globalStore.selectSignal(UserSelectors.selectCredit);
      const totalCost = globalStore.selectSignal(UserSelectors.selectTotalCost);
      return userCredit < totalCost;
    }),
  })),
  withMethods(
    (store, inventoryService = inject(InventoryService), globalStore = inject(Store)) => ({
      loadAlbums: rxMethod<string>(
        pipe(
          tap(() => store.setLoading()),
          switchMap((artistId) => inventoryService.getAlbums(artistId)),
          tap((artist) => patchState(store, { artist })),
          tap(() => store.setLoaded())
        )
      ),
      addToCart: (album: Album) => {
        if (album)
          globalStore.dispatch(
            UserActions.addToCart({ item: { id: album.id, name: album.title, price: 10 } })
          );
      },
      closeWarning: () => patchState(store, { displayWarning: false }),
      showWarning: () => patchState(store, { displayWarning: true }),
    })
  )
);
