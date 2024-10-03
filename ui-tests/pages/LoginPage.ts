import { Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class LoginPage extends BasePage {
  readonly localAuthHeading: Locator
  readonly emailField: Locator
  readonly emailError: Locator
  readonly passwordField: Locator
  readonly passwordError: Locator
  readonly rememberMeCheckbox: Locator
  readonly loginButton: Locator
  readonly registerNewUserLink: Locator
  readonly externalAuthHeading: Locator
  readonly externalAuthDescription: Locator

  constructor(page: Page) {
    super(page, '/Account/Login')

    this.localAuthHeading = this.page.locator('#loginForm h4')
    this.emailField = this.page.getByLabel('Email')
    this.emailError = this.page.locator('#Email-error')
    this.passwordField = this.page.getByLabel('Password', { exact: true })
    this.passwordError = this.page.locator('#Password-error')
    this.rememberMeCheckbox = this.page.getByLabel('Remember me?')
    this.loginButton = this.page.getByRole('button', { name: 'Log in' })
    this.registerNewUserLink = this.page.getByRole('link', {
      name: 'Register as a new user',
    })

    this.externalAuthHeading = this.page.locator('#socialLoginForm h4')
    this.externalAuthDescription = this.page.locator('#socialLoginForm div')
  }

  enterDetails = async (email: string, password: string) => {
    await this.emailField.fill(email)
    await this.passwordField.fill(password)
  }
}
