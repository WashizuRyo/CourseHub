import { createReviews, deleteReviews } from '@/lib/data'
import { expect, test } from '@playwright/test'

test.describe('レビュー検索', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/universities/1')
  })

  test.beforeAll(async () => {
    await createReviews('2020-01-01', process.env.USER_ID!)
    await createReviews('2021-01-01', process.env.USER_ID!)
    await createReviews('2022-01-01', process.env.USER_ID!)
  })

  test.afterAll(async () => {
    await deleteReviews('理学部')
  })

  test('ログインせずにレビュー投稿する場合', async ({ page }) => {
    await page.goto('http://localhost:3000/universities/1')
    await page.getByRole('link', { name: '講義レビューを投稿する' }).click()
    await expect(page.getByText('右上のアイコンからログインしてください')).toBeVisible()
  })

  test('学部名でレビューを検索(レビューがある場合)', async ({ page }) => {
    await page.getByLabel('学部で検索').selectOption('理学部')
    await expect(page.getByText('ちぇるちぇる').first()).toBeVisible()
  })

  test('学部名でレビューを検索(レビューがない場合)', async ({ page }) => {
    await page.getByLabel('学部で検索').selectOption('経済部')
    await expect(page.getByText('選択された学部のレビューはまだありません。')).toBeVisible()
  })

  test('授業名でレビューを検索(レビューがある場合)', async ({ page }) => {
    await page.getByPlaceholder('授業名を入力').click()
    await page.getByPlaceholder('授業名を入力').fill('test')
    await expect(page.getByText('ちぇるちぇる').first()).toBeVisible()
  })

  test('ソート機能が正常に動作する', async ({ page }) => {
    await page.goto('http://localhost:3000/universities/1?query=test&page=1&sort=asc')
    await expect(page.getByText('2020-01-01にレビュー')).toBeVisible()
    await expect(page.getByText('2021-01-01にレビュー')).toBeVisible()
  })
})
