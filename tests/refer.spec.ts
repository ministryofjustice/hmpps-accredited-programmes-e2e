import { test } from '@playwright/test'

import Refer from '../fixtures/refer'

test('allows users to make a referral', async ({ page }) => {
  const refer = new Refer(page)

  await refer.submitFullReferral()
})
