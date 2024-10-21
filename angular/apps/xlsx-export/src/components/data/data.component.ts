import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { DataStore } from '../data.store';
import { ExportXlsxService } from './../../services/export-xlsx.service';

@Component({
  standalone: true,
  selector: 'app-data',
  imports: [MatTableModule, MatButtonModule, MatIconModule],

  template: `
    <div class="block w-full h-full p-8">
      <button
        mat-raised-button
        class="m-8 float-right"
        aria-label="export to xlsx button"
        (click)="exportToXlsx()"
      >
        Export to Excel
        <mat-icon>file_download</mat-icon>
      </button>
      <table mat-table [dataSource]="store.dataSource()" class="!bg-white">
        @for(column of columns; track column){
        <ng-container matColumnDef="{{ column }}">
          <th mat-header-cell *matHeaderCellDef>{{ column }}</th>
          <td mat-cell *matCellDef="let album">{{ album[column] }}</td>
        </ng-container>
        }

        <tr mat-header-row *matHeaderRowDef="columns"></tr>
        <tr mat-row *matRowDef="let row; columns: columns"></tr>
      </table>
    </div>
  `,
  styles: [``],
})
export class DataComponent {
  protected store = inject(DataStore);
  protected exportXlsxService = inject(ExportXlsxService);

  readonly columns = ['title', 'rare', 'artist', 'year'];

  protected exportToXlsx() {
    this.exportXlsxService.download(this.store.dataSource());
  }
}
