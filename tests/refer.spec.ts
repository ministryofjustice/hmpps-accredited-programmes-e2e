import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

test('allows users to make a referral', async ({ page }) => {
  await page.goto(
    '/programmes/fc51527c-8cf4-4c41-ae37-24db86b46040/offerings/7c7d6059-41da-4d1a-82c4-ef41cb399975/refer',
  )

  await showsStartReferralPage(page)

  // further steps to follow
})

const showsStartReferralPage = async (page: Page): Promise<void> => {
  await expect(page.locator('h1')).toHaveText('Make a referral')
  await expect(page.locator('h2:first-of-type')).toHaveText('Bure (HMP) | Becoming New Me Plus (BNM+)')
  hasStartButtonLink(page)
}

const hasStartButtonLink = async (page: Page): Promise<void> => {
  const makeAReferralButton = page.locator('.govuk-button')
  await expect(makeAReferralButton).toHaveAttribute('href', '#')
}
