import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

import Refer from '../fixtures/refer'

test('allows users to withdraw a referral', async ({ page }) => {
  const refer = new Refer(page)

  await refer.submitFullReferral()

  const referralId = page.url().split('/')[6]

  await viewStatusHistoryPage(page, referralId)

  await withdrawReferral(page)
})

const viewStatusHistoryPage = async (page: Page, referralId: string): Promise<void> => {
  await page.goto(`/refer/referrals/${referralId}/status-history`)
  await expect(page.locator('h1')).toHaveText('Referral to Becoming New Me Plus: sexual offence')
}

const withdrawReferral = async (page: Page): Promise<void> => {
  await page.getByRole('button', { name: 'Withdraw referral' }).click()

  await expect(page.locator('h1')).toHaveText('Withdraw referral')
  await page.getByLabel('Administrative error').check()
  await page.getByRole('button', { name: 'Continue' }).click()

  await expect(page.locator('h1')).toHaveText('Withdrawal reason')
  await page.getByLabel('Duplicate referral').check()
  await page.getByRole('button', { name: 'Continue' }).click()

  await expect(page.locator('h1')).toHaveText('Withdraw referral')
  await page.getByRole('textbox').fill('E2E test withdrawal reason')
  await page.getByRole('button', { name: 'Submit' }).click()

  await expect(page.getByTestId('status-history-timeline').locator('.govuk-tag').first()).toHaveText('Withdrawn')
  await expect(page.getByRole('button', { name: 'Withdraw referral' })).toBeDisabled()
}
