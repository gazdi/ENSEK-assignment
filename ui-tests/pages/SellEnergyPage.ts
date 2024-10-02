import { Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class SellEnergyPage extends BasePage {
  readonly sellTable: Locator

  constructor(page: Page) {
    super(page, '/Energy/Sell')

    this.sellTable = this.page.locator(
      'Deliberate Fail > Sell Energy permanently under maintenance',
    )
  }
}
