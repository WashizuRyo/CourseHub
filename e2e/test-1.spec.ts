import { expect, test } from '@playwright/test';

test('大学名検索', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByPlaceholder('大学名を入力').click();
  await page.getByPlaceholder('大学名を入力').fill('Aichi');
  await page
    .locator('div')
    .filter({ hasText: /^Aichi$/ })
    .nth(3)
    .click();
  await expect(
    page.getByText(
      '授業名で検索学部で検索学部を選んでください理学部工学部文学部経済部 並び替え ： 並び順を選んでください新しい順古い順',
    ),
  ).toBeVisible();
});
