import config from '@repo/playwright-config'

import { defineConfig } from '@playwright/test';

export default defineConfig({
  ...config,
});