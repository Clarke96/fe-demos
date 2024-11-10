import { TextFieldModule } from '@angular/cdk/text-field';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OperatorStore } from './operator.store';

@Component({
  standalone: true,
  selector: 'app-operator',
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    TextFieldModule,
    MatProgressSpinnerModule,
  ],
  providers: [OperatorStore],
  host: { class: 'flex flex-col p-8' },
  template: `
    <!-- Connections -->
    <div class="flex mb-8 gap-4">
      <button mat-stroked-button (click)="store.getUsers()">Get Users</button>
      <button mat-stroked-button (click)="store.getWelcome()">Get Welcome</button>
    </div>
    <!-- Std Out -->
    @if(store.isPending()){
    <mat-progress-spinner mode="indeterminate" />
    } @else {
    <textarea
      name="stamdardOut"
      cdkTextareaAutosize
      mat-input
      textaria
      [disabled]="true"
      [ngModel]="store.standardOut()"
    ></textarea>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperatorComponent {
  protected readonly store = inject(OperatorStore);
}
