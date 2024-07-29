import { Component } from '@angular/core';
import { AddVinylFormComponent, VinylDeckComponent } from '../components';
@Component({
  standalone: true,
  selector: 'app-root',
  imports: [AddVinylFormComponent, VinylDeckComponent],
  template: `
    <app-vinyl-deck />
    <app-add-vinyl-form />
  `,
})
export class AppComponent {
  title = 'signal-store';
}
