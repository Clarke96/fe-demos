import { Component, inject } from '@angular/core';
import { VinylsStore } from '../store/vinyls.store';
import { VinylCardComponent } from './vinyl-card.component';

@Component({
  standalone: true,
  imports: [VinylCardComponent],
  template: `
    @if(store.loadState.status() === 'loading') {
    <div>Loading...</div>
    } @else{
    <div class="p-4 flex flex-wrap gap-8">
      @for (vinyl of store.vinyls(); track vinyl.id) {
      <app-vinyl-card [vinyl]="vinyl" (delete)="store.removeVinyl(vinyl.id)" /> }
    </div>
    }

    <button class="border-2 p-2 m-2" (click)="store.clearVinyls()">Clear Collection</button>
    <button class="border-2 p-2 m-2" (click)="store.downloadCollection()">
      Restore Collection
    </button>
  `,
  selector: 'app-vinyl-deck',
})
export class VinylDeckComponent {
  protected readonly store = inject(VinylsStore);
}
