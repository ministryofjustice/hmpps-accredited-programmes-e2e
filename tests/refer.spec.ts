import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

test('allows users to make a referral', async ({ page }) => {
  await page.goto(referStartPath)

  await startsAReferral(page)

  await searchesForAPrisoner(page)

  await asksForPrisonerConfirmation(page)

  // further steps to follow
})

const referStartPath =
  '/programmes/fc51527c-8cf4-4c41-ae37-24db86b46040/offerings/7c7d6059-41da-4d1a-82c4-ef41cb399975/refer'

const prisonNumber = 'A8731DY'

const startsAReferral = async (page: Page): Promise<void> => {
  await expect(page.locator('h1')).toHaveText('Make a referral')
  await expect(page.locator('h2:first-of-type')).toHaveText('Bure (HMP) | Becoming New Me Plus (BNM+)')
  const startButton = page.getByRole('button', { name: 'Start now' })
  await expect(startButton).toHaveAttribute('href', `${referStartPath}/new`)
  startButton.click()
}

const searchesForAPrisoner = async (page: Page): Promise<void> => {
  await expect(page.locator('h1')).toHaveText("Enter the person's identifier")
  await page.getByLabel('Enter identifier').fill(prisonNumber)
  await page.getByRole('button', { name: 'Continue' }).click()
}

const asksForPrisonerConfirmation = async (page: Page): Promise<void> => {
  await expect(page.locator('h1')).toHaveText("Confirm Andrew Smith's details")
  await expect(page.locator('.govuk-summary-list__row:nth-child(2) .govuk-summary-list__value')).toHaveText(
    prisonNumber,
  )
  await expect(page.getByRole('button', { name: 'Continue' })).toHaveCount(1)
}
