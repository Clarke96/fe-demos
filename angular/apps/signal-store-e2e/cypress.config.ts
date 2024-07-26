import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run signal-store:serve:development',
        production: 'nx run signal-store:serve:production',
      },
      ciWebServerCommand: 'nx run signal-store:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
