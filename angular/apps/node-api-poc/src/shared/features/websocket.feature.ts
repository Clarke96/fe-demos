import { computed, inject } from '@angular/core';
import { signalStoreFeature, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { WebsocketApiService } from '../services';

interface WebsocketState {
  port: number;
  message: string | null;
}

const initialState: WebsocketState = {
  port: 8080,
  message: null,
};

/**
 * Feature that provides a websocket connection to a given port.
 * @param port The port to connect to. Defaults to 8080.
 */
export const withWebsocket = (port?: number) =>
  signalStoreFeature(
    withState({ ...initialState, ...(port && { port }) }),
    withComputed((_localStore, websocketService = inject(WebsocketApiService)) => ({
      message: computed(() => websocketService.message()),
      connected: computed(() => websocketService.connected()),
    })),
    withMethods((localStore, websocketService = inject(WebsocketApiService)) => ({
      open: () => websocketService.startConnection(localStore.port()),
      close: () => websocketService.close(),
      send: (message: string) => websocketService.sendMessage(message),
    })),
    withHooks((localStore) => ({
      onInit: () => localStore.open(),
      onDestroy: () => localStore.close(),
    }))
  );
