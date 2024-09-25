import { test } from '@playwright/test'

import Refer from '../fixtures/refer'

test.use({ storageState: 'playwright/.auth/referrerUser.json' })

const offeringId = '72820fe9-ad4a-4d1a-b730-ded300075749'
const offeringLocation = 'Whatton (HMP)'
const offeringName = 'Becoming New Me Plus: sexual offence'

test('allows users to create and delete a draft referral', async ({ page }) => {
  const refer = new Refer(page, offeringId, offeringLocation, offeringName)

  await refer.start()

  await refer.search()

  await refer.createDraftReferral()

  await refer.deleteDraftReferral()
})

test('allows users to submit a referral, put it on hold, remove it from hold and withdraw it', async ({ page }) => {
  const refer = new Refer(page, offeringId, offeringLocation, offeringName)

  await refer.start()

  await refer.search()

  await refer.createDraftReferral()

  await refer.showsPersonalDetails()

  await refer.viewProgrammeHistory()

  await refer.addProgrammeHistoryEntry()

  await refer.removeProgrammeHistoryEntry()

  await refer.returnToTaskList()

  await refer.confirmsOasys()

  await refer.entersAdditionalInformation()

  await refer.showsCheckAnswersBeforeSubmitting()

  await refer.completesAReferral()

  const referralId = page.url().split('/')[6]

  await refer.viewStatusHistoryPage(referralId)

  await refer.addAndRemoveHold()

  await refer.withdrawReferral()
})
