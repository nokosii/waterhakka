export type ZoneRecord = {
  id: string;
  slug: string;
  index: string;
  verb: string;
  title: string;
  subtitle: string;
  description: string;
  interaction: string;
  clue: string;
  image: string;
  alt: string;
  credit: string;
  source: string;
  color: string;
  ink: string;
  question: string;
  shortHook: string;
  pictureBook: string;
  o2oTitle: string;
  o2oSteps: string[];
};

export const zoneRecords: ZoneRecord[] = [
  {
    id: 'zone-1', slug: 'northern-hills', index: '01', verb: '造水 · 分水', title: '算水為財的北部丘陵', subtitle: '一滴水，如何成為可繼承的資產？',
    description: '桃竹苗田高水低，客家先民以埤塘、穿龍洞與水甲會，把不穩定的雨水轉成可計量、可協商、可繼承的水分額。', interaction: '拈鬮分水模擬', clue: '水分額',
    image: '/exhibits/zone-1.jpg', alt: '清光緒年間分鬮書，記載埤塘水分額與水圳', credit: '清光緒16年陳惟炎兄弟分鬮書／陳壂全提供', source: 'https://hch.hakka.gov.tw/reportdetail.asp?ArID=1458&MenuID=1&SubID=3', color: '#bddd43', ink: '#173f3c',
    question: '看得到水，為何不一定用得到水？', shortHook: '60 秒認識穿龍洞與水分額', pictureBook: '跟著一張分鬮書，讀懂家族如何分田也分水。',
    o2oTitle: '尋找家鄉的蓄水智慧', o2oSteps: ['找到一口埤塘、古井或舊圳路', '觀察田地與水面的高低差', '記下由誰維護、如何分水'],
  },
  {
    id: 'zone-2', slug: 'liudui-plains', index: '02', verb: '分水 · 守水', title: '延水結柵的六堆平原', subtitle: '水少時，誰先用？如何才公平？',
    description: '六堆平原以水圳串連灌溉、庄界與防禦。讓水十二份與輪水番，留下跨庄、跨族群協商有限水源的共同秩序。', interaction: '永月圳分水挑戰', clue: '輪水番',
    image: '/exhibits/zone-2.jpg', alt: '伯公廟後方的泗浚圳，水流穿越六堆聚落', credit: '泗浚圳／客家文化發展中心典藏網', source: 'https://hch.hakka.gov.tw/reportdetail.asp?ArID=2573&MenuID=11&SubID=29&pageNums=6', color: '#75d4ed', ink: '#153d50',
    question: '一條水圳，如何形成一個庄？', shortHook: '60 秒看懂讓水 2/5', pictureBook: '跟著輪水番走一輪，理解分水為何需要協商。',
    o2oTitle: '沿著分水口讀一座庄', o2oSteps: ['尋找圳路、分水口或水門', '辨認水流通往哪些聚落或田區', '訪問一位居民記錄輪灌記憶'],
  },
  {
    id: 'zone-3', slug: 'laundry-water', index: '03', verb: '用水 · 共水', title: '洗衫坑與生活水民俗', subtitle: '水邊，也是客庄的社群網路。',
    description: '北部洗衫坑是勞動、情報與用水公德的公共空間；南部大風草水則守護產後身體。一外一內，水都進入日常記憶。', interaction: '洗衫坑聽音辨位', clue: '洗當淨',
    image: '/exhibits/zone-3.jpg', alt: '黃滿嬌在內灣東窩溪洗衫', credit: '黃滿嬌於內灣東窩溪洗衫／客家文化發展中心典藏網', source: 'https://hch.hakka.gov.tw/reportdetail.asp?ArID=1200&MenuID=6&SubID=24&pageNums=2', color: '#ffcb47', ink: '#513b12',
    question: '洗衫坑為何像早期的社群媒體？', shortHook: '60 秒辨認生活水的公共規矩', pictureBook: '聽見洗衫坑的一天：流水、搥衣與庄頭消息。',
    o2oTitle: '採集一段生活水聲景', o2oSteps: ['尋找仍被使用的公共水空間', '安靜記錄三種環境聲音', '詢問長輩一條用水規矩'],
  },
  {
    id: 'zone-4', slug: 'water-guardians', index: '04', verb: '守水 · 敬水', title: '守水的神與成神的人', subtitle: '水口為何總有一位守護者？',
    description: '北部水頭、水尾伯公標記圳路起訖；南部則把開圳有功或犧牲的人奉為水利恩公。神與人一起守住水路與庄頭。', interaction: '客庄風水師', clue: '水口伯公',
    image: '/exhibits/zone-4.jpg', alt: '上四座屋圳一號隧道旁的水口伯公廟', credit: '一號隧道水口伯公／客家文化發展中心典藏網', source: 'https://hch.hakka.gov.tw/reportdetail.asp?ArID=1118&MenuID=1&SubID=29&pageNums=1', color: '#ff8069', ink: '#55291f',
    question: '有水的地方，為何常有伯公？', shortHook: '60 秒辨認水頭與水尾伯公', pictureBook: '跟著守水者走過圳頭、庄心與水尾。',
    o2oTitle: '畫一張守水信仰小地圖', o2oSteps: ['找到圳頭、圳尾或水口附近的伯公', '確認水流方向與聚落位置', '記下祭祀、清圳或地方傳說'],
  },
  {
    id: 'zone-5', slug: 'water-legends', index: '05', verb: '傳水 · 想像', title: '客庄水神話與奇幻傳說', subtitle: '當旱災與濁流，長出神話的形狀。',
    description: '伯公鏡、金鴨母與神農大帝祭水，把泉湧、濁流與洪患轉化為可傳述的奇幻記憶，也保存先民敬畏自然的尺度。', interaction: '金鴨母捉泥鰍', clue: '金鴨母',
    image: '/exhibits/zone-5.jpg', alt: '埤塘前的石板伯公正面', credit: '橫山蔗廍埤塘前石板伯公／客家文化發展中心典藏網', source: 'https://hch.hakka.gov.tw/reportdetail.asp?ArID=1181&MenuID=1&SubID=3', color: '#c9a6f3', ink: '#3f2d55',
    question: '一條混濁的河，如何長出金鴨母？', shortHook: '60 秒進入客庄水神話', pictureBook: '追著金泥鰍前進，在傳說與自然觀察間找線索。',
    o2oTitle: '採集一則家鄉水傳說', o2oSteps: ['請居民說一則與水有關的故事', '記錄故事發生的地點與角色', '分開標示傳說、口述與研究解釋'],
  },
  {
    id: 'zone-6', slug: 'modern-water', index: '06', verb: '修水 · 共生', title: '當代水景的現代性斷裂', subtitle: '工程結束後，水的故事才正要改寫。',
    description: '大圳、堤防與都市化重新分配水的風險與記憶。從消失的埤塘到野蓮田，人們再次學習把洪水轉化為生態共生的可能。', interaction: '消失的千塘滑桿', clue: '與水共生',
    image: '/exhibits/zone-6.jpg', alt: '上四座屋圳末端保留的埤塘', credit: '上四座屋圳末端埤塘／客家文化發展中心典藏網', source: 'https://hch.hakka.gov.tw/reportdetail.asp?ArID=1118&MenuID=1&SubID=29&pageNums=1', color: '#73d8b1', ink: '#17473b',
    question: '水路消失之後，風險去了哪裡？', shortHook: '60 秒看見埤塘、堤防與生態', pictureBook: '從一口老埤塘出發，閱讀工程與共生的兩種未來。',
    o2oTitle: '比對一處改變中的水景', o2oSteps: ['選一口埤塘、河段或野蓮田', '找一張舊照片或舊地圖比對', '記錄工程、生態與居民生活的變化'],
  },
];

export function getZone(slug: string) {
  return zoneRecords.find((zone) => zone.slug === slug);
}

export const libraryRecords = [
  { id: 'WH-001', title: '清光緒16年陳惟炎兄弟分鬮書', type: '古文書', region: '北部客庄', era: '清代', keywords: ['分鬮書', '水分額', '家族', '水權'], zoneSlug: 'northern-hills', source: zoneRecords[0].source, note: '從家產分配文書理解土地、埤塘與灌溉權如何被記錄。' },
  { id: 'WH-002', title: '泗浚圳與六堆聚落水路', type: '水圳', region: '南部六堆', era: '近現代', keywords: ['泗浚圳', '輪水番', '分水', '庄界'], zoneSlug: 'liudui-plains', source: zoneRecords[1].source, note: '觀察水圳如何串連灌溉、聚落邊界與地方合作。' },
  { id: 'WH-003', title: '內灣東窩溪洗衫影像', type: '影像', region: '北部客庄', era: '近現代', keywords: ['洗衫坑', '婦女', '生活水', '聲景'], zoneSlug: 'laundry-water', source: zoneRecords[2].source, note: '從溪畔洗衣影像閱讀勞動、交談與公共用水倫理。' },
  { id: 'WH-004', title: '上四座屋圳一號隧道水口伯公', type: '信仰', region: '北部客庄', era: '近現代', keywords: ['水口伯公', '圳路', '祭祀', '守水'], zoneSlug: 'water-guardians', source: zoneRecords[3].source, note: '水利設施與地方信仰重疊的代表性場域。' },
  { id: 'WH-005', title: '橫山蔗廍埤塘前石板伯公', type: '信仰', region: '北部客庄', era: '近現代', keywords: ['石板伯公', '埤塘', '傳說', '地景'], zoneSlug: 'water-legends', source: zoneRecords[4].source, note: '可用來比較地方傳說、信仰空間與自然環境的關係。' },
  { id: 'WH-006', title: '上四座屋圳末端埤塘', type: '地景', region: '北部客庄', era: '當代', keywords: ['埤塘', '都市化', '滯洪', '生態'], zoneSlug: 'modern-water', source: zoneRecords[5].source, note: '追蹤傳統埤塘在大圳、都市化與生態治理中的角色變化。' },
];
