import { auth } from '@@/auth'
import { NextResponse } from 'next/server'

export default async function authenticateSession(userId: string) {
  // セッションを取得
  const session = await auth()

  // セッションがない場合はエラーを返す
  if (session?.user === undefined) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
  // セッションのユーザーIDがリクエストした[userId](/api/users/[userId]/reviews)と一致しない場合はエラーを返す
  if (session.user.id !== userId) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }

  return session
}
