const { defineConfig, devices } = require('@playwright/test');

module.exports = ({ basePath, port, testDir }) => {
  const baseURL = `http://localhost:${port}${basePath}`;

  const config = {
    testMatch: '**/*.e2e.{ts,tsx}',
    testDir,
    fullyParallel: true,
    outputDir: 'e2e-results',
    retries: 2,

    reporter: [
      ['list'],
      ['html', { open: 'never', outputFolder: 'e2e-report' }],
    ],

    use: {
      baseURL,
      screenshot: 'on',
      video: 'on-first-retry',
      trace: 'on-first-retry',
    },

    webServer: {
      command: 'pnpm dev',
      url: baseURL,
      reuseExistingServer: !process.env.CI,
    },

    projects: [
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
      },
      /* Test against mobile viewports. */
      {
        name: 'Mobile Chrome',
        use: { ...devices['Pixel 5'] },
      },
      /* Test against branded browsers. */
      {
        name: 'Google Chrome',
        use: { ...devices['Desktop Chrome'], channel: 'chrome' }, // or 'chrome-beta'
      },
      {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'] },
      },
    ],
  };

  return defineConfig(config);
};