import { NgTemplateOutlet } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Album } from '@database';

@Component({
  imports: [MatButtonModule, NgTemplateOutlet],
  template: `
    <div class="group h-60 w-60 block relative">
      <div
        class="hidden group-hover:flex flex-col justify-between items-center gap-4 p-8 absolute w-full h-full bg-emerald-200 bg-opacity-70"
      >
        <ng-container [ngTemplateOutlet]="options" />
      </div>
      <img
        [src]="album().imageUrl"
        [attr.alt]="album().title"
        class="h-full w-full rounded-lg border-emerald-300 border-8 "
      />
    </div>

    <ng-template #options>
      <div class="text-center bg-slate-800 text-slate-50 bg-opacity-75 rounded-md p-2">
        {{ album().artist.name }} - {{ album().title }}
      </div>
      <button mat-flat-button color="gold" (click)="addToBasket.emit()">Add to basket</button>
    </ng-template>
  `,
  standalone: true,
  selector: 'app-album-card',
})
export class AlbumCardComponent {
  album = input.required<Album>();
  addToBasket = output<void>();
}
