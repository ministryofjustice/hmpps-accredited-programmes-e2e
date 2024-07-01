import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

import Refer from '../fixtures/refer'

test('allows users to make a referral', async ({ page }) => {
  const refer = new Refer(page)

  await refer.start()

  await refer.search()

  await refer.createDraftReferral()

  await showsPersonalDetails(page)

  await entersProgrammeHistory(page)

  await confirmsOasys(page)

  await entersAdditionalInformation(page)

  await showsCheckAnswersBeforeSubmitting(page)

  await completesAReferral(page)
})

const showsPersonalDetails = async (page: Page): Promise<void> => {
  await page.getByRole('link', { name: 'Confirm personal details' }).click()
  await expect(page.locator('h1')).toHaveText("Andrew Smith's details")
  await page.getByRole('link', { name: 'Back', exact: true }).click()
}

const entersProgrammeHistory = async (page: Page): Promise<void> => {
  await page.getByRole('link', { name: 'Review Accredited Programme history' }).click()

  await expect(page.locator('h1')).toHaveText('Accredited Programme history')
  await page.getByTestId('add-history-button').click()

  await expect(page.locator('h1')).toHaveText('Add Accredited Programme history')
  await page.getByLabel('Horizon', { exact: true }).click()
  await page.getByRole('button', { name: 'Continue' }).click()

  await expect(page.locator('h1')).toHaveText('Add Accredited Programme details')
  await page.getByTestId('custody-setting-option').click()
  await page.getByLabel('Enter the prison (if known)').fill('Stocken (HMP)')
  await page.getByTestId('complete-outcome-option').click()
  await page.getByLabel('Enter the year completed (if known)').fill('2020')
  await page.getByLabel('Provide additional detail (if known)').fill('Spiffing')
  await page.getByLabel('Provide the source').fill('The person sat next to me')
  await page.getByRole('button', { name: 'Continue' }).click()

  await expect(page.locator('h1')).toHaveText('Accredited Programme history')
  await expect(page.locator('.moj-banner__message')).toContainText('You have successfully added a programme.')
  const summaryCard = page.locator('.govuk-summary-card').last()
  await expect(summaryCard.locator('.govuk-summary-card__title')).toContainText('Horizon')
  await summaryCard.locator('.govuk-summary-card__action').last().click()

  await expect(page.locator('h1')).toHaveText('Remove programme')
  await page.getByRole('button', { name: 'Confirm' }).click()

  await expect(page.locator('h1')).toHaveText('Accredited Programme history')
  await expect(page.locator('.moj-banner__message')).toContainText('You have successfully removed a programme.')
  await page.getByRole('button', { name: 'Return to tasklist' }).click()
}

const confirmsOasys = async (page: Page): Promise<void> => {
  await page.getByRole('link', { name: 'Confirm the OASys information' }).click()
  await expect(page.locator('h1')).toHaveText('Confirm the OASys information')
  await page.getByLabel('I confirm that the OASys information is up to date.').check()
  await page.getByTestId('oasys-confirmation-submit-button').click()
  await expect(page.getByTestId('confirm-oasys-tag')).toHaveText('Completed')
}

const entersAdditionalInformation = async (page: Page): Promise<void> => {
  await page.getByRole('link', { name: 'Add additional information' }).click()
  await expect(page.locator('h1')).toHaveText('Add additional information')
  await page.getByLabel('Provide additional information').fill('Brussel sprouts could be more popular.')
  await page.getByTestId('additional-information-submit-button').click()
  await expect(page.getByTestId('additional-information-tag')).toHaveText('Completed')
}

const showsCheckAnswersBeforeSubmitting = async (page: Page): Promise<void> => {
  await page.getByRole('link', { name: 'Check answers and submit' }).click()
  await expect(page.locator('h1')).toHaveText('Check your answers')
}

const completesAReferral = async (page: Page): Promise<void> => {
  await page.locator('input[name="confirmation"]').check()
  await page.getByRole('button', { name: 'Submit referral' }).click()
  await expect(page.locator('h1')).toHaveText('Referral complete')
}
