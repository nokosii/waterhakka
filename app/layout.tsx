import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '水水客庄｜一滴水的兩種地景',
  description: '從一滴水出發，探索桃竹苗丘陵與高屏六堆平原如何以水成庄、共水生活。',
  openGraph: {
    title: '水水客庄｜一滴水的兩種地景',
    description: '六大線上展區，沿著圳路、古文書、伯公與生活水景，看見客庄如何被水塑造。',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '水水客庄｜一滴水的兩種地景',
    description: '跟著水，看見客庄共生的智慧。',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
