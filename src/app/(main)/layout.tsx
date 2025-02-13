import SessionUserAvatar from '@/components/user/SessionUserAvatar'
import '@/components/utils/global.css'
import { inter, lusitana } from '@/fonts'
import { AcademicCapIcon } from '@heroicons/react/24/outline'
import { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: {
    template: '%s | CourseHub',
    default: 'CourseHub',
  },
  description: 'CourseHub is a platform for students to find and share course reviews.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <SessionProvider>
          <header className={`${inter.className} antialiased`}>
            <div className='flex justify-between bg-slate-100 shadow'>
              <Link href='/' className='ml-2 flex items-center'>
                <div className={`${lusitana.className} flex items-center`}>
                  <AcademicCapIcon className='size-12' />
                  <p className='ml-3 text-3xl'>CourseHub</p>
                </div>
              </Link>
              <SessionUserAvatar />
            </div>
          </header>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
