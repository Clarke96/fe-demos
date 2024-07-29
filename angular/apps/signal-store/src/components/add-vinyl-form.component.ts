import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Vinyl } from '../store';
import { VinylsStore } from '../store/vinyls.store';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-add-vinyl-form',
  template: `
    <div class="p-2 m-2 border-2">
      <h2>Add Record</h2>
      <form class="flex flex-col">
        <div>
          Artist:
          <input [(ngModel)]="vinyl.artist" name="artist" type="text" placeholder="Artist" />
        </div>
        <div>
          Title:
          <input [(ngModel)]="vinyl.title" name="title" type="text" placeholder="Title" />
        </div>
        <div>
          Year:
          <input [(ngModel)]="vinyl.year" name="year" type="number" placeholder="Year" />
        </div>
        <div>
          Genre:
          <input [(ngModel)]="vinyl.genre" name="genre" type="text" placeholder="Genre" />
        </div>
        <button type="submit" (click)="store.addVinyl(vinyl)">Add</button>
      </form>
    </div>
  `,
})
export class AddVinylFormComponent {
  protected store = inject(VinylsStore);

  vinyl: Vinyl = {
    id: '',
    artist: '',
    title: '',
    year: 0,
    genre: '',
  };
}
