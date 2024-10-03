import { Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class RegisterPage extends BasePage {
  readonly emailField: Locator
  readonly passwordField: Locator
  readonly confirmPasswordField: Locator
  readonly registerButton: Locator
  readonly formValidationError: Locator

  constructor(page: Page) {
    super(page, '/Account/Register')

    this.emailField = this.page.getByLabel('Email')
    this.passwordField = this.page.getByLabel('Password', { exact: true })
    this.confirmPasswordField = this.page.getByLabel('Confirm password', {
      exact: true,
    })
    this.registerButton = this.page.getByRole('button', { name: 'Register' })
    this.formValidationError = this.page.locator(
      'div.validation-summary-errors',
    )
  }

  override getElements = (): Locator[] => {
    const dynamicElements = ['formValidationError']
    const staticProperties = Object.entries(this).filter(
      p => !dynamicElements.includes(p[0]),
    )
    let r: Locator[] = []
    for (const prop of staticProperties) {
      if (typeof prop[1] === 'object' && prop[1].constructor.name === 'Locator')
        r.push(prop[1] as Locator)
    }
    return r
  }

  enterDetails = async (
    email: string,
    password: string,
    confirmPassword: string,
  ) => {
    await this.emailField.fill(email)
    await this.passwordField.fill(password)
    await this.confirmPasswordField.fill(confirmPassword)
  }
}
