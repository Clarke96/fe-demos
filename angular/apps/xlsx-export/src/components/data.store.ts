import { computed } from '@angular/core';
import { Album, ARTISTS } from '@database';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

interface DataState {
  _albums: Album[];
}

const initialState: DataState = {
  _albums: [],
};

export const DataStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    dataSource: computed(() =>
      store._albums().map((album) => ({
        ...album,
        artist: album.artist.name,
      }))
    ),
  })),
  withMethods((store) => ({
    loadAlbums: () => {
      const allData = ARTISTS;
      const allAlbums = allData.reduce((acc: Album[], artist) => [...acc, ...artist.albums], []);
      patchState(store, { _albums: allAlbums });
    },
  })),
  withHooks((store) => ({ onInit: () => store.loadAlbums() }))
);
