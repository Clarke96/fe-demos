import { Component, input, output } from '@angular/core';
import { ArtistSlim } from '../../models';

@Component({
  standalone: true,
  selector: 'app-artist-card',
  template: `
    <div
      class="border border-emerald-400 rounded-xl p-4 sm:p-6 flex flex-col items-center cursor-pointer hover:bg-emerald-300"
      (click)="onClick.emit()"
    >
      <img
        [src]="artist().imageUrl"
        [alt]="artist().name"
        class="w-40 h-40 sm:w-52 sm:h-52 object-cover"
      />
      <div class="p-4">
        <h2 class="text-lg">{{ artist().name }}</h2>
      </div>
    </div>
  `,
})
export class ArtistCardComponent {
  artist = input.required<ArtistSlim>();
  onClick = output<void>();
}
