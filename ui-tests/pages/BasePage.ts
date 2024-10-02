import { Locator, Page } from '@playwright/test'

export class BasePage {
  url: string
  readonly page: Page
  readonly logo: Locator
  readonly homeLink: Locator
  readonly aboutLink: Locator
  readonly contactLink: Locator
  readonly registerLink: Locator
  readonly loginLink: Locator
  readonly mainHeading: Locator
  readonly pageFooter: Locator

  constructor(page: Page, url: string) {
    this.url = url
    this.page = page
    this.mainHeading = this.page.getByRole('heading').first()
    this.logo = this.page.locator('.navbar-header').getByRole('img').first()
    this.homeLink = this.page
      .locator('.nav')
      .getByRole('link', { name: 'Home' })
    this.aboutLink = this.page
      .locator('.nav')
      .getByRole('link', { name: 'About' })
    this.contactLink = this.page
      .locator('.nav')
      .getByRole('link', { name: 'Contact' })
    this.registerLink = this.page
      .locator('.nav')
      .getByRole('link', { name: 'Register' })
    this.loginLink = this.page
      .locator('.nav')
      .getByRole('link', { name: 'Log in' })
    this.pageFooter = this.page.locator('footer')
  }

  goto = async () => {
    await this.page.goto(this.url)
  }

  getElements = (): Locator[] => {
    let r: Locator[] = []
    for (const prop of Object.values(this)) {
      // console.log(`checking property ${prop}`)
      if (typeof prop === 'object' && prop.constructor.name === 'Locator')
        r.push(prop as Locator)
    }
    return r
  }
}
