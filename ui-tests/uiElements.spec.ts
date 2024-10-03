import { expect } from '@playwright/test'
import dayjs from 'dayjs'
import { testWithFailureScreenshot as test } from './helpers/hooks'
import {
  BasePage,
  HomePage,
  AboutPage,
  ContactPage,
  RegisterPage,
  LoginPage,
  BuyEnergyPage,
  SellEnergyPage,
} from './pages/AllPages'

test.describe('UI Elements', async () => {
  const gotoPageAndCheckElementVisibility = async <T extends BasePage>(
    actualPage: T,
  ) => {
    await actualPage.goto()
    for (const ele of actualPage.getElements()) {
      // console.log(`checking visibility of ${ele}`)
      await expect
        .soft(ele, `Checking visibility of ${ele.toString()}`)
        .toBeVisible()
    }
  }

  test('Home page', async ({ page, baseURL }) => {
    const homePage = new HomePage(page)
    await gotoPageAndCheckElementVisibility(homePage)
    await expect
      .soft(homePage.mainHeading)
      .toHaveText(/^ENSEK Energy Corp.$/, { timeout: 1000 })
    await expect
      .soft(homePage.pageFooter)
      .toHaveText(/^\s*\[For Candidate Testing Purposes Only\]\s*$/, {
        timeout: 1000,
      })
    await expect
      .soft(homePage.buyEnergyHeading)
      .toHaveText(/^Buy some energy$/, { timeout: 1000 })
    await expect
      .soft(homePage.sellEnergyHeading)
      .toHaveText(/^Sell some energy$/, { timeout: 1000 })
    await expect
      .soft(homePage.aboutUsHeading)
      .toHaveText(/^About us$/, { timeout: 1000 })
    await homePage.homeLink.click()
    expect.soft(page.url()).toBe(`${baseURL}${new HomePage(page).url}`)
    await homePage.goto()
    await homePage.aboutLink.click()
    expect.soft(page.url()).toBe(`${baseURL}${new AboutPage(page).url}`)
    await homePage.goto()
    await homePage.contactLink.click()
    expect.soft(page.url()).toBe(`${baseURL}${new ContactPage(page).url}`)
    await homePage.goto()
    await homePage.registerLink.click()
    expect.soft(page.url()).toBe(`${baseURL}${new RegisterPage(page).url}`)
    await homePage.goto()
    await homePage.loginLink.click()
    expect.soft(page.url()).toBe(`${baseURL}${new LoginPage(page).url}`)
    await homePage.goto()
    await homePage.buyEnergyButton.click()
    expect.soft(page.url()).toBe(`${baseURL}${new BuyEnergyPage(page).url}`)
    await homePage.goto()
    await homePage.sellEnergyButton.click()
    expect.soft(page.url()).toBe(`${baseURL}${new SellEnergyPage(page).url}`)
    await homePage.goto()
    await homePage.aboutUsButton.click()
    expect.soft(page.url()).toBe(`${baseURL}${new AboutPage(page).url}`)
    await homePage.goto()
  })

  test('About page', async ({ page }) => {
    const aboutPage = new AboutPage(page)
    await gotoPageAndCheckElementVisibility(aboutPage)
    await expect
      .soft(aboutPage.mainHeading)
      .toHaveText(/^About ENSEK Energy Corp.$/, { timeout: 1000 })
    await aboutPage.findOutMoreButton.click()
    expect.soft(page.url()).toEqual('https://ensek.com/about-us')
    expect
      .soft(page.locator('#main-content'))
      .not.toHaveText('404', { timeout: 1000 })
  })

  test('Contact page', async ({ page }) => {
    const contactPage = new ContactPage(page)
    await gotoPageAndCheckElementVisibility(contactPage)
    await expect(contactPage.mainHeading).toHaveText(/^Contact.$/)
    // here comes checking the contact form when there's one
  })

  test('Register page', async ({ page }) => {
    const registerPage = new RegisterPage(page)
    await gotoPageAndCheckElementVisibility(registerPage)
  })

  test('Login page', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await gotoPageAndCheckElementVisibility(loginPage)
    await expect
      .soft(loginPage.localAuthHeading)
      .toHaveText(/^Use a local account to log in.$/)
    await expect
      .soft(loginPage.externalAuthHeading)
      .toHaveText(/^Use another service to log in.$/)
    await expect
      .soft(loginPage.externalAuthDescription)
      .toHaveText(
        /^There are no external authentication services configured. See this article for details on setting up this ASP.NET application to support logging in via external services.$/,
      )
  })

  test('Buy Energy page', async ({ page, baseURL }) => {
    const buyEnergyPage = new BuyEnergyPage(page)
    await buyEnergyPage.goto()
    await buyEnergyPage.resetButton.click()
    await gotoPageAndCheckElementVisibility(buyEnergyPage)

    await expect
      .soft(
        buyEnergyPage.timeHeading,
        'Subheading should include correct time and day',
      )
      .toHaveText(
        new RegExp(
          `^The time is ${dayjs().format('h:mm A')} on ${dayjs().format('dddd')} and the trading window is open$`,
        ),
        { timeout: 1000 },
      )
    // check table header texts
    ;[
      { ind: 0, label: 'Energy Type' },
      { ind: 1, label: 'Price' },
      { ind: 2, label: 'Quantity of Units Available' },
      { ind: 3, label: 'Number of Units Required' },
      { ind: 4, label: '' },
    ].forEach(async ({ ind, label }) => {
      await expect
        .soft(
          buyEnergyPage.getColumnHeader(ind),
          `Column header should be ${label}`,
        )
        .toHaveText(label, { timeout: 1000 })
    })

    // check table cell contents
    const energySource: {
      [type: string]: { unitPrice: number; unit: string }
    } = {}
    energySource['Gas'] = { unitPrice: 0.34, unit: 'm3' }
    energySource['Nuclear'] = { unitPrice: 0.56, unit: 'MW' }
    energySource['Electricity'] = { unitPrice: 0.47, unit: 'kWh' }
    energySource['Oil'] = { unitPrice: 0.5, unit: 'litres' }
    // table header is index 0, first data row is index 1
    for (let i = 1; i < 5; i++) {
      const typeCell = buyEnergyPage.getCell(i, 0)
      const priceCell = buyEnergyPage.getCell(i, 1)
      const availableCell = buyEnergyPage.getCell(i, 2)
      const requiredCell = buyEnergyPage.getCell(i, 3)
      const type = (await typeCell.textContent({ timeout: 1000 })) || ''
      const nrg = energySource[type]
      expect.soft(nrg).toBeDefined()
      await expect
        .soft(priceCell, `Price of ${type}`)
        .toHaveText(
          new RegExp(`^£${nrg.unitPrice.toFixed(2)} per ${nrg.unit}$`),
          { timeout: 1000 },
        )
      const unitsAvailable = Number(
        await availableCell.textContent({ timeout: 1000 }),
      )
      expect.soft(unitsAvailable, 'Available units').toBeGreaterThanOrEqual(0)
      if (unitsAvailable <= 0)
        await expect
          .soft(requiredCell, `No ${type}, should say 'Not Available'`)
          .toHaveText(/^Not Available$/, { timeout: 1000 })
      else
        await expect
          .soft(
            buyEnergyPage.buyButton(i),
            `${type} is available, Buy button should be visible`,
          )
          .toBeVisible({ timeout: 1000 })
    }

    // For this assignment I'll assume that the discount image is right and the '30%' is a typo
    await expect
      .soft(buyEnergyPage.discountHeading)
      .toHaveText(/^Today we have a special discount of 20% off all Gas!$/, {
        timeout: 1000,
      })
    await expect
      .soft(buyEnergyPage.discountImage)
      .toBeVisible({ timeout: 1000 })

    await buyEnergyPage.backButton.click()
    expect.soft(page.url()).toBe(`${baseURL}${new HomePage(page).url}`)
  })

  test('Sell Energy page', async ({ page }) => {
    const sellEnergyPage = new SellEnergyPage(page)
    await gotoPageAndCheckElementVisibility(sellEnergyPage)

    await expect(sellEnergyPage.mainHeading).toHaveText(
      /^Here to sell some energy\?$/,
      { timeout: 1000 },
    )
  })
})
