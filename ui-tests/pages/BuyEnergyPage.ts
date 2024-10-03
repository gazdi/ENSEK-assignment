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
  readonly buyAmountError: Locator
  readonly discountHeading: Locator
  readonly discountImage: Locator
  readonly backButton: Locator

  constructor(page: Page) {
    super(page, '/Energy/Buy')

    this.timeHeading = this.page.locator('h4').first()
    this.description = this.page.locator('h4').nth(1)
    this.resetButton = this.page.getByRole('button', { name: 'Reset' })
    this.buyTable = this.page.getByRole('table')
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
      this.page
        .getByRole('table')
        .locator('tr')
        .nth(ind)
        .locator('td')
        .nth(3)
        .locator('#energyType_AmountPurchased')
    this.buyButton = (ind: number) =>
      this.page
        .getByRole('table')
        .locator('tr')
        .nth(ind)
        .locator('td')
        .nth(4)
        .getByRole('button')
    this.buyAmountError = this.page.locator(
      'Deliberate Fail > no error message on Buy Energy page',
    )
    this.discountHeading = this.page.locator('h3')
    this.discountImage = this.page.locator('.body-content').getByRole('img')
    this.backButton = this.page.getByRole('link', { name: 'Back to Homepage' })
  }

  override getElements = (): Locator[] => {
    const dynamicElements = ['buyAmountError']
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
}

export class SaleConfirmationPage extends BasePage {
  readonly confirmationMessage: Locator
  readonly buyMoreButton: Locator

  constructor(page: Page) {
    super(page, '/Energy/SaleConfirmed')

    this.confirmationMessage = this.page.locator('.body-content div div')
    this.buyMoreButton = this.page.getByRole('link', { name: 'Buy more »' })
  }
}
