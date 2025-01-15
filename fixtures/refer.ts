import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export default class Refer {
  private readonly offeringReferralPathBase: string

  private readonly prisonNumber: string

  private readonly referStartPath: string

  constructor(
    public readonly page: Page,
    public readonly offeringId: string,
    public readonly offeringLocation: string,
    public readonly offeringName: string,
  ) {
    this.offeringReferralPathBase = `/find/offerings/${offeringId}/referrals`
    this.offeringLocation = offeringLocation
    this.offeringName = offeringName
    this.prisonNumber = 'A8731DY'
    this.referStartPath = `${this.offeringReferralPathBase}/start`
  }

  async addAndRemoveHold() {
    await this.page.getByRole('button', { name: 'Put on hold' }).click()

    await expect(this.page.locator('h1')).toHaveText('Put referral on hold')
    await this.page.getByRole('textbox').fill('E2E test put on hold reason')
    await this.page.getByRole('button', { name: 'Submit' }).click()

    await expect(this.page.getByTestId('status-history-timeline').locator('.govuk-tag').first()).toHaveText(
      'On hold - referral submitted',
    )

    await this.page.getByRole('button', { name: 'Remove hold' }).click()

    await expect(this.page.locator('h1')).toHaveText('Remove the referral from hold')
    await this.page.getByRole('textbox').fill('E2E test remove hold reason')
    await this.page.getByRole('button', { name: 'Submit' }).click()

    await expect(this.page.getByTestId('status-history-timeline').locator('.govuk-tag').first()).toHaveText(
      'Referral submitted',
    )
  }

  async confirmsOasys() {
    await this.page.getByRole('link', { name: 'Check risks and needs information (OASys)' }).click()
    await expect(this.page.locator('h1')).toHaveText('Check risks and needs information (OASys)')
    await this.page.getByLabel('I confirm that the OASys information is up to date.').check()
    await this.page.getByTestId('oasys-confirmation-submit-button').click()
    await expect(this.page.getByTestId('confirm-oasys-tag')).toHaveText('Completed')
  }

  async completesAReferral() {
    await this.page.locator('input[name="confirmation"]').check()
    await this.page.getByRole('button', { name: 'Submit referral' }).click()
    await expect(this.page.locator('h1')).toHaveText('Referral complete')
  }

  async createDraftReferral() {
    await this.page.getByRole('button', { name: 'Continue' }).click()
    await expect(this.page.locator('h1')).toHaveText('Make a referral')
  }

  async deleteDraftReferral() {
    await this.page.getByRole('button', { name: 'Delete draft referral' }).click()
    await expect(this.page.locator('h1')).toHaveText('Delete draft referral?')
    await this.page.getByRole('button', { name: 'Delete draft' }).click()
    await expect(this.page.getByRole('alert', { name: 'Draft deleted' })).toContainText(
      'Draft referral for Andrew Smith deleted.',
    )
  }

  async entersAdditionalInformation() {
    await this.page.getByRole('link', { name: 'Add additional information' }).click()
    await expect(this.page.locator('h1')).toHaveText('Add additional information')
    await this.page.getByLabel('Provide additional information').fill('Brussel sprouts could be more popular.')
    await this.page.getByTestId('additional-information-submit-button').click()
    await expect(this.page.getByTestId('additional-information-tag')).toHaveText('Completed')
  }

  async addProgrammeHistoryEntry() {
    await this.page.getByTestId('add-history-button').click()

    await expect(this.page.locator('h1')).toHaveText('Add Accredited Programme history')
    await this.page.getByLabel('Horizon', { exact: true }).click()
    await this.page.getByRole('button', { name: 'Continue' }).click()

    await expect(this.page.locator('h1')).toHaveText('Add Accredited Programme details')
    await this.page.getByTestId('custody-setting-option').click()
    await this.page.getByLabel('Enter the prison (if known)').fill('Stocken (HMP)')
    await this.page.getByTestId('complete-outcome-option').click()
    await this.page.getByLabel('Enter the year completed (if known)').fill('2020')
    await this.page.getByLabel('Provide additional detail (if known)').fill('Spiffing')
    await this.page.getByLabel('Provide the source').fill('The person sat next to me')
    await this.page.getByRole('button', { name: 'Continue' }).click()

    await expect(this.page.locator('h1')).toHaveText('Accredited Programme history')
    await expect(this.page.locator('.moj-banner__message')).toContainText('You have successfully added a programme.')
  }

  async viewProgrammeHistory() {
    await this.page.getByRole('link', { name: 'Review Accredited Programme history' }).click()
    await expect(this.page.locator('h1')).toHaveText('Accredited Programme history')
  }

  async removeProgrammeHistoryEntry() {
    const draftHistoryTable = this.page.getByTestId('referral-participations')
    const firstBodyRow = draftHistoryTable.locator('.govuk-table__body').locator('.govuk-table__row').first()
    const actionsCell = firstBodyRow.locator('.govuk-table__cell').last()

    await actionsCell.getByText('Remove').click()

    await expect(this.page.locator('h1')).toHaveText('Remove programme')
    await this.page.getByRole('button', { name: 'Confirm' }).click()

    await expect(this.page.locator('h1')).toHaveText('Accredited Programme history')
    await expect(this.page.locator('.moj-banner__message')).toContainText('You have successfully removed a programme.')
  }

  async returnToTaskList() {
    await this.page.getByRole('button', { name: 'Return to tasklist' }).click()
  }

  async search() {
    await expect(this.page.locator('h1')).toHaveText("Enter the person's identifier")
    await this.page
      .getByLabel("Enter a prison number. We'll import the person's details into the referral.")
      .fill(this.prisonNumber)
    await this.page.getByRole('button', { name: 'Continue' }).click()
    await expect(this.page.locator('h1')).toHaveText("Confirm Andrew Smith's details")
    await expect(this.page.locator('.govuk-summary-list__row:nth-child(2) .govuk-summary-list__value')).toHaveText(
      this.prisonNumber,
    )
  }

  async showsCheckAnswersBeforeSubmitting() {
    await this.page.getByRole('link', { name: 'Check answers and submit' }).click()
    await expect(this.page.locator('h1')).toHaveText('Check your answers')
  }

  async showsPersonalDetails() {
    await this.page.getByRole('link', { name: 'Confirm personal details' }).click()
    await expect(this.page.locator('h1')).toHaveText("Andrew Smith's details")
    await this.page.getByRole('link', { name: 'Back', exact: true }).click()
  }

  async start() {
    await this.page.goto(this.referStartPath)
    await expect(this.page.locator('h1')).toHaveText('Make a referral')
    await expect(this.page.locator('h2.govuk-heading-m:first-of-type')).toHaveText(
      `${this.offeringLocation} | ${this.offeringName}`,
    )
    const startButton = this.page.getByRole('button', { name: 'Start now' })
    await expect(startButton).toHaveAttribute('href', `${this.offeringReferralPathBase}/new`)
    startButton.click()
  }

  async viewStatusHistoryPage(referralId: string) {
    await this.page.goto(`/refer/referrals/${referralId}/status-history`)
    await expect(this.page.locator('h1')).toHaveText(`Referral to ${this.offeringName}`)
  }

  async withdrawReferral() {
    await this.page.getByRole('button', { name: 'Withdraw referral' }).click()

    await expect(this.page.locator('h1')).toHaveText('Withdrawal reason')
    await this.page.getByLabel('Duplicate referral').check()
    await this.page.getByRole('button', { name: 'Continue' }).click()

    await expect(this.page.locator('h1')).toHaveText('Withdraw referral')
    await this.page.getByRole('textbox').fill('E2E test withdrawal reason')
    await this.page.getByRole('button', { name: 'Submit' }).click()

    await expect(this.page.getByTestId('status-history-timeline').locator('.govuk-tag').first()).toHaveText('Withdrawn')
    await expect(this.page.getByRole('button', { name: 'Withdraw referral' })).toBeDisabled()
  }
}
