import { createUniversity, saveTestUser } from '@/lib/data'
import { expect, test } from '@playwright/test'

test.describe('NewReviewPage', () => {
  const userToken = {
    name: 'Test User',
    email: 'user@example.com',
    image: 'https://avatars.githubusercontent.com/u/000000',
    id: 'dummy',
  }
  test.beforeEach(async () => {
    await createUniversity('testUniversitya')
    await saveTestUser(userToken)
  })

  test('can create a new review successfully', async ({ browser }) => {
    const context = await browser.newContext()
    await context.addCookies([
      {
        name: 'authjs.session-token',
        value: btoa(JSON.stringify(userToken)),
        domain: 'localhost:1111',
        path: '/',
      },
    ])

    const page = await context.newPage()
    await page.goto('/universities/1/reviews/new')

    await page.getByLabel('学部を選択してください').selectOption('理学部')
    await page.getByLabel('授業名を入力してください').fill('testClassName')
    await page.getByLabel('レビュータイトルを入力してください').fill('testTitle')
    await page.getByTestId('star-2').click()
    await page.getByLabel('授業レビューを入力してください').fill('testEvaluation')
    await page.getByLabel('Test User').click()
    await page.getByRole('button', { name: '送信' }).click()

    await page.goto('/users/dummy/reviews')
    expect(page.getByText('理学部')).toBeVisible()
    expect(page.getByText('testClassName')).toBeVisible()
    expect(page.getByText('testTitle').nth(1)).toBeVisible()
    expect(page.getByText('testEvaluation')).toBeVisible()
  })
})
