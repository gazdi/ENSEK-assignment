import { Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class RegisterPage extends BasePage {
  readonly emailField: Locator
  readonly passwordField: Locator
  readonly confirmPasswordField: Locator
  readonly registerButton: Locator

  constructor(page: Page) {
    super(page, '/Account/Register')

    this.emailField = this.page.getByLabel('Email')
    this.passwordField = this.page.getByLabel('Password', { exact: true })
    this.confirmPasswordField = this.page.getByLabel('Confirm password', {
      exact: true,
    })
    this.registerButton = this.page.getByRole('button', { name: 'Register' })
  }
}
