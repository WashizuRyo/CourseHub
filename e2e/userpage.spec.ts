import { createLikes, createReviews, createUniversity, createUser, deleteReviews, fetchReviewId } from '@/lib/data'
import { expect, test } from '@playwright/test'

test.describe('ユーザページ', () => {
  test.beforeAll(async () => {
    //レビューを投稿する
    const testUser = await createUser('test@a.aasfdas')
    await createUniversity('fsda')
    await createReviews('2020-01-01', testUser.id)
    await createReviews('2021-01-01', testUser.id)

    // // reviewIdを取得する
    const reviewId = await fetchReviewId('2020-01-01')

    // // レビューにいいねする
    await createLikes(Number(reviewId))
  })

  test.afterAll(async () => {
    await deleteReviews('理学部')
  })

  test('ユーザページのいいね欄にいいねしたレビューが表示される', async ({ page }) => {
    // ログインする
    await page.goto('http://localhost:3000/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F')
    await page.getByLabel('Password').fill('password')
    await page.getByRole('button', { name: 'Sign in with Password' }).click()

    // ユーザページに遷移する
    await page.waitForURL('http://localhost:3000/')
    await page.locator('div#user-avatar').hover()
    await page.getByRole('link', { name: 'Bob Alice' }).click()
    await page.getByRole('link', { name: 'いいね' }).click()

    // いいねしたレビューが表示される
    await expect(page.getByText('test').first()).toBeVisible()
  })

  test('ユーザページに投稿したレビューが表示される', async ({ page }) => {
    // ログインする
    await page.goto('http://localhost:3000/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F')
    await page.getByLabel('Password').fill('password')
    await page.getByRole('button', { name: 'Sign in with Password' }).click()

    // ユーザページに遷移する
    await page.waitForURL('http://localhost:3000/')
    await page.locator('div#user-avatar').hover()
    await page.getByRole('link', { name: 'Bob Alice' }).click()

    // 投稿したレビューが表示される
    await expect(page.getByText('test').first()).toBeVisible()
  })
})
