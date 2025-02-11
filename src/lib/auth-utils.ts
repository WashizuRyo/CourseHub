'use server'

import { signIn, signOut } from '@@/auth'

export async function singOut() {
  await signOut()
}

export async function singIn() {
  await signIn()
}
