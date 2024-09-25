import type { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test'

export default class Assess {
  private readonly continueButton: Locator

  private readonly submitButton: Locator

  constructor(
    public readonly page: Page,
    public readonly offeringName: string,
  ) {
    this.continueButton = this.page.getByRole('button', { name: 'Continue' })
    this.submitButton = this.page.getByRole('button', { name: 'Submit' })
  }

  async deselectAndClose() {
    await this.startStatusUpdate()

    await this.checkRadioAndContinue('Deselect and close referral')

    await expect(this.page.locator('h1')).toHaveText('Deselection category')
    await this.checkRadioAndContinue('Other')

    await expect(this.page.locator('h1')).toHaveText('Deselect person: close referral')
    await this.enterAdditionalInformation()

    await this.assertStatusHistoryTag('Deselected')
    await expect(this.page.getByRole('button', { name: 'Update status' })).toBeDisabled()
  }

  async deselectAndKeepOpen() {
    await this.startStatusUpdate()

    await this.checkRadioAndContinue('Deselect and keep referral open')

    await expect(this.page.locator('h1')).toHaveText('Deselection category')
    await this.checkRadioAndContinue('Other')

    await expect(this.page.locator('h1')).toHaveText('Deselection: keep referral open')
    await this.checkRadioAndContinue('Assessed as suitable and ready')

    await expect(this.page.locator('h1')).toHaveText('Deselect person: assessed as suitable')
    await this.enterAdditionalInformation()

    await this.assertStatusHistoryTag('Assessed as suitable')
  }

  async updateStatusDecision(decisionLabel: string, decisionHeading?: string, decisionTag?: string) {
    await this.startStatusUpdate()

    await this.checkRadioAndContinue(decisionLabel)

    await expect(this.page.locator('h1')).toHaveText(
      decisionHeading || `Move referral to ${decisionLabel.toLowerCase()}`,
    )
    await this.enterAdditionalInformation()

    await this.assertStatusHistoryTag(decisionTag || decisionLabel)
  }

  async viewStatusHistoryPage(referralId: string) {
    await this.page.goto(`/assess/referrals/${referralId}/status-history`)
    await expect(this.page.locator('h1')).toHaveText(`Referral to ${this.offeringName}`)
  }

  private async assertStatusHistoryTag(tag: string) {
    await expect(this.page.getByTestId('status-history-timeline').locator('.govuk-tag').first()).toHaveText(tag)
  }

  private async checkRadioAndContinue(decisionLabel: string) {
    await this.page.getByLabel(decisionLabel).check()
    await this.continueButton.click()
  }

  private async enterAdditionalInformation() {
    await this.page.getByRole('textbox').fill('E2E test update status')
    await this.submitButton.click()
  }

  private async startStatusUpdate() {
    await this.page.getByRole('button', { name: 'Update status' }).click()
    await expect(this.page.locator('h1')).toHaveText('Update referral status')
  }
}
