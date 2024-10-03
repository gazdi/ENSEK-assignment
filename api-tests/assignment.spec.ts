import dayjs from 'dayjs'
import { APIResponse, expect, request } from '@playwright/test'
import { testWithAccessToken as test } from './helpers/hooks'

type FuelTypeModel = {
  name?: string
  energy_id: number
  price_per_unit: number
  quantity_of_units: number
  unit_type: string
  orderId?: string
}
let fuelTypes: FuelTypeModel[] = []

test.describe('basic assignment flow', async () => {
  test.describe.configure({ mode: 'serial' })

  test('Reset the test data', async ({ request, accessToken }) => {
    const resetResponse = await request.post('reset', {
      headers: { Authorization: `Bearer ${accessToken}` },
      data: {},
    })
    expect(resetResponse.ok()).toBeTruthy()
  })

  test('Get fuel info', async ({ request, accessToken }) => {
    const energyResponse = await request.get('energy', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    expect(energyResponse.ok()).toBeTruthy()
    const energyJson = await energyResponse.json()
    for (const fuelType of Object.entries(energyJson)) {
      fuelTypes.push({
        name: fuelType[0],
        ...(fuelType[1] as FuelTypeModel),
      })
    }
  })

  test(`Buy a quantity of each fuel`, async ({ request, accessToken }) => {
    for (const fuelType of fuelTypes) {
      let reqUnits: number
      let reqUnittype: string
      let reqTotalCost: number
      let reqRemaining: number
      let buyResponse: APIResponse

      await test.step(`Order ${fuelType.name}`, async () => {
        // what to buy
        reqUnits = fuelType.quantity_of_units / 2
        reqUnittype = fuelType.unit_type
        reqTotalCost = reqUnits * fuelType.price_per_unit
        reqRemaining = fuelType.quantity_of_units - reqUnits
        // purchase
        buyResponse = await request.put(
          `buy/${fuelType.energy_id}/${reqUnits}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        )
        expect(buyResponse.ok()).toBeTruthy()
      })

      await test.step(`Verify ${fuelType.name} purchase`, async () => {
        const boughtJson = await buyResponse.json()
        expect(boughtJson.message).toBeDefined()
        if (fuelType.quantity_of_units === 0)
          expect
            .soft(boughtJson.message)
            .toEqual('There is no nuclear fuel to purchase!')
        else {
          // TODO: refactor this hardcoded mess into a nice response map
          const responseWords = String(boughtJson.message).split(/\s/)
          const respUnits = Number(responseWords[3])
          const respUnittype = responseWords[4]
          const respTotalCost = Number(responseWords[9])
          const respRemaining = Number(responseWords[12])
          const respOrderId = responseWords[responseWords.length - 1].slice(
            0,
            -1,
          )
          expect
            .soft(respUnits, `Bought units of ${fuelType.name}`)
            .toEqual(reqUnits)
          expect
            .soft(respUnittype, `Unittype of ${fuelType.name}`)
            .toEqual(reqUnittype)
          expect
            .soft(
              respTotalCost,
              `Total cost of ${reqUnits}${reqUnittype} of ${fuelType.name} at ${fuelType.price_per_unit}/${reqUnittype}`,
            )
            .toEqual(reqTotalCost)
          expect
            .soft(respOrderId, 'order id at the end of the message')
            .toBeDefined()
        }
      })
    }
  })
})

test.describe('Other API tests', async () => {
  test('Confirm how many orders were created before the current date', async ({
    request,
    accessToken,
  }) => {
    const ordersResponse = await request.get('orders')
    expect(ordersResponse.ok()).toBeTruthy

    const orders = await ordersResponse.json()
    expect(orders).toBeDefined()
    const numOldOrders = (orders as any[]).reduce(
      (prev: number, currentOrder) =>
        dayjs(currentOrder.time).isBefore(dayjs(), 'day') ? prev + 1 : prev,
      0,
    )
    await test.info().attach(`Found ${numOldOrders} orders placed before today`)
  })
})
