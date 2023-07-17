import { expect, test } from '@playwright/test'

test('has a title and a list of accredited programmes', async ({ page }) => {
  await page.goto('/programmes')
  await expect(page.locator('h1')).toHaveText('List of accredited programmes')
  const courseLinks = await page.locator('div[role="list"] a')
  expect(courseLinks).toHaveText([
    'Becoming New Me Plus (BNM+)',
    'Becoming New Me Plus (BNM+)',
    'Becoming New Me Plus (BNM+)',
    'Building Better Relationships (BBR)',
    'Healthy Identity Intervention (HII)',
    'Healthy Sex Programme (HSP)',
    'Horizon',
    'Identity Matters (IM)',
    'Identity Matters (IM)',
    'Kaizen',
    'Kaizen',
    'Kaizen',
    'Living as New Me (LNM)',
    'New Me Strengths (NMS)',
    'New Me Strengths (NMS)',
    'New Me Strengths (NMS)',
    'Thinking Skills Programme (TSP)',
  ])

  await page.locator('div[role="list"] .govuk-grid-row:first-child a').click()
  await expect(page.locator('h1')).toHaveText('Becoming New Me Plus (BNM+)')
  await expect(page.locator('.govuk-table__cell:first-child')).toHaveText([
    'Bure (HMP)',
    'Hull (HMP & YOI)',
    'Isle Of Wight (HMP & YOI)',
    'Swinfen Hall (HMP & YOI)',
    'Usk (HMP)',
    'Wakefield (HMP)',
    'Whatton (HMP)',
    'Wymott (HMP & YOI)',
  ])

  await page.locator('.govuk-table__row:first-child > .govuk-table__cell:nth-child(4) > a').click()
  await expect(page.locator('h1')).toHaveText('Becoming New Me Plus (BNM+)')
  await expect(page.locator('h2')).toHaveText('Bure (HMP)')
  const mailToLink = page.locator('.govuk-summary-list__value .govuk-link')
  await expect(mailToLink).toHaveAttribute(
    'href',
    'mailto:obpbure@justice.gov.uk?subject=Accredited%20programme%20referral%20-%20Bure%20(HMP)%20-%20Becoming%20New%20Me%20Plus',
  )
})
