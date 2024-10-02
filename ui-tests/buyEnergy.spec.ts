import { expect, Page } from '@playwright/test'
import { testWithFailureScreenshot as test } from './helpers/hooks'
import { BuyEnergyPage, SaleConfirmationPage } from './pages/BuyEnergyPage'

test.describe('Buy Energy page', async () => {
  // TODO: use a local fixture instead of this beforeEach function
  const beforeEach = async (page: Page, nrgType: string) => {
    const buyEnergyPage = new BuyEnergyPage(page)
    await buyEnergyPage.goto()
    await buyEnergyPage.resetButton.click()
    let nrgRowIndex = -1
    for (let i = 1; i < 5; i++) {
      const c = buyEnergyPage.getCell(i, 0)
      if (nrgType === (await c.textContent({ timeout: 1000 }))) nrgRowIndex = i
    }
    expect(nrgRowIndex, `Row index of ${nrgType}`).toBeGreaterThanOrEqual(0)
    const typeCell = buyEnergyPage.getCell(nrgRowIndex, 0)
    const priceCell = buyEnergyPage.getCell(nrgRowIndex, 1)
    const availableCell = buyEnergyPage.getCell(nrgRowIndex, 2)
    const requiredCell = buyEnergyPage.requiredUnitsField(nrgRowIndex)
    const buyButton = buyEnergyPage.buyButton(nrgRowIndex)
    const availableUnits = Number(await availableCell.textContent())

    return {
      buyEnergyPage: buyEnergyPage,
      nrgRowIndex: nrgRowIndex,
      typeCell: typeCell,
      priceCell: priceCell,
      availableCell: availableCell,
      requiredCell: requiredCell,
      buyButton: buyButton,
      availableUnits: availableUnits,
    }
  }

  const verifyConfirmationPage = async (
    page: Page,
    nrgType: string,
    availableUnits: number,
    unitsToBuy: number,
  ) => {
    const confirmPage = new SaleConfirmationPage(page)
    const expectedConfirmationMessage = `Thank you for your purchase of ${unitsToBuy} units of ${nrgType} We have popped it in the post and it will be with you shortly.\nThere are now ${availableUnits - unitsToBuy} units of ${nrgType} left in our stores.`
    await expect
      .soft(confirmPage.confirmationMessage)
      .toHaveText(expectedConfirmationMessage, { timeout: 1000 })
    await confirmPage.buyMoreButton.click()
  }

  // define tests for all energy types
  const energySources = ['Gas', 'Nuclear', 'Electricity', 'Oil']
  for (const nrgType of energySources) {
    test(`Buy some available ${nrgType}`, async ({ page }) => {
      const { availableCell, requiredCell, buyButton, availableUnits } =
        await beforeEach(page, nrgType)
      test.skip(
        availableUnits <= 0,
        'Can only test this with some available units',
      )
      const unitsToBuy =
        availableUnits > 1 ? availableUnits / 2 : availableUnits

      await requiredCell.fill(String(unitsToBuy), { timeout: 1000 })
      await buyButton.click({ timeout: 1000 })

      await verifyConfirmationPage(page, nrgType, availableUnits, unitsToBuy)

      const availableUnitsAfter = Number(await availableCell.textContent())
      expect.soft(availableUnitsAfter).toBe(availableUnits - unitsToBuy)
    })

    test(`Buy more than available ${nrgType} when some is available`, async ({
      page,
    }) => {
      const { buyEnergyPage, requiredCell, buyButton, availableUnits } =
        await beforeEach(page, nrgType)
      test.skip(
        availableUnits <= 0,
        'Can only test this with some available units',
      )
      await requiredCell.fill(String(availableUnits + 1), { timeout: 1000 })
      await buyButton.click({ timeout: 1000 })
      await expect(buyEnergyPage.buyAmountError).toBeVisible({ timeout: 1000 })
    })

    test(`Buy ${nrgType} when none is available`, async ({ page }) => {
      const { buyButton, availableUnits } = await beforeEach(page, nrgType)
      test.skip(
        availableUnits !== 0,
        'Can only test this with 0 available units',
      )
      expect(
        await buyButton.count(),
        `No available ${nrgType}, Buy button should not be visible`,
      ).toBe(0)
    })

    // define tests for invalid amount
    const invalidAmounts = ['-10', '0.12', 'alpha', '2147483648']
    for (const invalidAmountToBuy of invalidAmounts)
      test(`Buy ${invalidAmountToBuy} units of ${nrgType} when some is available`, async ({
        page,
      }) => {
        const { buyEnergyPage, requiredCell, buyButton, availableUnits } =
          await beforeEach(page, nrgType)
        test.skip(
          availableUnits <= 0,
          'Can only test this with some available units',
        )
        await requiredCell.fill(invalidAmountToBuy, { timeout: 1000 })
        await buyButton.click({ timeout: 1000 })
        await expect(buyEnergyPage.buyAmountError).toBeVisible({
          timeout: 1000,
        })
      })
  }
})
