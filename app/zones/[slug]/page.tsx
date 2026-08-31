import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { ZonePageExperience } from '@/components/zone-page-experience';
import { getZone, zoneRecords } from '@/lib/exhibition-data';

export function generateStaticParams() {
  return zoneRecords.map((zone) => ({ slug: zone.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const zone = getZone(slug);
  if (!zone) return {};
  return {
    title: `${zone.index} ${zone.title}｜水水客庄`,
    description: zone.description,
    openGraph: { title: `${zone.index} ${zone.title}｜水水客庄`, description: zone.subtitle, images: [zone.image] },
    twitter: { card: 'summary_large_image', title: `${zone.index} ${zone.title}｜水水客庄`, description: zone.subtitle, images: [zone.image] },
  };
}

export default async function ZonePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const zoneIndex = zoneRecords.findIndex((item) => item.slug === slug);
  const zone = zoneRecords[zoneIndex];
  if (!zone) notFound();
  const previous = zoneRecords[(zoneIndex - 1 + zoneRecords.length) % zoneRecords.length];
  const next = zoneRecords[(zoneIndex + 1) % zoneRecords.length];

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <SiteHeader />
      <section className="relative isolate min-h-[78vh] overflow-hidden border-b-[3px] border-[#143f4f]">
        <img src={zone.image} alt={zone.alt} className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,42,58,.96)_0%,rgba(7,42,58,.76)_52%,rgba(7,42,58,.2)_100%)]" />
        <div className="mx-auto flex min-h-[78vh] max-w-[1480px] items-end px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          <div className="max-w-4xl text-white">
            <div className="flex flex-wrap gap-3"><span className="rounded-full border-2 border-[#143f4f] px-4 py-2 text-sm font-black text-[#143f4f]" style={{ backgroundColor: zone.color }}>第 {zone.index} 展區</span><span className="rounded-full border-2 border-white/60 bg-white/15 px-4 py-2 text-sm font-black backdrop-blur">{zone.verb}</span></div>
            <h1 className="mt-6 text-[clamp(3rem,7vw,7rem)] font-black leading-[.94] tracking-[-.055em]">{zone.title}</h1>
            <p className="mt-5 text-xl font-black text-[#ffcb47] sm:text-2xl">{zone.subtitle}</p>
            <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-white/80 sm:text-lg">{zone.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4"><a href="#zone-media-title" className="inline-flex h-13 items-center gap-2 rounded-full border-2 border-[#143f4f] bg-[#bddd43] px-6 font-black text-[#143f4f] hover:bg-[#d7e986]">開始本區體驗 <ArrowRight className="size-4" /></a><a href={zone.source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-white/75 hover:text-white">查看影像來源 <ExternalLink className="size-4" /></a></div>
            <p className="mt-6 text-xs font-medium text-white/45">{zone.credit}</p>
          </div>
        </div>
      </section>

      <ZonePageExperience zone={zone} zoneIndex={zoneIndex} />

      <nav className="border-t-[3px] border-[#143f4f] bg-[#ffcb47] px-5 py-8 sm:px-8 lg:px-12" aria-label="展區切換">
        <div className="mx-auto grid max-w-[1480px] gap-4 sm:grid-cols-2"><a href={`/zones/${previous.slug}`} className="group rounded-2xl border-2 border-[#143f4f] bg-white p-5 shadow-[0_3px_0_#143f4f] hover:-translate-y-1"><span className="flex items-center gap-2 text-xs font-black text-[#71868d]"><ArrowLeft className="size-4" />上一展區</span><span className="mt-2 block text-lg font-black">{previous.index} {previous.title}</span></a><a href={`/zones/${next.slug}`} className="group rounded-2xl border-2 border-[#143f4f] bg-white p-5 text-right shadow-[0_3px_0_#143f4f] hover:-translate-y-1"><span className="flex items-center justify-end gap-2 text-xs font-black text-[#71868d]">下一展區 <ArrowRight className="size-4" /></span><span className="mt-2 block text-lg font-black">{next.index} {next.title}</span></a></div>
      </nav>
    </main>
  );
}
