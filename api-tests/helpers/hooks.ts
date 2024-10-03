import { test as testbase, expect } from '@playwright/test'

export const testWithAccessToken = testbase.extend<{
  accessToken: string
}>({
  accessToken: [
    async ({ request }, use) => {
      // fixture setup a.k.a. BeforeEach
      // get the Bearer token
      const resp = await request.post('login', {
        data: {
          username: 'test',
          password: 'testing',
        },
      })
      expect(resp.status()).toBe(200)
      const respJson = await resp.json()
      expect(respJson).toBeDefined()
      expect(respJson.message).toBe('Success')
      const accessToken = respJson.access_token

      // execute the test
      await use(accessToken)

      // fixture teardown a.k.a. AfterEach
    },
    { auto: true },
  ],
})
