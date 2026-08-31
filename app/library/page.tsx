import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { WaterLibrary } from '@/components/water-library';

export const metadata: Metadata = {
  title: '水水書房｜水水客庄',
  description: '提供在地文史工作者查詢客庄水文化典藏、地景、古文書、水圳與信仰資料。',
  openGraph: { title: '水水書房｜水水客庄', description: '依關鍵字、地區與資料類型搜尋客庄水文化資料。', images: ['/water-key-visual.png'] },
  twitter: { card: 'summary_large_image', title: '水水書房｜水水客庄', description: '在地水文化資料查詢入口。', images: ['/water-key-visual.png'] },
};

export default async function LibraryPage({ searchParams }: { searchParams: Promise<{ zone?: string }> }) {
  const { zone = '' } = await searchParams;
  return <main className="min-h-screen bg-background text-foreground"><SiteHeader /><WaterLibrary initialZone={zone} /></main>;
}
