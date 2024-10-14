import { Injectable } from '@angular/core';
import { ARTISTS } from '@database';
import { delay, map, Observable, of } from 'rxjs';
import { Album, Artists } from '../models';

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

  public getAlbums(): Observable<Album[]> {
    return of(ARTISTS).pipe(
      delay(1000),
      map((artists) => {
        return artists.reduce((acc, artist) => {
          return [...acc, ...artist.albums.map((album) => album)];
        }, [] as Album[]);
      })
    );
  }
}
