import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
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
  withMethods((store, inventoryService = inject(InventoryService)) => ({
    loadAlbums: rxMethod<void>(
      pipe(
        tap(() => store.setLoading()),
        switchMap(() => inventoryService.getAlbums()),
        tap((albums) => patchState(store, { albums })),
        tap(() => store.setLoaded())
      )
    ),
  })),
  withHooks({
    onInit(store) {
      store.loadAlbums();
    },
  })
);
