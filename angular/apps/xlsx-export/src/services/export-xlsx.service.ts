import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { DataRow } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ExportXlsxService {
  http = inject(HttpClient);

  async download(data: DataRow[]) {
    const workbook = new ExcelJS.Workbook();
    const cover = workbook.addWorksheet('Cover');
    const albums = workbook.addWorksheet('Albums', {
      headerFooter: {
        firstHeader: 'Some Album data',
        differentFirst: true,
      },
      views: [{ style: 'pageLayout' }],
    });

    // COVER SHEET
    const imageArrayBuffer = await fetch('assets/images/logo.jpg').then((res) => res.arrayBuffer());

    const logo = workbook.addImage({
      buffer: imageArrayBuffer,
      extension: 'jpeg',
    });

    cover.addImage(logo, {
      tl: { col: 5, row: 10 },
      ext: { width: 300, height: 300 },
    });

    const topCell = cover.getCell('A1');
    const firstCol = cover.columns[0];
    firstCol.width = 40;
    topCell.value = 'Albums';

    topCell.font = { size: 32, bold: true, underline: true };
    topCell.alignment = { vertical: 'middle', horizontal: 'center' };

    cover.mergeCells('A2:A4');

    // ALBUMS SHEET
    albums.columns = [
      { header: 'Title', key: 'title' },
      { header: 'Rare', key: 'rare' },
      { header: 'Artist', key: 'artist' },
      { header: 'Year', key: 'year' },
      { header: 'Website', key: 'website', width: 40 },
      { header: 'Cost', key: 'cost', style: { numFmt: '$0.00' } },
    ];

    data.forEach((album) => {
      const newRow = albums.addRow(album);
      newRow.getCell(5).value = {
        text: album.website,
        hyperlink: `https://${album.website}`,
        tooltip: 'Visit website',
      };
      newRow.getCell(5).style = {
        font: { color: { argb: 'FF0000FF' }, underline: true },
      };
    });

    const headerRow = albums.getRow(1);
    headerRow.height = 25;
    headerRow.eachCell({ includeEmpty: true }, function (cell) {
      cell.font = { bold: true, name: 'Comic Sans MS', size: 14, color: { argb: 'FFFFFF' } };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'af30121' },
        bgColor: { argb: 'af30121' },
      };
    });

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, 'export.xlsx');
    });
  }
}
