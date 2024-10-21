import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';

@Injectable({
  providedIn: 'root',
})
export class ExportXlsxService {
  download() {
    const workbook = new ExcelJS.Workbook();
    const albums = workbook.addWorksheet('Albums');
    const cover = workbook.addWorksheet('Cover');

    const logo = workbook.addImage({
      filename: '../assets/images/logo.jpeg',
      extension: 'jpeg',
    });

    cover.addImage(logo, {
      tl: { col: 0, row: 0 },
      ext: { width: 500, height: 200 },
    });

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      //  saveAs(blob, 'export.xlsx');
    });
  }
}
