import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

test('allows users to make a referral', async ({ page }) => {
  await page.goto(referStartPath)

  await startsAReferral(page)

  await searchesForAPrisoner(page)

  await createsAReferral(page)

  await showsCheckAnswersBeforeSubmitting(page)

  // further steps to follow
})

const offeringReferralPathBase = '/offerings/7c7d6059-41da-4d1a-82c4-ef41cb399975/referrals'
const referStartPath = `${offeringReferralPathBase}/start`

const prisonNumber = 'A8731DY'

const startsAReferral = async (page: Page): Promise<void> => {
  await expect(page.locator('h1')).toHaveText('Make a referral')
  await expect(page.locator('h2:first-of-type')).toHaveText('Bure (HMP) | Becoming New Me Plus (BNM+)')
  const startButton = page.getByRole('button', { name: 'Start now' })
  await expect(startButton).toHaveAttribute('href', `${offeringReferralPathBase}/new`)
  startButton.click()
}

const searchesForAPrisoner = async (page: Page): Promise<void> => {
  await expect(page.locator('h1')).toHaveText("Enter the person's identifier")
  await page.getByLabel('Enter identifier').fill(prisonNumber)
  await page.getByRole('button', { name: 'Continue' }).click()
  await expect(page.locator('h1')).toHaveText("Confirm Andrew Smith's details")
  await expect(page.locator('.govuk-summary-list__row:nth-child(2) .govuk-summary-list__value')).toHaveText(
    prisonNumber,
  )
}

const createsAReferral = async (page: Page): Promise<void> => {
  await page.getByRole('button', { name: 'Continue' }).click()
  await expect(page.locator('h1')).toHaveText('Make a referral')
}

const showsCheckAnswersBeforeSubmitting = async (page: Page): Promise<void> => {
  await page.getByRole('link', { name: 'Check answers and submit' }).click()
  await expect(page.locator('h1')).toHaveText('Check your answers')
}
