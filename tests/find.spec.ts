import { expect, test } from '@playwright/test'

test('has a title and a list of accredited programmes', async ({ page }) => {
  await page.goto('/programmes')
  await expect(page.locator('h1')).toHaveText('List of accredited programmes')
  const courseLinks = await page.locator('div[role="list"] a')
  expect(courseLinks).toHaveText(['Lime Course', 'Azure Course', 'Violet Course'])

  await page.locator('div[role="list"] .govuk-grid-row:first-child a').click()
  await expect(page.locator('h1')).toHaveText('Lime Course')
  await expect(page.locator('.govuk-table__cell:first-child')).toHaveText(['Brixton (HMP)', 'Moorland (HMP & YOI)'])

  await page.locator('.govuk-table__row:first-child > .govuk-table__cell:nth-child(4) > a').click()
  await expect(page.locator('h1')).toHaveText('Lime Course')
  await expect(page.locator('h2')).toHaveText('Brixton (HMP)')
  const mailToLink = page.locator('.govuk-summary-list__value .govuk-link')
  await expect(mailToLink).toHaveAttribute('href', 'mailto:nobody-bxi@digital.justice.gov.uk')
})
