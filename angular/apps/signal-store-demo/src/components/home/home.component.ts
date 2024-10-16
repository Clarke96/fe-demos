import { Component, effect, inject, untracked } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AlbumCardComponent } from './album-card.component';
import { HomeStore } from './home.store';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [MatProgressSpinnerModule, AlbumCardComponent],
  providers: [HomeStore],
  template: `
    <img
      [src]="'assets/images/music-store.jpg'"
      alt="Signal Store Logo"
      class="w-1/2 mx-auto mb-6 sm:mb-8"
    />
    <h1 class="text-xl sm:text-2xl text-center">Welcome to Signal Store!</h1>
    <p class="text-center">See records below</p>

    @if(store.isLoading()){
    <mat-progress-spinner class="block mx-auto mt-8" diameter="48" mode="indeterminate" />
    } @else{
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-8">
      @for(album of store.albums(); track album.id) {
      <app-album-card
        [album]="album"
        class="flex justify-center"
        (addToBasket)="store.addToBasket(album)"
      />
      }
    </div>
    }
  `,
})
export class HomeComponent {
  protected readonly store = inject(HomeStore);
  protected readonly router = inject(Router);

  artistClicked(id: string) {
    this.router.navigate(['artist'], { queryParams: { id } });
  }

  showWarning = effect(() => {
    const basketPriceGreaterThanCredit = this.store.basketPriceGreaterThanCredit();

    untracked(() => {
      if (basketPriceGreaterThanCredit) alert('Warning! Basket price is greater than store credit');
    });
  });
}
