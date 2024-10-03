import { expect } from '@playwright/test'
import { testWithFailureScreenshot as test } from './helpers/hooks'
import { LoginPage } from './pages/LoginPage'
import { invalidLoginDetails } from './testdata/login_inputs'

test.describe('Login page', async () => {
  test.beforeEach(async ({ page }) => {
    test.slow(
      true,
      'Marked slow to leave enough time for the http500 to arrive',
    )
    page.on('response', async response => {
      const request = response.request()
      // only log errors on the /Account/Login endpoint
      if (!request.url().endsWith('/Account/Login') || response.status() < 400)
        return
      await test
        .info()
        .attach(
          `>> ${request.method()} ${request.url()}\n<< ${response.status()}(${response.statusText()})}`,
        )
    })
  })

  test('Login with valid credentials', async ({ page }) => {
    test.fixme(true, 'Valid credentials needed')
  })

  invalidLoginDetails.forEach(async creds => {
    test(`Login with email: ${creds.email || '<empty>'}, password: ${creds.password || '<empty>'}`, async ({
      page,
    }) => {
      const loginPage = new LoginPage(page)
      await loginPage.goto()
      await loginPage.enterDetails(creds.email || '', creds.password || '')
      await loginPage.loginButton.click({ timeout: 5000 })
      if (creds.expectSuccess)
        await expect(loginPage.mainHeading).not.toHaveText('Error')
      if (creds.expectedEmailError.length > 0)
        await expect(loginPage.emailError).toHaveText(
          creds.expectedEmailError,
          {
            timeout: 5000,
          },
        )
      if (creds.expectedPasswordError.length > 0)
        await expect(loginPage.passwordError).toHaveText(
          creds.expectedPasswordError,
          { timeout: 5000 },
        )
    })
  })
})
