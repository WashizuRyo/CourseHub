import { expect, test } from '@playwright/test'

test('user can sign in and sign out successfully', async ({ page }) => {
  // login
  await page.goto('/api/auth/signin?callbackUrl=http://localhost:1111/')
  await page.getByLabel('Password').fill('password')
  await page.getByRole('button', { name: 'Sign in with Password' }).click()

  // logout
  await page.waitForURL('/')
  await page.locator('div#user-avatar').hover()
  const username = await page.locator('#username').textContent()
  await page.locator('div#tooltip').hover()
  const signOutButton = await page.locator('button').textContent()
  await page.locator('button:has-text("ログアウト")').click()
  const signInButton = await page.locator('button:has-text("Googleでログイン")').textContent()

  expect(username).toBe('Bob Alice')
  expect(signOutButton).toBe('ログアウト')
  expect(signInButton).toBe('Googleでログイン')
})
