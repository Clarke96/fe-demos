import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { Vinyl } from '../store';

@Injectable({ providedIn: 'root' })
export class VinylService {
  getCollection(): Observable<Vinyl[]> {
    return of(null).pipe(
      delay(1000),
      map(() => [
        {
          id: '1',
          artist: 'Pink Floyd',
          title: 'The Dark Side of the Moon',
          year: 1973,
          genre: 'Progressive Rock',
        },
        { id: '2', artist: 'Led Zeppelin', title: 'IV', year: 1971, genre: 'Hard Rock' },
        { id: '3', artist: 'The Beatles', title: 'Abbey Road', year: 1969, genre: 'Rock' },
        {
          id: '4',
          artist: 'The Rolling Stones',
          title: 'Sticky Fingers',
          year: 1971,
          genre: 'Rock',
        },
        { id: '5', artist: 'Van Morrison', title: 'Astral Weeks', year: 1968, genre: 'Folk Rock' },
      ])
    );
  }
}
