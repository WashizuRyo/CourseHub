import { Inter, Lusitana, Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });
export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});
export const notosans = Noto_Sans_JP({
  subsets: ['latin'],
});
export const notoserif = Noto_Serif_JP({
  weight: ['400', '700'],
  subsets: ['latin'],
});
