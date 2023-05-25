import { test, expect } from '@playwright/test';

test('has a title and a list of accredited programmes', async ({ page }) => {
  await page.goto('https://accredited-programmes-dev.hmpps.service.justice.gov.uk/programmes')

  await expect(page.locator('h1')).toHaveText("List of accredited programmes");
  await expect(page.locator('div[role="listitem"] a')).toHaveText(['Thinking Skills Programme', 'Becoming new me +', 'New me strengths']);
});
