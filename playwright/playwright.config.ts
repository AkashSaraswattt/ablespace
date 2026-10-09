import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.resolve(__dirname, '.env'), quiet: true });
export default defineConfig({
  testDir: './tests', fullyParallel: false, workers: 1, retries: 0,
  timeout: 60_000, reporter: 'list',
  use: {
    baseURL: 'https://staging.ablespace.io',
    trace: 'off', video: 'off', screenshot: 'off',
  },
  projects: [
    { name: 'Chrome', use: { browserName: 'chromium', channel: 'chrome', viewport: { width: 1363, height: 936 } } },
    { name: 'Firefox', use: { browserName: 'firefox', viewport: { width: 1363, height: 936 } } },
    { name: 'Mobile-390x844', use: { browserName: 'chromium', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 } },
    { name: 'iPad-Mini', use: { browserName: 'chromium', viewport: { width: 768, height: 1024 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } },
    { name: 'iPad-Pro', use: { browserName: 'chromium', viewport: { width: 1024, height: 1366 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } },
  ],
});
