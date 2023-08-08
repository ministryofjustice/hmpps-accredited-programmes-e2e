import { expect, test } from '@playwright/test'

test('sets the Application Insights cookies', async ({ page }) => {
  await page.goto('/')

  let cookies = await page.context().cookies()
  expect(cookies.find(c => c.name === 'ai_user').value).not.toBeUndefined()

  await page.goto('/programmes')

  cookies = await page.context().cookies()
  expect(cookies.find(c => c.name === 'ai_session').value).not.toBeUndefined()
})
