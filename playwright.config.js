const { defineConfig } = require('@playwright/test');
require('dotenv').config({
  path: `.env_${process.env.ENVIRONMENT || 'prod'}`,
});

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  fullyParallel: true,
  retries: 0,
  workers: 3,
  use: {
    baseURL: process.env.BASE_URL || 'https://www.balsambrands.com/',
    headless: process.env.HEADLESS === 'true',
    viewport: { width: 1920, height: 1080 }, 
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    storageState: process.env.STORAGE_STATE || 'state.json',
  },
  globalSetup: require.resolve('./globalSetup'),
  projects: [
    { name: 'chromium', use: { browserName: 'chromium', } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
    { name: 'edge', use: { channel: 'msedge' } },
    { name: 'chrome', use: { channel: 'chrome' } },
  ],
  reporter: [['list'], ['html', { open: 'always' }]]
});
