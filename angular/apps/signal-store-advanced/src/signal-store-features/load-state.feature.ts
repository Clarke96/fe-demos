import { computed } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

export interface LoadFeatureState {
  loadState: 'loading' | 'loaded' | 'error' | 'idle';
}

export const withLoadState = () =>
  signalStoreFeature(
    withState<LoadFeatureState>({ loadState: 'idle' }),
    withComputed((state) => ({
      isLoading: computed(() => 'loading' === state.loadState()),
    })),
    withMethods((store) => ({
      setLoading: () => patchState(store, { loadState: 'loading' }),
      setLoaded: () => patchState(store, { loadState: 'loaded' }),
      setError: () => patchState(store, { loadState: 'error' }),
      setIdle: () => patchState(store, { loadState: 'idle' }),
    }))
  );
