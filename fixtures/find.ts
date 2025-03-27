import { type Page, expect } from '@playwright/test'

import playwrightConfig from 'playwright.config'

class Find {
  private readonly prisonNumber: string

  constructor(
    public readonly page: Page,
    public readonly programmeName: string,
    public readonly programmeOfferings: Array<string>,
  ) {
    this.prisonNumber = 'A8731DY'
    this.programmeName = programmeName
    this.programmeOfferings = programmeOfferings
  }

  async findProgrammesForPrisoner() {
    await this.page.goto('/find')
    await expect(this.page.locator('h1')).toHaveText('Find recommended programmes')
    await this.page
      .getByLabel(
        "Enter a prison number to check what programmes are recommended based on the person's risks and needs.",
      )
      .fill(this.prisonNumber)
    await this.page.getByRole('button', { name: 'Continue' }).click()
    await expect(this.page.locator('h1')).toHaveText('Recommended programme pathway for Andrew Smith')
    await this.page.getByRole('button', { name: 'See all programmes', exact: true }).click()
    await showsListOfProgrammes(this.page)
  }

  async selectProgrammeAndOffering(courseName: string, offeringLocation: string) {
    await this.page.getByRole('link', { name: courseName, exact: true }).click()
    await showsListOfOfferings(this.page, this.programmeName, this.programmeOfferings)
    await this.page.getByRole('link', { name: offeringLocation, exact: true }).click()
    await showsSingleOffering(this.page, this.programmeName)
  }
}

const showsListOfProgrammes = async (page: Page): Promise<void> => {
  await expect(page.locator('h1')).toHaveText('Accredited Programmes')
  const courseLinks = page.locator('div[role="list"] a')
  expect(courseLinks).toHaveText([
    'Becoming New Me Plus: general violence offence',
    'Becoming New Me Plus: intimate partner violence offence',
    'Becoming New Me Plus: sexual offence',
    'Building Better Relationships',
    'Building Choices: high intensity',
    'Building Choices: moderate intensity',
    'Control of Violence for Angry Impulsive Drinkers',
    'Healthy Identity Intervention',
    'Healthy Sex Programme',
    'Horizon',
    'Identity Matters',
    'Kaizen: general violence offence',
    'Kaizen: sexual offence',
    'Kaizen: intimate partner violence offence',
    'Living as New Me',
    'New Me MOT',
    'New Me Strengths: general violence offence',
    'New Me Strengths: sexual offence',
    'New Me Strengths: intimate partner violence offence',
    'Thinking Skills Programme',
  ])
}

const showsListOfOfferings = async (
  page: Page,
  programmeName: string,
  programmeOfferings: Array<string>,
): Promise<void> => {
  await expect(page.locator('h1')).toHaveText(programmeName)
  const prisonListItems = page.locator('.govuk-table__cell:first-child')
  await expect(prisonListItems).toHaveText(programmeOfferings)
}

const showsSingleOffering = async (page: Page, programmeName: string): Promise<void> => {
  await expect(page.locator('h1')).toHaveText(programmeName)
  await expect(page.locator('h2.govuk-heading-m')).toHaveText('Whatton (HMP)')
  await hasMakeAReferralButtonLink(page)
}

const hasMakeAReferralButtonLink = async (page: Page): Promise<void> => {
  const currentPath = page.url().replace(playwrightConfig.use.baseURL, '')
  const makeAReferralButton = page.locator('.govuk-button')
  await expect(makeAReferralButton).toHaveAttribute('href', `${currentPath}/referrals/start`)
}

export default Find
