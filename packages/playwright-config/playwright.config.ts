import { defineConfig } from '@playwright/test';

export const basePlaywrightConfig = defineConfig({
  testDir: './tests',
  use: {
    headless: true,
    browserName: 'chromium',
    screenshot: 'only-on-failure',
    trace: 'on',
  },
});
