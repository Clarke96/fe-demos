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
  host: { class: 'flex flex-col p-8 gap-8' },
  template: `
    <!-- REST -->
    <h1 class="h1 text-xl">Restful</h1>
    <!-- Connections -->
    <div class="flex gap-4">
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
    >
    </textarea>
    }

    <!-- WEBSOCKET -->
    <h1 class="h1 text-xl">Websocket</h1>
    @if(!store.connected()) {
    <div class="flex flex-col gap-2">
      <div>Disconnected!</div>
      <button class="w-28" mat-stroked-button (click)="store.open()">Connect</button>
    </div>
    } @else {

    <textarea
      name="message"
      cdkTextareaAutosize
      mat-input
      textaria
      [disabled]="true"
      [ngModel]="store.stringifiedWebsocketMessage()"
    >
    </textarea>

    <button mat-stroked-button (click)="store.sendWebsocketMessage()">send test</button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperatorComponent {
  protected readonly store = inject(OperatorStore);
}
