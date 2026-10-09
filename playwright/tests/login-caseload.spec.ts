import { test, expect } from '@playwright/test';

// Unexecuted: password-step controls require live confirmation.
// Caseload search and result locators were confirmed in the manual run.
test('existing-account login → search fictional student → verify result', async ({ page }) => {
  const email = process.env.TEST_EMAIL;
  const password = process.env.TEST_PASSWORD;
  if (!email || !password) throw new Error('Set TEST_EMAIL and TEST_PASSWORD securely.');

  await test.step('Log in to the existing account', async () => {
    await page.goto('/signin');
    await page.getByRole('textbox', { name: 'Email', exact: true }).fill(email);
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    // Confirm these two locators on the password step before running.
    await page.getByLabel(/^Password$/i).fill(password);
    await page.getByRole('button', { name: /^(Log in|Sign in|Continue)$/i }).click();
    await expect(page.getByRole('link', { name: 'Caseload', exact: true })).toBeVisible();
  });

  await test.step('Find the fictional record created during manual testing', async () => {
    await page.getByRole('link', { name: 'Caseload', exact: true }).click();
    await page.getByRole('tab', { name: 'Caseload Table View', exact: true }).click();
    const search = page.getByRole('searchbox', { name: 'Search students...' });
    await search.fill('QA-Fable');
    await expect(page.getByRole('gridcell', { name: 'QA-Fable Moon-Quill', exact: true })).toHaveCount(1);
    await expect(page.getByRole('gridcell', { name: 'Fictional Star & Moon', exact: true })).toBeVisible();
    await search.fill('QA-NoSuch-Fictional-Record');
    await expect(page.getByText('No matching results found', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Clear search', exact: true }).click();
    await expect(page.getByRole('gridcell', { name: 'QA-Fable Moon-Quill', exact: true })).toBeVisible();
  });
});
