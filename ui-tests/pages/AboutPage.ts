import { Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class AboutPage extends BasePage {
  readonly subHeading: Locator
  readonly findOutMoreButton: Locator

  constructor(page: Page) {
    super(page, '/Home/About')

    this.subHeading = this.page.getByRole('heading').nth(1)
    this.findOutMoreButton = this.page.getByRole('link', {
      name: 'Find out more about us »',
    })
  }
}
