import { defineConfig, devices } from '@playwright/test'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI
    ? [['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'api',
      testDir: './api-tests',
      use: {
        baseURL: 'https://qacandidatetest.ensek.io',
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'ui - Chrome',
      testDir: './ui-tests',
      use: {
        baseURL: 'https://ensekautomationcandidatetest.azurewebsites.net',
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'ui - Firefox',
      testDir: './ui-tests',
      use: {
        baseURL: 'https://ensekautomationcandidatetest.azurewebsites.net',
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'ui - Safari',
      testDir: './ui-tests',
      use: {
        baseURL: 'https://ensekautomationcandidatetest.azurewebsites.net',
        ...devices['Desktop Safari'],
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
})
