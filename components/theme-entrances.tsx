import { ArrowRight, BookOpen, MapPinned, Route, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { themeRecords } from '@/lib/theme-data';
import { zoneRecords } from '@/lib/exhibition-data';

export function ThemeEntrances() {
  return (
    <section id="themes" className="relative overflow-hidden bg-[#143f4f] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28" aria-labelledby="themes-title">
      <div className="mx-auto max-w-[1480px]">
        <div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><Badge className="h-auto border-2 border-white/70 bg-[#ffcb47] px-4 py-2 font-black text-[#143f4f]"><Route /> TWO PATHS · 兩大主題入口</Badge><h2 id="themes-title" className="mt-5 text-5xl font-black leading-[1.03] tracking-[-.04em] sm:text-7xl">先選一條觀看路徑，<br /><span className="text-[#75d4ed]">再深入展區。</span></h2></div><p className="max-w-3xl text-base font-medium leading-8 text-white/65">一條從物質水利看客庄如何形成，一條從精神守護看人們如何回應水的風險。六個展區各自完整，主題入口負責建立觀看脈絡。</p></div>
        <div className="mt-11 grid gap-7 lg:grid-cols-2">
          {themeRecords.map((theme, index) => {
            const Icon = index === 0 ? MapPinned : ShieldCheck;
            return <a key={theme.slug} href={`/themes/${theme.slug}`} className="group relative isolate min-h-[520px] overflow-hidden rounded-[34px] border-[3px] border-white/85 shadow-[0_8px_0_#ffcb47] transition hover:-translate-y-1"><img src={theme.image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#092f3f] via-[#092f3f]/72 to-[#092f3f]/18" /><div className="flex min-h-[520px] flex-col justify-end p-6 sm:p-9"><span style={{ backgroundColor: theme.color }} className="grid size-16 place-items-center rounded-full border-2 border-[#143f4f] text-[#143f4f]"><Icon /></span><p className="mt-6 text-xs font-black tracking-[.18em] text-[#b9ecf6]">{theme.index} · {theme.english}</p><h3 className="mt-2 text-5xl font-black">{theme.title}</h3><p className="mt-4 max-w-xl text-lg font-black leading-8 text-[#ffdc75]">{theme.tagline}</p><div className="mt-6 flex flex-wrap gap-2">{theme.zoneSlugs.map((slug) => { const zone = zoneRecords.find((item) => item.slug === slug)!; return <span key={slug} className="rounded-full border border-white/35 bg-white/10 px-3 py-1.5 text-xs font-bold">{zone.index} {zone.title}</span>; })}</div><span className="mt-7 inline-flex items-center gap-2 text-lg font-black">進入主題頁 <ArrowRight /></span></div></a>;
          })}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border-2 border-white/20 bg-white/8 p-5"><p className="flex items-center gap-2 text-sm font-bold text-white/70"><BookOpen className="size-5 text-[#ffcb47]" />地方研究者也可跳過主題導讀，直接進入水水書房。</p><a href="/library" className="rounded-full border-2 border-white bg-[#bddd43] px-5 py-2.5 text-sm font-black text-[#143f4f] hover:bg-[#d6e982]">前往水水書房 →</a></div>
      </div>
    </section>
  );
}
