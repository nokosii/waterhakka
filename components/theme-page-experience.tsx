'use client';

import { useState } from 'react';
import { Bot, Check, Droplets, ExternalLink, MapPinned, Play, ShieldCheck, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { ThemeRecord } from '@/lib/theme-data';
import { zoneRecords } from '@/lib/exhibition-data';

export function ThemePageExperience({ theme }: { theme: ThemeRecord }) {
  const [landscape, setLandscape] = useState<'north' | 'south'>('north');
  const [teaSteps, setTeaSteps] = useState<boolean[]>([false, false, false]);
  const themeZones = theme.zoneSlugs.map((slug) => zoneRecords.find((zone) => zone.slug === slug)!);
  const isWaterway = theme.slug === 'waterway-traces';
  const teaComplete = teaSteps.every(Boolean);

  return (
    <>
      <section className="bg-[#fff9e9] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1480px] gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-24"><Badge className="h-auto border-2 border-[#143f4f] px-4 py-2 font-black text-[#143f4f]" style={{ backgroundColor: theme.color }}><Play className="fill-current" /> THEME FILM · 主題導讀</Badge><h2 className="mt-5 text-5xl font-black leading-[1.04] tracking-[-.04em] sm:text-7xl">先看地景，<br /><span className="text-[#148781]">再讀策展。</span></h2><p className="mt-6 font-medium leading-8 text-[#5c737c]">本頁使用委託人指定的主題影音作為功能示範；正式內容應替換為本主題 3–5 分鐘核定影片。</p></div>
          <div><div className="aspect-video overflow-hidden rounded-[28px] border-[3px] border-[#143f4f] bg-black shadow-[0_7px_0_#143f4f]"><iframe className="h-full w-full" src="https://www.youtube-nocookie.com/embed/JD7b5WtPAWs" title={`${theme.title}主題導讀影音示範`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div><p className="mt-4 text-xs font-bold text-[#73868d]">影片不自動播放；正式版需補齊客語段落、華語字幕、逐字稿及授權資料。</p></div>
        </div>
      </section>

      <section className="soft-grid px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1180px]"><p className="text-xs font-black tracking-[.18em] text-[#148781]">CURATORIAL ESSAY · 策展論述</p><h2 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">{theme.question}</h2><div className="mt-9 grid gap-6 md:grid-cols-2">{theme.thesis.map((paragraph, index) => <article key={paragraph} className="rounded-[28px] border-[3px] border-[#143f4f] bg-white p-6 shadow-[0_5px_0_#143f4f] sm:p-8"><span style={{ backgroundColor: index === 0 ? theme.color : '#ffcb47' }} className="grid size-11 place-items-center rounded-full border-2 border-[#143f4f] font-black">{index + 1}</span><p className="mt-6 font-medium leading-8 text-[#516b75]">{paragraph}</p></article>)}</div></div>
      </section>

      <section className="border-y-[3px] border-[#143f4f] bg-[#75d4ed] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1180px]">
          {isWaterway ? (
            <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]"><div><Badge className="h-auto border-2 border-[#143f4f] bg-[#bddd43] px-4 py-2 font-black text-[#143f4f]"><Droplets /> LANDSCAPE · 南北地景比較</Badge><h2 className="mt-5 text-4xl font-black sm:text-6xl">同樣缺水，<br />方法並不相同。</h2><div className="mt-7 grid grid-cols-2 gap-3"><button onClick={() => setLandscape('north')} className={`rounded-2xl border-2 border-[#143f4f] p-4 font-black ${landscape === 'north' ? 'bg-[#ffcb47]' : 'bg-white'}`}>桃竹苗丘陵</button><button onClick={() => setLandscape('south')} className={`rounded-2xl border-2 border-[#143f4f] p-4 font-black ${landscape === 'south' ? 'bg-[#bddd43]' : 'bg-white'}`}>高屏六堆</button></div></div><div className="rounded-[32px] border-[3px] border-[#143f4f] bg-[#fff9e9] p-6 shadow-[0_7px_0_#143f4f] sm:p-9"><p className="text-xs font-black tracking-[.16em] text-[#148781]">{landscape === 'north' ? 'NORTH · 蓄水與引水' : 'SOUTH · 分水與防洪'}</p><h3 className="mt-3 text-4xl font-black">{landscape === 'north' ? '田高水低：把雨留住、把水穿山引來' : '河川擺動：把水分好、把風險共同承擔'}</h3><div className="mt-8 grid grid-cols-3 gap-3">{(landscape === 'north' ? [['埤塘','蓄'],['穿龍洞','引'],['水分額','分']] : [['湧泉','尋'],['輪水番','協'],['堤防','守']]).map(([label, verb]) => <div key={label} className="rounded-2xl border-2 border-[#143f4f] bg-white p-4 text-center"><span className="mx-auto grid size-10 place-items-center rounded-full bg-[#75d4ed] font-black">{verb}</span><p className="mt-3 text-sm font-black">{label}</p></div>)}</div><p className="mt-7 text-sm font-medium leading-7 text-[#5c747c]">這是策展概念比較，正式 GIS 與歷史地圖需依核定圖資、年代及座標建置。</p></div></div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]"><div><Badge className="h-auto border-2 border-[#143f4f] bg-[#ff8069] px-4 py-2 font-black text-white"><ShieldCheck /> DIGITAL RITUAL · 線上奉茶</Badge><h2 className="mt-5 text-4xl font-black sm:text-6xl">敬一杯茶，<br />讀一個水口。</h2><p className="mt-6 font-medium leading-8 text-[#315d68]">以尊重、理解與行動完成數位儀式，不取代地方正式祭儀。</p></div><div className="rounded-[32px] border-[3px] border-[#143f4f] bg-[#143f4f] p-6 text-white shadow-[0_7px_0_#ffcb47] sm:p-9"><div className="space-y-3">{['先向土地與水源致意', '讀一則守水故事', '選一項今日守水行動'].map((step, index) => <button key={step} onClick={() => setTeaSteps((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value))} className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left font-black ${teaSteps[index] ? 'border-[#bddd43] bg-[#bddd43] text-[#143f4f]' : 'border-white/50 bg-white/8'}`}><span className="grid size-8 place-items-center rounded-full border-2 border-current">{teaSteps[index] ? <Check className="size-4" /> : index + 1}</span>{step}</button>)}</div>{teaComplete && <div className="mt-5 rounded-2xl bg-[#ffcb47] p-5 text-[#143f4f]"><p className="flex items-center gap-2 font-black"><Sparkles />今日水語</p><p className="mt-2 text-lg font-black">守水口，也守住彼此共享水源的承諾。</p></div>}<p className="mt-5 text-[11px] font-bold leading-5 text-white/45">本互動為文化教育原型，不代表任何特定廟宇、祭祀團體或正式籤詩。</p></div></div>
          )}
        </div>
      </section>

      <section className="bg-[#fff9e9] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1480px]"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-black tracking-[.18em] text-[#148781]">THREE EXHIBITIONS · 所屬展區</p><h2 className="mt-3 text-5xl font-black sm:text-7xl">沿著主題，繼續深入。</h2></div><a href={`/library?theme=${theme.slug}`} className="rounded-full border-2 border-[#143f4f] bg-[#ffcb47] px-5 py-3 text-sm font-black hover:bg-[#ffda72]">用主題標籤查水水書房 →</a></div><div className="mt-9 grid gap-6 lg:grid-cols-3">{themeZones.map((zone) => <a key={zone.slug} href={`/zones/${zone.slug}`} className="group overflow-hidden rounded-[28px] border-[3px] border-[#143f4f] bg-white shadow-[0_6px_0_#143f4f] transition hover:-translate-y-1"><img src={zone.image} alt={zone.alt} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" /><div className="p-6"><span style={{ backgroundColor: zone.color }} className="inline-flex rounded-full border-2 border-[#143f4f] px-3 py-1 text-xs font-black">展區 {zone.index}</span><h3 className="mt-4 text-2xl font-black leading-snug">{zone.title}</h3><p className="mt-3 text-sm font-medium leading-7 text-[#617780]">{zone.description}</p><span className="mt-5 inline-flex font-black text-[#148781]">進入獨立展區 →</span></div></a>)}</div></div>
      </section>

      <section className="border-t-[3px] border-[#143f4f] bg-[#ffcb47] px-5 py-12 sm:px-8 lg:px-12"><div className="mx-auto grid max-w-[1480px] gap-5 md:grid-cols-3"><ActionLink href={`/passport?theme=${theme.slug}`} icon={MapPinned} title={theme.o2oTitle} note={theme.o2oNote} /><ActionLink href="https://gohakka.org/hakkagpt" external icon={Bot} title="客語 AI 導覽" note="另開水水客庄 AI 知識庫，查詢詞彙與文化問題。" /><ActionLink href={`/library?theme=${theme.slug}`} icon={Sparkles} title="主題延伸資料" note={`帶入「${theme.tags.slice(0, 4).join('、')}」等主題標籤。`} /></div></section>
    </>
  );
}

function ActionLink({ href, icon: Icon, title, note, external = false }: { href: string; icon: typeof Bot; title: string; note: string; external?: boolean }) {
  return <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className="rounded-[26px] border-[3px] border-[#143f4f] bg-white p-5 shadow-[0_5px_0_#143f4f] transition hover:-translate-y-1"><Icon className="size-7" /><h3 className="mt-5 text-xl font-black">{title} {external && <ExternalLink className="ml-1 inline size-4" />}</h3><p className="mt-2 text-sm font-medium leading-6 text-[#657b82]">{note}</p></a>;
}
