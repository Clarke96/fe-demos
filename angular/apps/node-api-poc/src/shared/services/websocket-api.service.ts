import { Injectable, signal } from '@angular/core';
import { EMPTY, catchError, map } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

@Injectable({ providedIn: 'root' })
export class WebsocketApiService {
  #socket$: WebSocketSubject<unknown> | null = null;
  readonly message = signal<string | null>(null);
  readonly connected = signal<boolean>(false);

  startConnection(port: number) {
    if (this.#socket$) {
      this.close();
    }
    this.#socket$ = webSocket({
      url: `ws://localhost:${port}`,
      serializer: (value) => JSON.stringify(value),
    });
    this.connected.set(true);
    this.#socket$
      .pipe(
        map((message) => message as string),
        catchError((error) => {
          console.error('WebSocket error:', error);
          this.connected.set(false);
          return EMPTY;
        })
      )
      .subscribe((message) => {
        this.message.set(message);
      });
  }

  sendMessage(message: string) {
    const payload = { data: message };
    this.#socket$?.next(payload);
  }

  close() {
    this.#socket$?.complete();
    this.#socket$ = null;
  }
}
