import { Page, test as testbase } from '@playwright/test'

export const testWithFailureScreenshot = testbase.extend<{
  globalHooks: Page
}>({
  globalHooks: [
    async ({ page }, use, testInfo) => {
      // fixture setup a.k.a. BeforeEach

      // execute the test
      await use(page)

      // fixture teardown a.k.a. AfterEach
      if (testInfo.status !== testInfo.expectedStatus) {
        const screenshot = await page.screenshot()
        await testInfo.attach('screenshot', {
          body: screenshot,
          contentType: 'image/png',
        })
      }
    },
    { auto: true },
  ],
})
