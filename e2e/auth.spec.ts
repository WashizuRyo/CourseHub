import { expect, test } from '@playwright/test';

test('ログインしてログアウトできる', async ({ page }) => {
  await page.goto(
    'http://localhost:3000/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F',
  );
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Sign in with Password' }).click();

  await page.waitForURL('http://localhost:3000/');
  await page.locator('div#user-avatar').hover();

  const username = await page.locator('#username').textContent();
  expect(username).toBe('Bob Alice');

  await page.locator('div#tooltip').hover();
  const signOut = await page.locator('button').textContent();
  expect(signOut).toBe('ログアウト');

  await page.locator('button:has-text("ログアウト")').click();

  const signInButton = await page
    .locator('button:has-text("Googleでログイン")')
    .textContent();
  expect(signInButton).toBe('Googleでログイン');
});
