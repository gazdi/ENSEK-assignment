import { expect } from '@playwright/test'
import { testWithFailureScreenshot as test } from './helpers/hooks'
import { RegisterPage } from './pages/RegisterPage'
import { invalidRegisterDetails } from './testdata/register_inputs'
import { randomString } from './helpers/utils'

test.describe('Register page', async () => {
  test.beforeEach(async ({ page }) => {
    test.slow(
      true,
      'Marked slow to leave enough time for the http500 to arrive',
    )
    page.on('response', async response => {
      const request = response.request()
      // only log errors on the /Account/Register endpoint
      if (
        !request.url().endsWith('/Account/Register') ||
        response.status() < 400
      )
        return
      await test
        .info()
        .attach(
          `>> ${request.method()} ${request.url()}\n<< ${response.status()}(${response.statusText()})}`,
        )
    })
  })

  test('Register user with new valid details', async ({ page }) => {
    const registerPage = new RegisterPage(page)
    await registerPage.goto()
    const newAccountEmail = `csaba.${randomString()}.bobak@nowhere.com`
    const newAccountPassword = 'Password_123'
    await registerPage.enterDetails(
      newAccountEmail,
      newAccountPassword,
      newAccountPassword,
    )
    await registerPage.registerButton.click({ timeout: 1000 })
  })

  invalidRegisterDetails.forEach(async creds => {
    test(`Register with email:${creds.email || '<empty>'}, password:${creds.password || '<empty>'}, confirmPassword:${creds.confirmPassword || '<empty>'}`, async ({
      page,
    }) => {
      const registerPage = new RegisterPage(page)
      await registerPage.goto()
      await registerPage.enterDetails(
        creds.email || '',
        creds.password || '',
        creds.confirmPassword || '',
      )
      await registerPage.registerButton.click({ timeout: 1000 })

      if (creds.expectedErrors.length === 0)
        await expect(registerPage.mainHeading).not.toHaveText('Error', {
          timeout: 5000,
        })
      for (const expError of creds.expectedErrors)
        await expect(registerPage.formValidationError).toHaveText(expError, {
          timeout: 5000,
        })
    })
  })
})
