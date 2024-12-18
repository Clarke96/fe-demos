import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { UserApiService, withWebsocket } from '../../shared';

interface OperatorState {
  standardOut: string;
  callState: 'idle' | 'pending' | 'success' | { error: string };
}

const initialState: OperatorState = {
  standardOut: 'empty',
  callState: 'idle',
};

export const OperatorStore = signalStore(
  withState(initialState),
  withWebsocket(8080),
  withComputed((localStore) => ({
    isPending: computed(() => localStore.callState() === 'pending'),
    stringifiedWebsocketMessage: computed(() => JSON.stringify(localStore.message(), null, 2)),
  })),
  withMethods((localStore, userService = inject(UserApiService)) => ({
    sendWebsocketMessage: () => {
      localStore.send('Hello from Angular!');
    },
    getUsers: rxMethod<void>(
      pipe(
        tap(() => patchState(localStore, { callState: 'pending' })),
        switchMap(() => userService.getUsers()),
        tapResponse(
          (data) => {
            patchState(localStore, {
              standardOut: JSON.stringify(data, null, 2),
              callState: 'success',
            });
          },
          (error: HttpErrorResponse) => {
            patchState(localStore, { callState: { error: error.message } });
            console.error(error);
          }
        )
      )
    ),
    getWelcome: rxMethod<void>(
      pipe(
        tap(() => patchState(localStore, { callState: 'pending' })),
        switchMap(() => userService.getWelcome()),
        tapResponse(
          (data) => {
            patchState(localStore, {
              standardOut: JSON.stringify(data, null, 2),
              callState: 'success',
            });
          },
          (error: HttpErrorResponse) => {
            patchState(localStore, { callState: { error: error.message } });
            console.error(error);
          }
        )
      )
    ),
  }))
);
