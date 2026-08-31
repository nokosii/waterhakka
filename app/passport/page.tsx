import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { WaterPassport } from '@/components/water-passport';

export const metadata: Metadata = { title: '水水護照｜水水客庄', description: '蒐集六個展區的數位印章，規劃圳路築跡與伯公守水口 O2O 現地任務。' };

export default async function PassportPage({ searchParams }: { searchParams: Promise<{ theme?: string }> }) {
  const { theme = '' } = await searchParams;
  return <main className="min-h-screen bg-background pb-20 text-foreground md:pb-0"><SiteHeader /><WaterPassport initialTheme={theme} /></main>;
}
