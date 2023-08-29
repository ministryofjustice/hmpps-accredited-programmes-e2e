import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

test('allows users to find a programme and offering', async ({ page }) => {
  await page.goto('/programmes')

  await showsListOfProgrammes(page)

  await page.locator('div[role="list"] > .govuk-grid-row:first-child a').click()

  await showsListOfOfferings(page)

  await page.locator('.govuk-table__row:first-child > .govuk-table__cell:nth-child(4) > a').click()

  await showsSingleOffering(page)
})

const showsListOfProgrammes = async (page: Page): Promise<void> => {
  await expect(page.locator('h1')).toHaveText('List of accredited programmes')
  const courseLinks = page.locator('div[role="list"] a')
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
}

const showsListOfOfferings = async (page: Page): Promise<void> => {
  await expect(page.locator('h1')).toHaveText('Becoming New Me Plus (BNM+)')
  const prisonListItems = page.locator('.govuk-table__cell:first-child')
  await expect(prisonListItems).toHaveText([
    'Bure (HMP)',
    'Hull (HMP & YOI)',
    'Isle Of Wight (HMP & YOI)',
    'Swinfen Hall (HMP & YOI)',
    'Usk (HMP)',
    'Wakefield (HMP)',
    'Whatton (HMP)',
    'Wymott (HMP & YOI)',
  ])
}

const showsSingleOffering = async (page: Page): Promise<void> => {
  await expect(page.locator('h1')).toHaveText('Becoming New Me Plus (BNM+)')
  await expect(page.locator('h2')).toHaveText('Bure (HMP)')
  const mailToLink = page.locator('.govuk-summary-list__value .govuk-link')
  await expect(mailToLink).toHaveAttribute(
    'href',
    'mailto:obpbure@justice.gov.uk?subject=Accredited%20programme%20referral%20-%20Bure%20(HMP)%20-%20Becoming%20New%20Me%20Plus',
  )
  await hasMakeAReferralButtonLink(page)
}

const hasMakeAReferralButtonLink = async (page: Page): Promise<void> => {
  const baseUrl = 'https://accredited-programmes-dev.hmpps.service.justice.gov.uk'
  const currentPath = page.url().replace(baseUrl, '')
  const makeAReferralButton = page.locator('.govuk-button')
  await expect(makeAReferralButton).toHaveAttribute('href', `${currentPath}/referrals/start`)
}
