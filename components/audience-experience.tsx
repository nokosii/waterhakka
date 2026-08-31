'use client';

import { BookOpen, Clock3, Gamepad2, LibraryBig, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export type VisitMode = 'story' | 'challenge' | 'research';

const modes = [
  { id: 'story' as const, title: '輕鬆看故事', duration: '30 秒－3 分鐘', description: '先選物質水利或精神守護，再從主題入口進入三個展區。', action: '選擇觀看主題', target: 'themes', icon: BookOpen, color: '#ffcb47' },
  { id: 'challenge' as const, title: '開始水路挑戰', duration: '3－10 分鐘', description: '先認識兩條策展路徑，再挑選分水、聲景、守水與時光任務。', action: '前往兩大主題', target: 'themes', icon: Gamepad2, color: '#bddd43' },
  { id: 'research' as const, title: '查資料與做教學', duration: '10 分鐘以上', description: '到水水書房查看典藏來源與延伸知識，適合地方研究及備課。', action: '開啟水水書房', target: '/library', icon: LibraryBig, color: '#75d4ed' },
];

export function AudienceModePicker({ selectedMode, onSelect }: { selectedMode: VisitMode | null; onSelect: (mode: VisitMode, target: string) => void }) {
  return (
    <section id="visit-mode" className="border-y-[3px] border-[#143f4f] bg-[#fff9e9] px-5 py-16 sm:px-8 lg:px-12 lg:py-20" aria-labelledby="visit-mode-title">
      <div className="mx-auto max-w-[1480px]">
        <div className="grid gap-5 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
          <div><Badge className="sticker-mini h-auto border-2 border-[#143f4f] bg-[#ff8069] px-4 py-2 font-black text-white"><Sparkles /> YOUR WAY · 你的觀展方式</Badge><h2 id="visit-mode-title" className="mt-5 text-4xl font-black leading-tight tracking-[-.04em] sm:text-6xl">今天想怎麼<br /><span className="text-[#148781]">認識客庄？</span></h2></div>
          <p className="max-w-3xl text-base font-medium leading-8 text-[#58707a] lg:justify-self-end">不用登入，也不必填寫族群身分。依時間與目的自由選擇，之後隨時可以改走另一條觀展路線。</p>
        </div>

        <div className="mt-9 grid gap-5 lg:grid-cols-3" role="group" aria-label="選擇觀展方式">
          {modes.map((mode, index) => {
            const Icon = mode.icon;
            const active = selectedMode === mode.id;
            return (
              <button key={mode.id} type="button" onClick={() => onSelect(mode.id, mode.target)} aria-pressed={active} className={`group rounded-[28px] border-[3px] border-[#143f4f] p-5 text-left transition hover:-translate-y-1 sm:p-6 ${active ? 'shadow-[0_7px_0_#143f4f]' : 'bg-white shadow-[0_3px_0_#143f4f]'}`} style={{ backgroundColor: active ? mode.color : undefined }}>
                <div className="flex items-start justify-between gap-4"><span style={{ backgroundColor: mode.color }} className="grid size-14 place-items-center rounded-full border-2 border-[#143f4f]"><Icon /></span><span className="font-black text-[#8b9aa0]">0{index + 1}</span></div>
                <h3 className="mt-7 text-2xl font-black">{mode.title}</h3><p className="mt-2 flex items-center gap-2 text-xs font-black text-[#23858a]"><Clock3 className="size-4" />{mode.duration}</p><p className="mt-4 min-h-14 text-sm font-medium leading-7 text-[#58707a]">{mode.description}</p><span className="mt-6 inline-flex items-center gap-2 font-black text-[#143f4f]">{mode.action} <span aria-hidden="true">→</span></span>
              </button>
            );
          })}
        </div>
        <p className="mt-5 text-center text-xs font-medium text-[#72868d]">僅在本次瀏覽期間保留你的選擇，不建立個人檔案。</p>
      </div>
    </section>
  );
}
