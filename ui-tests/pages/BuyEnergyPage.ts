import { Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class BuyEnergyPage extends BasePage {
  readonly timeHeading: Locator
  readonly description: Locator
  readonly resetButton: Locator
  readonly buyTable: Locator
  readonly getColumnHeader: (ind: number) => Locator
  readonly getCell: (rowInd: number, colInd: number) => Locator
  readonly requiredUnitsField: (ind: number) => Locator
  readonly buyButton: (ind: number) => Locator
  readonly discountHeading: Locator
  readonly discountImage: Locator
  readonly backButton: Locator

  constructor(page: Page) {
    super(page, '/Energy/Buy')

    this.timeHeading = this.page.locator('h4').first()
    this.description = this.page.locator('h4').nth(1)
    this.resetButton = this.page.getByRole('button', { name: 'Reset' })
    this.buyTable = this.page.getByRole('table')
    this.discountHeading = this.page.locator('h3')
    this.discountImage = this.page.locator('.body-content').getByRole('img')
    this.backButton = this.page.getByRole('link', { name: 'Back to Homepage' })
    this.getColumnHeader = (ind: number) =>
      this.page.getByRole('table').locator('th').nth(ind)
    this.getCell = (rowInd: number, colInd: number) =>
      this.page
        .getByRole('table')
        .locator('tr')
        .nth(rowInd)
        .locator('td')
        .nth(colInd)
    this.requiredUnitsField = (ind: number) =>
      this.page.getByRole('table').locator('tr').nth(ind).locator('td').nth(3)
    this.buyButton = (ind: number) =>
      this.page.getByRole('table').locator('tr').nth(ind).locator('td').nth(4)
  }
}
