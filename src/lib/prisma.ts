import { PrismaClient } from '@prisma/client'

// グローバル変数にPrismaクライアントを格納するための型定義
const globalForPrisma = global as unknown as { prisma: PrismaClient }
// Prismaクライアントインスタンスを作成または再利用
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'], // クエリのログを出力する設定（開発中のみ有効）
  })

// 開発環境では、グローバル変数にPrismaクライアントインスタンスを設定
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
