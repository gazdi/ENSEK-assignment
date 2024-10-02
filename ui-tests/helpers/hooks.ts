import {Page, test as testbase} from '@playwright/test';

export const testWithFailureScreenshot = testbase.extend<{
  globalHooks: Page;
  testData: {[key: string]: any};
}>({
  globalHooks: [
    async ({page}, use, testInfo) => {
      // auto fixture setup a.k.a. BeforeEach

      await use(page);

      // auto fixture teardown a.k.a. AfterEach
      if (testInfo.status !== testInfo.expectedStatus) {
        const screenshot = await page.screenshot();
        await testInfo.attach('screenshot', {
          body: screenshot,
          contentType: 'image/png',
        });
      }
    },
    {auto: true},
  ]
});