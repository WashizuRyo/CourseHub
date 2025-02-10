import { buildReview, createReview } from '@@/e2e/factories/review'
import { buildUniversity, createUniversity } from '@@/e2e/factories/university'
import { buildToken, createUser } from '@@/e2e/factories/user'
import { expect, test } from '@playwright/test'

test.describe('EditReviewPage', () => {
  const userToken = buildToken({ id: 'dummy1', email: 'test1@example.com', name: 'Sato' })
  test.beforeEach(async () => {
    await createUniversity(buildUniversity({ universityId: 111, universityname: 'Test University111' }))
    await createUser(userToken)
    await createReview(buildReview({ createdBy: 'dummy1', universityId: 111, id: 111, faculty: '工学部' }))
  })

  test('can edit a review successfully', async ({ browser }) => {
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
    await page.goto('/universities/111/reviews/111')

    await page.getByLabel('学部を選択してください').selectOption('理学部')
    await page.getByLabel('授業名を入力してください').fill('testClassName')
    await page.getByLabel('レビュータイトルを入力してください').fill('testTitle')
    await page.getByTestId('star-2').click()
    await page.getByLabel('授業レビューを入力してください').fill('testEvaluation')
    await page.getByLabel('Sato').click()

    await page.getByRole('button', { name: '送信' }).click()
    await page.waitForURL('/universities/111')

    await page.goto('/users/dummy1/reviews')

    expect(page.getByText('理学部')).toBeVisible()
    expect(page.getByText('testClassName')).toBeVisible()
    expect(page.getByText('testTitle').nth(1)).toBeVisible()
    expect(page.getByText('testEvaluation')).toBeVisible()
  })
})
