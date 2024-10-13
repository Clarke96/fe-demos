import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { ArtistSlim } from '../../models';
import { InventoryService } from '../../services/inventory.service';
import { withLoadState } from '../../signal-store-features';

interface HomeState {
  artists: ArtistSlim[];
}

const initialState: HomeState = {
  artists: [],
};

export const HomeStore = signalStore(
  withState(initialState),
  withLoadState(),
  withMethods((store, inventoryService = inject(InventoryService)) => ({
    loadArtists: rxMethod<void>(
      pipe(
        tap(() => store.setLoading()),
        switchMap(() => inventoryService.getAllArtists()),
        tap((artists) => patchState(store, { artists })),
        tap(() => store.setLoaded())
      )
    ),
  })),
  withHooks({
    onInit(store) {
      store.loadArtists();
    },
  })
);
