import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

test('allows users to find a programme and offering', async ({ page }) => {
  await page.goto('/find/programmes')

  await showsListOfProgrammes(page)

  const rowIndexOfBecomingNewMePlusSexualOffence = await getRowIndexOfBecomingNewMePlusSexualOffence(page)

  await page
    .locator(`div[role="list"] > .govuk-grid-row:nth-child(${rowIndexOfBecomingNewMePlusSexualOffence - 1}) a`)
    .click()

  await showsListOfOfferings(page)

  await page.locator('.govuk-table__row:nth-child(7) > .govuk-table__cell:nth-child(4) > a').click()

  await showsSingleOffering(page)
})

const showsListOfProgrammes = async (page: Page): Promise<void> => {
  await expect(page.locator('h1')).toHaveText('Find an Accredited Programme')
  const courseLinks = page.locator('div[role="list"] a')
  expect(courseLinks).toHaveText([
    'Becoming New Me Plus: general violence offence',
    'Becoming New Me Plus: intimate partner violence offence',
    'Becoming New Me Plus: sexual offence',
    'Building Better Relationships',
    'Healthy Identity Intervention',
    'Healthy Sex Programme',
    'Horizon',
    'Identity Matters',
    'Kaizen: general violence offence',
    'Kaizen: intimate partner violence offence',
    'Kaizen: sexual offence',
    'Living as New Me',
    'New Me MOT',
    'New Me Strengths: general violence offence',
    'New Me Strengths: sexual offence',
    'New Me Strengths: intimate partner violence offence',
    'Thinking Skills Programme',
  ])
}

const getRowIndexOfBecomingNewMePlusSexualOffence = async (page: Page): Promise<number> => {
  return page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('.govuk-grid-row'))

    return rows.findIndex(row => {
      return (
        row.querySelector('.govuk-link')?.textContent.trim() === 'Becoming New Me Plus: sexual offence' &&
        row.querySelector('.govuk-tag')?.textContent.trim() === 'Sexual offence'
      )
    })
  })
}

const showsListOfOfferings = async (page: Page): Promise<void> => {
  await expect(page.locator('h1')).toHaveText('Becoming New Me Plus: sexual offence')
  const prisonListItems = page.locator('.govuk-table__cell:first-child')
  await expect(prisonListItems).toHaveText([
    'Bure (HMP)',
    'Hull (HMP & YOI)',
    'Isle Of Wight (HMP & YOI)',
    'Rye Hill (HMP)',
    'Usk (HMP)',
    'Wakefield (HMP)',
    'Whatton (HMP)',
    'Wymott (HMP & YOI)',
  ])
}

const showsSingleOffering = async (page: Page): Promise<void> => {
  await expect(page.locator('h1')).toHaveText('Becoming New Me Plus: sexual offence')
  await expect(page.locator('h2.govuk-heading-m')).toHaveText('Whatton (HMP)')
  const mailToLink = page.locator('.govuk-summary-list__value .govuk-link')
  await expect(mailToLink).toHaveAttribute(
    'href',
    'mailto:whattonprogrammes@justice.gov.uk?subject=Accredited%20programme%20referral%20-%20Whatton%20(HMP)%20-%20Becoming%20New%20Me%20Plus',
  )
  await hasMakeAReferralButtonLink(page)
}

const hasMakeAReferralButtonLink = async (page: Page): Promise<void> => {
  const baseUrl = 'https://accredited-programmes-dev.hmpps.service.justice.gov.uk'
  const currentPath = page.url().replace(baseUrl, '')
  const makeAReferralButton = page.locator('.govuk-button')
  await expect(makeAReferralButton).toHaveAttribute('href', `${currentPath}/referrals/start`)
}
