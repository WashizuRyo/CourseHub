import { buildReview, createReview } from '@@/e2e/factories/review'
import { buildUniversity, createUniversity } from '@@/e2e/factories/university'
import { buildToken, createUser } from '@@/e2e/factories/user'
import { expect, test } from '@playwright/test'

test.describe('DeleteReviewPage', () => {
  const userToken = buildToken({ id: 'dummy11', email: 'test11@example.com' })
  test.beforeEach(async () => {
    await createUniversity(buildUniversity({ universityId: 1111, universityname: 'Test University111111' }))
    await createUser(userToken)
    await createReview(
      buildReview({
        createdBy: 'dummy11',
        universityId: 1111,
        id: 1111,
        className: 'testClassName',
        title: 'testTitle',
        evaluation: 'testEvaluation',
      }),
    )
  })

  test('can delete a review successfully', async ({ browser }) => {
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
    await page.goto('/users/dummy11/reviews')
    await page.getByTestId('modalOpenButton').click()
    await page.getByTestId('deleteButton').click()
    await page.reload()

    expect(page.getByText('投稿したレビューがありません')).toBeVisible()
  })
})
