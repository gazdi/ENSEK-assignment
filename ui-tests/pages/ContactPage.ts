import { Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class ContactPage extends BasePage {
  readonly contactForm: Locator

  constructor(page: Page) {
    super(page, '/Home/Contact')

    this.contactForm = this.page.locator(
      'Deliberate Fail > no form on Contact page',
    )
  }
}
