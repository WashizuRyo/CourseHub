import { buildReview, createReview } from '@@/e2e/factories/review'
import { buildUniversity, createUniversity } from '@@/e2e/factories/university'
import { buildToken, createUser } from '@@/e2e/factories/user'
import { expect, test } from '@playwright/test'

test.describe('ReviewLike', () => {
  const userToken = buildToken({ id: 'dummy2', email: 'test2@example.com', name: 'Test' })
  test.beforeEach(async () => {
    await createUniversity(buildUniversity({ universityId: 333, universityname: 'Test University2' }))
    await createUser(userToken)
    await createReview(
      buildReview({
        createdBy: 'dummy2',
        universityId: 333,
        id: 222,
        faculty: '工学部',
        className: 'testClassName',
        title: 'testTitle',
        star: 5,
        evaluation: 'testEvaluation',
      }),
    )
  })

  test('can click a like button successfully', async ({ browser }) => {
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
    await page.goto('/users/dummy2/reviews')

    await page.getByTestId('likeButton').click()
    await page.goto('/users/dummy2/likes')
    await page.waitForURL('/users/dummy2/likes')

    expect(page.getByText('工学部')).toBeVisible()
    expect(page.getByText('testClassName')).toBeVisible()
    expect(page.getByTestId('star-4')).toBeVisible()
    expect(page.getByText('testTitle').nth(1)).toBeVisible()
    expect(page.getByText('testEvaluation')).toBeVisible()
  })
})
