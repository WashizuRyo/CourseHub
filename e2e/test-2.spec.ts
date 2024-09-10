import { expect, test } from '@playwright/test';

test('ログインせずにレビュー投稿する場合', async ({ page }) => {
  await page.goto('http://localhost:3000/university/1');
  await page.getByRole('link', { name: '講義レビューを投稿する' }).click();
  await expect(
    page.getByText('右上のアイコンからログインしてください'),
  ).toBeVisible();
});

test('学部名でレビューを検索(レビューがある場合)', async ({ page }) => {
  await page.goto('http://localhost:3000/university/1');
  await page.getByLabel('学部で検索').selectOption('理学部');
  await expect(
    page.locator('div').filter({ hasText: /^TestTanakaTanakaTakahashi$/ }),
  ).toBeVisible();
});

test('学部名でレビューを検索(レビューがない場合)', async ({ page }) => {
  await page.goto('http://localhost:3000/university/1');
  await page.getByLabel('学部で検索').selectOption('経済部');
  await expect(
    page.getByText('選択された学部のレビューはまだありません。'),
  ).toBeVisible();
});

test('授業名でレビューを検索(レビューがある場合)', async ({ page }) => {
  await page.goto('http://localhost:3000/university/1');
  await page.getByPlaceholder('授業名を入力').click();
  await page.getByPlaceholder('授業名を入力').fill('aaaa');
  await expect(page.getByText('TestTanakaTanakaTakahashi')).toBeVisible();
});

test('should first', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page
    .getByRole('tooltip', { name: 'Googleでログイン' })
    .locator('div')
    .nth(2)
    .click();
  await page.getByRole('button', { name: 'Sign in with Google' }).click();
  await page
    .getByLabel('メールアドレスまたは電話番号')
    .fill('mokamikan1027@gmail.com');
  await page.getByLabel('メールアドレスまたは電話番号').press('Enter');
});
