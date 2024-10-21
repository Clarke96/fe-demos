import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class ExportXlsxService {
  http = inject(HttpClient);

  async download(data: any[]) {
    const workbook = new ExcelJS.Workbook();
    const cover = workbook.addWorksheet('Cover');
    const albums = workbook.addWorksheet('Albums');

    // COVER SHEET
    const imageArrayBuffer = await fetch('assets/images/logo.jpg').then((res) => res.arrayBuffer());

    const logo = workbook.addImage({
      buffer: imageArrayBuffer,
      extension: 'jpeg',
    });

    cover.addImage(logo, {
      tl: { col: 0, row: 0 },
      ext: { width: 500, height: 500 },
    });

    // ALBUMS SHEET
    albums.columns = [
      { header: 'Title', key: 'title' },
      { header: 'Rare', key: 'rare' },
      { header: 'Artist', key: 'artist' },
      { header: 'Year', key: 'year' },
    ];

    data.forEach((album) => {
      albums.addRow(album);
    });

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, 'export.xlsx');
    });
  }
}
