import { test } from '@playwright/test'

import Assess from '../fixtures/assess'
import Refer from '../fixtures/refer'

test.use({ storageState: 'playwright/.auth/ptUser.json' })

const offeringId = '1f9441c1-4fc0-4127-a2ef-88be481fba1c'
const offeringLocation = 'Whatton (HMP)'
const offeringName = 'Horizon'

test('allows an assess user to update the status of a referral', async ({ page }) => {
  const refer = new Refer(page, offeringId, offeringLocation, offeringName)

  await refer.start()

  await refer.search()

  await refer.createDraftReferral()

  await refer.showsPersonalDetails()

  await refer.viewProgrammeHistory()

  await refer.returnToTaskList()

  await refer.confirmsOasys()

  await refer.entersAdditionalInformation()

  await refer.showsCheckAnswersBeforeSubmitting()

  await refer.completesAReferral()

  const referralId = page.url().split('/')[6]

  const assess = new Assess(page, offeringName)

  await assess.viewStatusHistoryPage(referralId)

  await assess.updateStatusDecision('Awaiting assessment')

  await assess.updateStatusDecision('Assessment started')

  await assess.updateStatusDecision(
    'Assessed as suitable and ready to continue',
    'Move referral to assessed as suitable',
    'Assessed as suitable',
  )

  await assess.updateStatusDecision('On programme')

  await assess.deselectAndKeepOpen()

  await assess.updateStatusDecision('On programme')

  await assess.deselectAndClose()
})
