import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExportXlsxService {
  download() {
    console.log('Download xlsx');
  }
}
