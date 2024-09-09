import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  template: `<div class="p-8 w-full h-full"><router-outlet /></div>`,
})
export class AppComponent {}
