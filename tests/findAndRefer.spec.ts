import { test } from '@playwright/test'

import Find from 'fixtures/find'
import Refer from 'fixtures/refer'

test.use({ storageState: 'playwright/.auth/referrerUser.json' })

const offeringId = '72820fe9-ad4a-4d1a-b730-ded300075749'
const offeringLocation = 'Whatton (HMP)'
const programmeName = 'Becoming New Me Plus: sexual offence'
const programmeOfferings = [
  'Bure (HMP)',
  'Hull (HMP & YOI)',
  'Isle Of Wight (HMP & YOI)',
  'Rye Hill (HMP)',
  'Wakefield (HMP)',
  'Whatton (HMP)',
]

test('allows users to find a programme and offering, create and submit a referral, put it on hold, remove it from hold and withdraw it', async ({
  page,
}) => {
  const find = new Find(page, programmeName, programmeOfferings)
  const refer = new Refer(page, offeringId, offeringLocation, programmeName)

  await find.findProgrammesForPrisoner()

  await find.selectProgrammeAndOffering(programmeName, offeringLocation)

  await refer.start()

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

test('allows users to create and delete a draft referral', async ({ page }) => {
  const find = new Find(page, programmeName, programmeOfferings)
  const refer = new Refer(page, offeringId, offeringLocation, programmeName)

  await find.findProgrammesForPrisoner()

  await find.selectProgrammeAndOffering(programmeName, offeringLocation)

  await refer.start()

  await refer.createDraftReferral()

  await refer.deleteDraftReferral()
})
