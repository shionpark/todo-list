import type { Metadata } from 'next';
import localFont from 'next/font/local';
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
        {children}
      </body>
    </html>
  );
}
