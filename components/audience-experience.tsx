'use client';

import { useState } from 'react';
import { BookOpen, Bot, Captions, Clock3, ExternalLink, FileDown, Gamepad2, LibraryBig, Play, Search, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export type VisitMode = 'story' | 'challenge' | 'research';

type SourceItem = {
  index: string;
  title: string;
  source: string;
};

const modes = [
  {
    id: 'story' as const,
    title: '輕鬆看故事',
    duration: '30 秒－3 分鐘',
    description: '用影音、短片與繪本，快速認識一滴水如何連起客庄。',
    action: '前往故事站',
    target: 'media',
    icon: BookOpen,
    color: '#ffcb47',
  },
  {
    id: 'challenge' as const,
    title: '開始水路挑戰',
    duration: '3－10 分鐘',
    description: '操作分水、聲景、守水與時光任務，從選擇理解制度。',
    action: '挑戰六大展區',
    target: 'exhibition',
    icon: Gamepad2,
    color: '#bddd43',
  },
  {
    id: 'research' as const,
    title: '查資料與做教學',
    duration: '10 分鐘以上',
    description: '查看典藏來源、教學提綱與延伸知識，適合備課及研究。',
    action: '開啟研究站',
    target: 'research',
    icon: LibraryBig,
    color: '#75d4ed',
  },
];

export function AudienceModePicker({ selectedMode, onSelect }: { selectedMode: VisitMode | null; onSelect: (mode: VisitMode, target: string) => void }) {
  return (
    <section id="visit-mode" className="border-y-[3px] border-[#143f4f] bg-[#fff9e9] px-5 py-16 sm:px-8 lg:px-12 lg:py-20" aria-labelledby="visit-mode-title">
      <div className="mx-auto max-w-[1480px]">
        <div className="grid gap-5 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
          <div>
            <Badge className="sticker-mini h-auto border-2 border-[#143f4f] bg-[#ff8069] px-4 py-2 font-black text-white"><Sparkles /> YOUR WAY · 你的觀展方式</Badge>
            <h2 id="visit-mode-title" className="mt-5 text-4xl font-black leading-tight tracking-[-.04em] sm:text-6xl">今天想怎麼<br /><span className="text-[#148781]">認識客庄？</span></h2>
          </div>
          <p className="max-w-3xl text-base font-medium leading-8 text-[#58707a] lg:justify-self-end">不用登入，也不必填寫族群身分。依時間與目的自由選擇，之後隨時可以改走另一條觀展路線。</p>
        </div>

        <div className="mt-9 grid gap-5 lg:grid-cols-3" role="group" aria-label="選擇觀展方式">
          {modes.map((mode, index) => {
            const Icon = mode.icon;
            const active = selectedMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => onSelect(mode.id, mode.target)}
                aria-pressed={active}
                className={`group rounded-[28px] border-[3px] border-[#143f4f] p-5 text-left transition hover:-translate-y-1 sm:p-6 ${active ? 'shadow-[0_7px_0_#143f4f]' : 'bg-white shadow-[0_3px_0_#143f4f]'}`}
                style={{ backgroundColor: active ? mode.color : undefined }}
              >
                <div className="flex items-start justify-between gap-4">
                  <span style={{ backgroundColor: mode.color }} className="grid size-14 place-items-center rounded-full border-2 border-[#143f4f]"><Icon /></span>
                  <span className="font-black text-[#8b9aa0]">0{index + 1}</span>
                </div>
                <h3 className="mt-7 text-2xl font-black">{mode.title}</h3>
                <p className="mt-2 flex items-center gap-2 text-xs font-black text-[#23858a]"><Clock3 className="size-4" />{mode.duration}</p>
                <p className="mt-4 min-h-14 text-sm font-medium leading-7 text-[#58707a]">{mode.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-black text-[#143f4f]">{mode.action} <span aria-hidden="true">→</span></span>
              </button>
            );
          })}
        </div>
        <p className="mt-5 text-center text-xs font-medium text-[#72868d]">僅在本次瀏覽期間保留你的選擇，不建立個人檔案。</p>
      </div>
    </section>
  );
}

const mediaItems = [
  {
    label: '主題影音示範',
    title: '用一支影片進入客語故事',
    note: '約 3 分鐘的橫式影音入口，支援播放、暫停、字幕與全螢幕。',
    id: '-_ve4lMt-h8',
    ratio: 'aspect-video',
    color: '#ffcb47',
  },
  {
    label: '社群短影音示範',
    title: '60 秒內抓住一個知識點',
    note: '直式短影音示範，適合手機瀏覽與社群導流。',
    id: '-yyo_VwrpwM',
    ratio: 'aspect-[9/16]',
    color: '#ff8069',
  },
  {
    label: '客語繪本示範',
    title: '跟著溪鳴展開時光探險',
    note: '以客語繪本影音示範角色敘事、華語字幕與重播體驗。',
    id: 'fk0pbtNvFuM',
    ratio: 'aspect-video',
    color: '#bddd43',
  },
];

export function MediaShowcase() {
  return (
    <section id="media" className="relative overflow-hidden bg-[#143f4f] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28" aria-labelledby="media-title">
      <div className="pointer-events-none absolute -right-20 top-12 size-72 rounded-full border-[42px] border-[#75d4ed]/30" />
      <div className="mx-auto max-w-[1480px]">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div><Badge className="h-auto border-2 border-white/70 bg-[#ffcb47] px-4 py-2 font-black text-[#143f4f]"><Play className="fill-current" /> WATCH & LISTEN · 影音故事站</Badge><h2 id="media-title" className="mt-5 text-5xl font-black leading-[1.05] tracking-[-.04em] sm:text-7xl">先看一段，<br /><span className="text-[#75d4ed]">再走進水路。</span></h2></div>
          <p className="max-w-2xl text-base font-medium leading-8 text-white/70 lg:justify-self-end">提供主題影音、社群短影音與客語繪本三種觀看節奏。影片預設不自動播放，聲音由觀眾自行開啟。</p>
        </div>

        <div className="mt-11 grid gap-6 lg:grid-cols-[1.15fr_.7fr_1.15fr] lg:items-start">
          {mediaItems.map((item) => (
            <article key={item.id} className="rounded-[28px] border-[3px] border-white/85 bg-[#fff9e9] p-3 text-[#143f4f] shadow-[0_7px_0_rgba(117,212,237,.8)]">
              <div className={`mx-auto overflow-hidden rounded-[19px] border-2 border-[#143f4f] bg-black ${item.ratio} ${item.ratio.includes('9/16') ? 'max-h-[520px] max-w-[292px]' : ''}`}>
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${item.id}`}
                  title={item.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <div className="p-3 pb-4 pt-5">
                <span style={{ backgroundColor: item.color }} className="inline-flex rounded-full border-2 border-[#143f4f] px-3 py-1 text-[10px] font-black tracking-[.12em]">{item.label}</span>
                <h3 className="mt-4 text-xl font-black leading-snug">{item.title}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-[#607880]">{item.note}</p>
                <p className="mt-4 flex items-center gap-2 text-[11px] font-bold text-[#72868d]"><Captions className="size-4" />字幕與播放設定由 YouTube 提供</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ResearchHub({ sources }: { sources: SourceItem[] }) {
  const [downloaded, setDownloaded] = useState(false);

  function downloadTeachingOutline() {
    const body = [
      '# 水水客庄｜六區教學提綱（原型版）',
      '',
      '建議流程：快速看片 → 選一區互動 → 比較南北水文化 → 完成共水承諾。',
      '',
      ...sources.flatMap((item) => [
        `## ${item.index} ${item.title}`,
        `典藏來源：${item.source}`,
        '討論題：這一區的人們如何把自然水源轉化為共同生活的秩序？',
        '',
      ]),
      '延伸任務：請學生畫出家鄉的一條水路，標示水從哪裡來、由誰使用、如何共同維護。',
    ].join('\n');
    const url = URL.createObjectURL(new Blob([body], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = '水水客庄_六區教學提綱_原型版.txt';
    anchor.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  }

  return (
    <section id="research" className="soft-grid px-5 py-20 sm:px-8 lg:px-12 lg:py-28" aria-labelledby="research-title">
      <div className="mx-auto max-w-[1480px]">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div><Badge className="sticker-mini h-auto border-2 border-[#143f4f] bg-[#75d4ed] px-4 py-2 font-black text-[#143f4f]"><Search /> SOURCE LAB · 研究延伸站</Badge><h2 id="research-title" className="mt-5 text-5xl font-black leading-[1.05] tracking-[-.04em] sm:text-7xl">故事有來源，<br /><span className="text-[#148781]">教學有入口。</span></h2></div>
          <p className="max-w-3xl text-base font-medium leading-8 text-[#58707a]">從六區典藏來源繼續查證，也可下載可編輯的原型教學提綱。正式史料檢視器、GIS 座標與完整教案仍需依核定資料擴充。</p>
        </div>

        <div className="mt-11 grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            {sources.map((item) => (
              <a key={item.index} href={item.source} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl border-2 border-[#143f4f] bg-white p-4 shadow-[0_3px_0_#143f4f] transition hover:-translate-y-1 hover:bg-[#e7f7fa]">
                <span className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-[#143f4f] bg-[#ffcb47] font-black">{item.index}</span>
                <span><span className="block font-black leading-6">{item.title}</span><span className="mt-1 flex items-center gap-1 text-xs font-bold text-[#71868d]">查看典藏來源 <ExternalLink className="size-3.5" /></span></span>
              </a>
            ))}
          </div>
          <aside className="rounded-[30px] border-[3px] border-[#143f4f] bg-[#ffcb47] p-6 shadow-[0_7px_0_#143f4f] sm:p-8">
            <span className="grid size-14 place-items-center rounded-full border-2 border-[#143f4f] bg-white"><FileDown /></span>
            <h3 className="mt-6 text-2xl font-black">六區教學提綱</h3>
            <p className="mt-3 text-sm font-medium leading-7 text-[#526a73]">包含觀展流程、六區來源連結、共通討論題與家鄉水路延伸任務，可再自行編輯。</p>
            <Button onClick={downloadTeachingOutline} className="mt-6 h-12 w-full rounded-full border-2 border-[#143f4f] bg-[#143f4f] px-5 font-black text-white hover:bg-[#245969]"><FileDown />{downloaded ? '已下載，可再次取得' : '下載 TXT 教學提綱'}</Button>
            <a href="https://gohakka.org/hakkagpt" target="_blank" rel="noreferrer" className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-[#143f4f] bg-white px-5 text-sm font-black hover:bg-[#e7f7fa]"><Bot className="size-4" />開啟水水客庄 AI 知識庫 <ExternalLink className="size-4" /></a>
            <p className="mt-4 text-[11px] font-bold leading-5 text-[#667980]">AI 知識庫由外部網站提供，將在新分頁開啟；請避免輸入個人資料或未公開典藏內容。</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
