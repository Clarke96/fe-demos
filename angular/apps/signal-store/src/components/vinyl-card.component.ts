import { Component, input, output } from '@angular/core';
import { Vinyl } from './../store/model';

@Component({
  standalone: true,
  template: `
    <div class="py-4 h-52 w-52 border-2 flex flex-col justify-between items-center">
      <div class="flex flex-col gap-2">
        <span class="">{{ vinyl().artist }}:</span>
        <span class="">{{ vinyl().title }}</span>
      </div>
      <div class="flex flex-row gap-2">
        <span class="">{{ vinyl().year }}</span>
        <span class="">{{ vinyl().genre }}</span>
      </div>
      <button class="border-2 p-2" (click)="delete.emit()">Delete</button>
    </div>
  `,
  selector: 'app-vinyl-card',
})
export class VinylCardComponent {
  vinyl = input.required<Vinyl>();
  delete = output<void>();
}
