import { test as setup } from '@playwright/test'

const authFile = 'playwright/.auth/user.json'

setup('authenticate', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Username').fill(process.env.HMPPS_AUTH_USERNAME as string)
  await page.getByLabel('Password').fill(process.env.HMPPS_AUTH_PASSWORD as string)
  await page.getByRole('button', { name: 'Sign in' }).click()

  await page.context().storageState({ path: authFile })
})
