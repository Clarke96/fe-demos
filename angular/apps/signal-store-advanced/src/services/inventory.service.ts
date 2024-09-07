import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { ARTISTS } from '../database/ARTISTS';
import { Artist, Artists } from '../models';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  public getAllArtists(): Observable<Artists> {
    return of(ARTISTS).pipe(
      delay(1000),
      map((artists) =>
        artists.map(({ id, name, imageUrl }) => ({
          id,
          name,
          imageUrl,
        }))
      )
    );
  }

  public getAlbums(artistId: string): Observable<Artist | null> {
    return of(ARTISTS).pipe(
      delay(1000),
      map((artists) => artists.find(({ id }) => id === artistId) ?? null)
    );
  }
}
