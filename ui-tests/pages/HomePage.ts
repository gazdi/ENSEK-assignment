import { Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class HomePage extends BasePage {
  readonly findOutMoreButton: Locator
  readonly buyEnergyHeading: Locator
  readonly buyEnergyButton: Locator
  readonly sellEnergyHeading: Locator
  readonly sellEnergyButton: Locator
  readonly aboutUsHeading: Locator
  readonly aboutUsButton: Locator

  constructor(page: Page) {
    super(page, '/')

    this.findOutMoreButton = this.page
      .locator('.jumbotron')
      .getByRole('link', { name: 'Find out more »' })
    this.buyEnergyHeading = this.page.getByRole('heading', {
      name: 'Buy some energy',
    })
    this.buyEnergyButton = this.page.getByRole('link', { name: 'Buy energy »' })
    this.sellEnergyHeading = this.page.getByRole('heading', {
      name: 'Sell some energy',
    })
    this.sellEnergyButton = this.page.getByRole('link', {
      name: 'Sell energy »',
    })
    this.aboutUsHeading = this.page.getByRole('heading', { name: 'About us' })
    this.aboutUsButton = this.page.getByRole('link', { name: 'Learn more »' })
  }
}
