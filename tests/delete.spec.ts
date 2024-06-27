import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

import Refer from '../fixtures/refer'

test('allows user to delete a draft referral', async ({ page }) => {
  const refer = new Refer(page)

  await refer.start()

  await refer.search()

  await refer.createDraftReferral()

  await deleteDraftReferral(page)
})

const deleteDraftReferral = async (page: Page): Promise<void> => {
  await page.getByRole('button', { name: 'Delete draft referral' }).click()
  await expect(page.locator('h1')).toHaveText('Delete draft referral?')
  await page.getByRole('button', { name: 'Delete draft' }).click()
  await expect(page.getByRole('alert', { name: 'Draft deleted' })).toContainText(
    'Draft referral for Andrew Smith deleted.',
  )
}
