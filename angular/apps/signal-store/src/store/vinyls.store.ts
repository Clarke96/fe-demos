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
import { pipe, switchMap, tap } from 'rxjs';
import { VinylService } from '../services';
import { Vinyl, VinylState } from './model';

const initialState: VinylState = {
  vinyls: [],
  filter: { order: 'asc', genre: '', artist: '' },
  loadState: { status: 'idle' },
};

export const VinylsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  // Computed
  withComputed((state) => ({
    getLatestVinyl: computed(() => {
      return state.vinyls().sort((a, b) => a.year - b.year)[0];
    }),
    isLoading: computed(() => state.loadState.status() === 'loading'),
    isLoaded: computed(() => state.loadState.status() === 'loaded'),
  })),
  // Methods
  withMethods((store, vinylService = inject(VinylService)) => ({
    addVinyl: (vinyl: Vinyl): void => {
      patchState(store, (state) => ({ vinyls: [...state.vinyls, vinyl] }));
    },
    removeVinyl: (vinylId: string): void => {
      patchState(store, (state) => ({
        vinyls: state.vinyls.filter((vinyl) => vinyl.id !== vinylId),
      }));
    },
    clearVinyls: (): void => {
      patchState(store, { vinyls: [] });
    },
    downloadCollection: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loadState: { status: 'loading' } })),
        switchMap(() => vinylService.getCollection()),
        tap((vinyls) => patchState(store, { vinyls, loadState: { status: 'loaded' } }))
      )
    ),
  })),
  // Hooks
  withHooks({
    onInit(store) {
      store.downloadCollection();
    },
  })
);
