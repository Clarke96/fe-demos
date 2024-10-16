import { NgTemplateOutlet } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Album } from '@database';

@Component({
  imports: [MatButtonModule, NgTemplateOutlet],
  template: `
    <div class="group h-60 w-60 block relative mb-20">
      <div
        class="hidden group-hover:flex flex-col justify-center items-center gap-4 p-8 absolute w-full h-full bg-emerald-200 bg-opacity-70"
      >
        <button mat-flat-button color="gold" (click)="addToBasket.emit()">Add to basket</button>
      </div>
      <img
        [src]="album().imageUrl"
        [attr.alt]="album().title"
        class="h-full w-full rounded-lg border-emerald-300 border-8 "
      />
      <div class="flex flex-col gap-2 mt-2 text-center">
        <div class="text-sm">{{ album().artist.name }}</div>
        <div class="text-lg">{{ album().title }}</div>
      </div>
    </div>
  `,
  standalone: true,
  selector: 'app-album-card',
})
export class AlbumCardComponent {
  album = input.required<Album>();
  addToBasket = output<void>();
}
