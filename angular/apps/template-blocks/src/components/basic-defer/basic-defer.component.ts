import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { DeferCardComponent } from './defer-card/defer-card.component';

export type Colour = 'red' | 'green' | 'blue' | 'yellow';

@Component({
  selector: 'app-basic-defer',
  standalone: true,
  imports: [CommonModule, DeferCardComponent],
  template: `
    <h2 class="text-2xl pb-4">Basic Defer</h2>
    <div class="flex flex-col">
      @defer {
      <app-defer-card [initColour]="'green'" [(colourModel)]="colourDisplayed"></app-defer-card>
      } @defer {
      <app-defer-card [initColour]="'blue'" [(colourModel)]="colourDisplayed"></app-defer-card>
      }<app-defer-card [initColour]="'yellow'" [(colourModel)]="colourDisplayed"></app-defer-card>
    </div>

    <p class="py-5">
      the colour displayed is red by default. It should end on yellow since yellow is the last
      setter component.
    </p>
    <div
      class="flex flex-row justify-center border-2 p-4 m-4"
      [ngClass]="'border-c-' + colourDisplayed()"
    >
      {{ colourDisplayed() }}
    </div>
  `,
  styles: [
    `
      .border-c-blue {
        border-color: blue;
      }
      .border-c-green {
        border-color: green;
      }
      .border-c-yellow {
        border-color: yellow;
      }
      .border-c-red {
        border-color: red;
      }
    `,
  ],
})
export class BasicDeferComponent {
  colourDisplayed = signal<Colour>('red');
}
