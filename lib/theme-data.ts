export type ThemeRecord = {
  slug: string;
  index: string;
  title: string;
  english: string;
  tagline: string;
  question: string;
  description: string;
  thesis: string[];
  zoneSlugs: string[];
  image: string;
  color: string;
  tags: string[];
  o2oTitle: string;
  o2oNote: string;
};

export const themeRecords: ThemeRecord[] = [
  {
    slug: 'waterway-traces', index: '主題一', title: '圳路築跡', english: 'Waterway Traces',
    tagline: '一滴水如何穿過山壁、流入田野，最後成為一座庄頭？',
    question: '當自然環境無法直接提供穩定水源時，客家先民如何把「水的限制」轉化為「地方生活的可能」？',
    description: '從水利地景、工程技術及日常生活切入，閱讀客家先民如何辨識地形、尋找水源、修築圳路、開鑿埤塘、分配用水，進而建立農業生產、聚落秩序及庄頭生活。',
    thesis: ['桃竹苗台地與山城面臨留水不易、地形高差與水源不均，高屏六堆則面對河川擺動、洪患、湧泉與灌溉分配。不同水文條件形成不同的水利技術，也共同展現辨水、造水、分水的能力。', '水圳不只是工程設施，也是聚落形成、農業生產、社群合作、性別分工與生活記憶的共同基礎。「築跡」同時指修築的設施，以及水在人群、土地與地名中留下的歷史痕跡。'],
    zoneSlugs: ['northern-hills', 'liudui-plains', 'laundry-water'], image: '/exhibits/zone-1.jpg', color: '#75d4ed',
    tags: ['埤塘', '水圳', '塘涵', '分水', '農業', '洗衫坑', '水利工程'],
    o2oTitle: '圳路築跡走讀', o2oNote: '串聯埤塘、水圳與洗衫坑，把線上地景觀察帶到現地。',
  },
  {
    slug: 'bogong-guards-water', index: '主題二', title: '伯公守水口', english: 'Bogong Guards the Water',
    tagline: '水養活庄頭，也可能帶走土地與財氣。人們如何守住水口？',
    question: '當水既能養活庄頭，也可能帶來洪患與失序時，人們如何透過信仰、故事與共同祭儀，重新建立人與自然的關係？',
    description: '從信仰、地方宇宙觀與水域治理切入，理解客庄如何將不可控制的水流、洪患與環境風險，轉化為可理解、可祭祀及可共同守護的文化秩序。',
    thesis: ['水口不只是水流出入庄頭的位置，也是聚落邊界、風水節點、財富象徵與共同體的精神入口。伯公安座於水頭、水圳、埤塘或大樹旁，見證庄民對土地與生活秩序的長期守護。', '客庄信仰不是附著於水利工程之外的民俗裝飾，而是理解環境、凝聚社群與回應風險的文化機制。從守水走向共水，也讓當代客庄重新面對生態破碎、文化地景消失與極端氣候。'],
    zoneSlugs: ['water-guardians', 'water-legends', 'modern-water'], image: '/exhibits/zone-4.jpg', color: '#ff8069',
    tags: ['伯公', '水神', '三官大帝', '石母', '祭祀圈', '地方傳說', '生態守護'],
    o2oTitle: '伯公守水口尋訪', o2oNote: '實地尋訪水頭、水口伯公與水神信仰，記錄水流、聚落與祭祀的關係。',
  },
];

export function getTheme(slug: string) {
  return themeRecords.find((theme) => theme.slug === slug);
}

export function getThemeForZone(zoneSlug: string) {
  return themeRecords.find((theme) => theme.zoneSlugs.includes(zoneSlug));
}
