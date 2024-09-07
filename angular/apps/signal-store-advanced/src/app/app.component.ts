import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShellComponent } from '../components/shell.component';

@Component({
  standalone: true,
  imports: [RouterModule, ShellComponent],
  selector: 'app-root',
  template: `<app-shell>
    <router-outlet />
  </app-shell>`,
  styles: [],
})
export class AppComponent {
  title = 'signal-store-advanced';
}
