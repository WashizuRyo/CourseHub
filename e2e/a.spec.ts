import { createUniversity } from '@/lib/data'
import test from '@playwright/test'

test.describe('ログイン', () => {
  test.beforeAll(async () => {
    await createUniversity('testUniversity')
  })

  test('ログイン状態でアクセスすると、ユーザ情報が表示される', async ({ browser }) => {
    const jwt = {
      name: 'aaa',
      email: 'user@example.com',
      picture: 'https://avatars.githubusercontent.com/u/000000',
      sub: 'dummy',
      id: 'aaaa',
    }
    // ブラウザにセッションのCookieを保存する
    const context = await browser.newContext()
    await context.addCookies([
      {
        name: 'authjs.session-token',
        value: btoa(JSON.stringify(jwt)),
        domain: 'localhost:1111',
        path: '/',
      },
    ])

    // ログインしていないとアクセスできないページのテストをする
    const page = await context.newPage()
    await page.goto('/universities/1/reviews/new')
    await page.getByLabel('学部を選択してください').selectOption('理学部')
  })
})
