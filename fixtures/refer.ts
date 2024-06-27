import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export default class Refer {
  private readonly offeringReferralPathBase: string

  private readonly prisonNumber: string

  private readonly referStartPath: string

  constructor(public readonly page: Page) {
    this.offeringReferralPathBase = '/find/offerings/72820fe9-ad4a-4d1a-b730-ded300075749/referrals'
    this.prisonNumber = 'A8731DY'
    this.referStartPath = `${this.offeringReferralPathBase}/start`
  }

  createDraftReferral = async () => {
    await this.page.getByRole('button', { name: 'Continue' }).click()
    await expect(this.page.locator('h1')).toHaveText('Make a referral')
  }

  async start() {
    await this.page.goto(this.referStartPath)
    await expect(this.page.locator('h1')).toHaveText('Make a referral')
    await expect(this.page.locator('h2.govuk-heading-m:first-of-type')).toHaveText(
      'Whatton (HMP) | Becoming New Me Plus: sexual offence',
    )
    const startButton = this.page.getByRole('button', { name: 'Start now' })
    await expect(startButton).toHaveAttribute('href', `${this.offeringReferralPathBase}/new`)
    startButton.click()
  }

  async search() {
    await expect(this.page.locator('h1')).toHaveText("Enter the person's identifier")
    await this.page
      .getByLabel("Enter the prison number. We'll import their details into your application.")
      .fill(this.prisonNumber)
    await this.page.getByRole('button', { name: 'Continue' }).click()
    await expect(this.page.locator('h1')).toHaveText("Confirm Andrew Smith's details")
    await expect(this.page.locator('.govuk-summary-list__row:nth-child(2) .govuk-summary-list__value')).toHaveText(
      this.prisonNumber,
    )
  }
}
