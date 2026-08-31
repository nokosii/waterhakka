import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { ThemePageExperience } from '@/components/theme-page-experience';
import { getTheme, themeRecords } from '@/lib/theme-data';

export function generateStaticParams() {
  return themeRecords.map((theme) => ({ slug: theme.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const theme = getTheme(slug);
  if (!theme) return {};
  return { title: `${theme.title}｜水水客庄`, description: theme.description, openGraph: { title: `${theme.title}｜水水客庄`, description: theme.tagline, images: [theme.image] }, twitter: { card: 'summary_large_image', title: `${theme.title}｜水水客庄`, description: theme.tagline, images: [theme.image] } };
}

export default async function ThemePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theme = getTheme(slug);
  if (!theme) notFound();
  return <main className="min-h-screen overflow-hidden bg-background text-foreground"><SiteHeader /><section className="relative isolate min-h-[78vh] overflow-hidden border-b-[3px] border-[#143f4f]"><img src={theme.image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" /><div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,42,58,.97)_0%,rgba(7,42,58,.75)_55%,rgba(7,42,58,.15)_100%)]" /><div className="mx-auto flex min-h-[78vh] max-w-[1480px] items-end px-5 py-14 sm:px-8 lg:px-12 lg:py-20"><div className="max-w-4xl text-white"><span style={{ backgroundColor: theme.color }} className="inline-flex rounded-full border-2 border-[#143f4f] px-4 py-2 text-sm font-black text-[#143f4f]">{theme.index} · {theme.english}</span><h1 className="mt-6 text-[clamp(4rem,9vw,9rem)] font-black leading-[.88] tracking-[-.06em]">{theme.title}</h1><p className="mt-7 max-w-3xl text-xl font-black leading-9 text-[#ffdc75] sm:text-2xl">{theme.tagline}</p><p className="mt-6 max-w-3xl font-medium leading-8 text-white/75">{theme.description}</p><a href="#theme-question" className="mt-8 inline-flex h-13 items-center gap-2 rounded-full border-2 border-[#143f4f] bg-[#bddd43] px-6 font-black text-[#143f4f] hover:bg-[#d7e985]">展開主題論述 <ArrowRight /></a></div></div></section><div id="theme-question"><ThemePageExperience theme={theme} /></div></main>;
}
