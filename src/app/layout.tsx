import Link from 'next/link';
import Image from 'next/image';
import localFont from 'next/font/local';
import type { Metadata } from 'next';
import '../styles/globals.css';

const nanumSquare = localFont({
  src: [
    {
      path: '../../public/fonts/nanum-square/NanumSquare_acR.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/nanum-square/NanumSquare_acB.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-nanum',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'To Do List',
  description: '할 일 목록을 관리하는 To Do 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${nanumSquare.variable} font-sans antialiased`}>
        <header className="border-b border-slate-200 bg-white">
          <div className="container mx-auto flex h-16 max-w-4xl items-center px-4">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="My Todo List 로고"
                width={120}
                height={32}
                priority
              />
            </Link>
          </div>
        </header>
        <main className="container mx-auto max-w-4xl p-4">{children}</main>
      </body>
    </html>
  );
}
