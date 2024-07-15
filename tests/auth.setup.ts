import { test as setup } from '@playwright/test'

const referrerAuthFile = 'playwright/.auth/referrerUser.json'

setup('authenticate as referrer user', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Username').fill(process.env.HMPPS_AUTH_USERNAME as string)
  await page.getByLabel('Password').fill(process.env.HMPPS_AUTH_PASSWORD as string)
  await page.getByRole('button', { name: 'Sign in' }).click()

  await page.context().storageState({ path: referrerAuthFile })
})

const ptAuthFile = 'playwright/.auth/ptUser.json'

setup('authenticate as PT user', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Username').fill(process.env.HMPPS_AUTH_USERNAME as string)
  await page.getByLabel('Password').fill(process.env.HMPPS_AUTH_PASSWORD as string)
  await page.getByRole('button', { name: 'Sign in' }).click()

  await page.context().storageState({ path: ptAuthFile })
})
