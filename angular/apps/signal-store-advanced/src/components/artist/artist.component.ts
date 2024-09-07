import { Component, effect, inject, input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ArtistStore } from './artist.store';

@Component({
  selector: 'app-artist',
  standalone: true,
  providers: [ArtistStore],
  imports: [MatProgressSpinnerModule, MatButtonModule, MatIconModule],
  template: `
    @if(store.artist(); as artist) {
    <h2 class="text-lg">{{ artist.name }}</h2>
    <p class="text-sm pt-6 sm:pt-8">{{ artist.bio }}</p>

    <h3 class="text-lg my-6 sm:my-8 ">Albums:</h3>
    <div class="flex flex-wrap gap-4">
      @for(album of artist.albums; track album.id) {
      <div
        class="border border-slate bg-amber-200 h-52 w-52 flex flex-col justify-center items-center"
      >
        <div class="ml-auto mr-auto">{{ album.title }}</div>
        <button mat-button (click)="store.addToCart(album)">Add to cart</button>
      </div>
      } @if(store.displayWarning()) {
      <div class="bg-rose-300 border border-rose-500 rounded p-4 sm:p-6">
        Your basket is more expensive than your credit limit!
        <button mat-icon-button (click)="store.closeWarning()"><mat-icon>close</mat-icon></button>
      </div>
      }
    </div>
    }@else if(store.isLoading()){
    <mat-progress-spinner class="block mx-auto mt-8" diameter="48" mode="indeterminate" />
    }
  `,
})
export class ArtistComponent implements OnInit {
  id = input.required<string>();
  store = inject(ArtistStore);

  ngOnInit(): void {
    this.store.loadAlbums(this.id());
  }

  protected warning = effect(
    () => {
      if (this.store.isPriceIssue()) {
        this.store.showWarning();
      }
    },
    { allowSignalWrites: true }
  );
}
