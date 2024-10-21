import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { render } from '@testing-library/angular';
import { ExportXlsxService } from './../../services/export-xlsx.service';
import { DataComponent } from './data.component';

describe('DataComponent', () => {
  const mockExportXlsxService = {
    download: jest.fn(),
  };

  const setup = async () => {
    const component = await render(DataComponent, {
      providers: [{ provide: ExportXlsxService, useValue: mockExportXlsxService }],
    });
    const harnessLoader = TestbedHarnessEnvironment.loader(component.fixture);
    return { component, harnessLoader };
  };

  it('should render the component', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });

  it('should trigger the download for the xlsx file', async () => {
    const { harnessLoader } = await setup();
    const button = await harnessLoader.getHarness(MatButtonHarness);
    await button.click();
    expect(mockExportXlsxService.download).toHaveBeenCalled();
  });
});
