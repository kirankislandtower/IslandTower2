export type Locale = 'en' | 'ar';

interface LocalizedText {
  en: string;
  ar: string;
}

export interface Industry {
  slug: string;
  title: LocalizedText;
  image: string;
  overview: LocalizedText;
  capabilities: LocalizedText[];
  relatedProjectSlugs: string[];
}

export interface LocalizedIndustry {
  slug: string;
  title: string;
  image: string;
  overview: string;
  capabilities: string[];
  relatedProjectSlugs: string[];
}

export function localizeIndustry(industry: Industry, locale: Locale): LocalizedIndustry {
  return {
    slug: industry.slug,
    title: industry.title[locale],
    image: industry.image,
    overview: industry.overview[locale],
    capabilities: industry.capabilities.map((c) => c[locale]),
    relatedProjectSlugs: industry.relatedProjectSlugs,
  };
}

export const industries: Industry[] = [
  {
    slug: 'infrastructure',
    title: { en: 'Infrastructure', ar: 'البنية التحتية' },
    image: '/images/site/underground-pipe-trench.jpg',
    overview: {
      en: 'From site-wide utilities to logistics hubs and transport-adjacent facilities, we deliver the underlying infrastructure that large-scale developments and government projects depend on — coordinated across multiple contractors and phased to keep neighboring operations running.',
      ar: 'من المرافق على مستوى الموقع إلى المراكز اللوجستية والمنشآت المجاورة لقطاعات النقل، ننفذ البنية التحتية الأساسية التي تعتمد عليها المشاريع الكبرى والحكومية — بتنسيق عبر عدة مقاولين وعلى مراحل تضمن استمرار العمليات المجاورة دون انقطاع.',
    },
    capabilities: [
      { en: 'Site-wide power, water, and drainage networks', ar: 'شبكات الكهرباء والمياه والصرف على مستوى الموقع' },
      { en: 'Utility coordination across multi-contractor sites', ar: 'تنسيق المرافق عبر المواقع متعددة المقاولين' },
      { en: 'Earthworks, roads, and site development', ar: 'أعمال الحفر والطرق وتطوير المواقع' },
      { en: 'Phased delivery around live operational constraints', ar: 'التسليم على مراحل وفق قيود التشغيل القائمة' },
    ],
    relatedProjectSlugs: ['al-shindagha-corridor-chilled-water'],
  },
  {
    slug: 'energy-power',
    title: { en: 'Energy & Power', ar: 'الطاقة والكهرباء' },
    image: '/images/site/fire-piping-plant-room.jpg',
    overview: {
      en: "We deliver electro-mechanical works for power generation and distribution facilities, from switchgear installation and high-voltage cabling through to commissioning — built to the safety and testing standards that energized infrastructure demands.",
      ar: 'ننفذ الأعمال الكهروميكانيكية لمنشآت توليد وتوزيع الطاقة، من تركيب لوحات التحكم والكابلات عالية الجهد وحتى التشغيل التجريبي — وفق معايير السلامة والاختبار التي تتطلبها البنية التحتية المكهربة.',
    },
    capabilities: [
      { en: 'Switchgear installation and high-voltage cabling', ar: 'تركيب لوحات التحكم والكابلات عالية الجهد' },
      { en: 'Substation and power distribution build-out', ar: 'إنشاء المحطات الفرعية وشبكات توزيع الطاقة' },
      { en: 'Renewable-integration and variable-load commissioning', ar: 'تشغيل تجريبي لسيناريوهات الحمل المتغير وتكامل الطاقة المتجددة' },
      { en: 'Documented energization and test procedures', ar: 'إجراءات تغذية كهربائية واختبار موثقة' },
    ],
    relatedProjectSlugs: [],
  },
  {
    slug: 'water-treatment',
    title: { en: 'Water Treatment', ar: 'معالجة المياه' },
    image: '/images/site/pump-filtration-room.jpg',
    overview: {
      en: "We expand and upgrade water treatment infrastructure at live facilities that can't go offline — building and testing new capacity in isolation before staged tie-ins to the active process stream.",
      ar: 'نوسّع ونطور البنية التحتية لمعالجة المياه في منشآت تعمل باستمرار ولا يمكن إيقافها — ببناء واختبار السعة الجديدة بشكل منفصل قبل ربطها على مراحل بالمسار التشغيلي النشط.',
    },
    capabilities: [
      { en: 'Clarifier basin and filtration line construction', ar: 'إنشاء أحواض الترسيب وخطوط الترشيح' },
      { en: 'Staged tie-ins to live process streams', ar: 'ربط مرحلي بالمسارات التشغيلية النشطة' },
      { en: 'Capacity expansion with zero unplanned downtime', ar: 'توسعة السعة دون أي توقف غير مخطط له' },
      { en: 'Full process and commissioning documentation', ar: 'توثيق تشغيلي كامل لعمليات التشغيل التجريبي' },
    ],
    relatedProjectSlugs: [],
  },
  {
    slug: 'commercial',
    title: { en: 'Commercial', ar: 'القطاع التجاري' },
    image: '/images/site/mep-corridor-interior.jpg',
    overview: {
      en: 'From corporate campuses to mixed-use towers, we deliver structural, civil, and MEP fit-out work to the tighter finish tolerances and compressed schedules that commercial developments demand.',
      ar: 'من المجمعات المؤسسية إلى الأبراج متعددة الاستخدامات، ننفذ الأعمال الإنشائية والمدنية وأعمال التجهيز الكهروميكانيكي وفق معايير تشطيب دقيقة وجداول زمنية مضغوطة تتطلبها المشاريع التجارية.',
    },
    capabilities: [
      { en: 'Structural and civil works to tight finish tolerances', ar: 'أعمال إنشائية ومدنية وفق معايير تشطيب دقيقة' },
      { en: 'Full MEP fit-out for office and retail floors', ar: 'تجهيز كهروميكانيكي كامل للطوابق المكتبية والتجارية' },
      { en: 'Independent quality inspection at every milestone', ar: 'فحص جودة مستقل عند كل مرحلة إنشائية' },
      { en: 'Delivery on compressed handover schedules', ar: 'التسليم ضمن جداول زمنية مضغوطة' },
    ],
    relatedProjectSlugs: ['dubai-beachfront-chilled-water-network', 'dragon-mart-district-cooling'],
  },
  {
    slug: 'residential',
    title: { en: 'Residential', ar: 'القطاع السكني' },
    image: '/images/site/rebar-formwork-crew.jpg',
    overview: {
      en: 'We handle the full mechanical, electrical, and plumbing scope for residential towers and communities, coordinating floor-by-floor through BIM so occupied floors can hand over while upper levels are still in fit-out.',
      ar: 'نتولى النطاق الكامل للأعمال الميكانيكية والكهربائية والصحية للأبراج والمجمعات السكنية، بتنسيق طابق بطابق عبر نمذجة معلومات البناء (BIM) بما يتيح تسليم الطوابق المشغولة بينما لا تزال الطوابق العليا قيد التجهيز.',
    },
    capabilities: [
      { en: 'Full MEP fit-out for residential towers', ar: 'تجهيز كهروميكانيكي كامل للأبراج السكنية' },
      { en: 'Floor-by-floor BIM coordination', ar: 'تنسيق طابق بطابق عبر نمذجة معلومات البناء' },
      { en: 'Phased handover by zone', ar: 'تسليم على مراحل حسب المنطقة' },
      { en: 'Load profiling for mixed residential-retail use', ar: 'تحديد أحمال التشغيل للاستخدام السكني والتجاري المختلط' },
    ],
    relatedProjectSlugs: ['vantage-tower-damac-mep-works'],
  },
  {
    slug: 'industrial',
    title: { en: 'Industrial', ar: 'القطاع الصناعي' },
    image: '/images/site/steel-structure-piping.jpg',
    overview: {
      en: 'We deliver construction and MEP integration for industrial and process facilities, where hazardous-area classification and safety documentation shape every routing and installation decision from day one.',
      ar: 'ننفذ أعمال الإنشاء والتكامل الكهروميكانيكي للمنشآت الصناعية والتشغيلية، حيث يشكّل تصنيف المناطق الخطرة وتوثيق السلامة كل قرار توجيه وتركيب منذ اليوم الأول.',
    },
    capabilities: [
      { en: 'MEP integration for process and hazardous-area facilities', ar: 'تكامل كهروميكانيكي للمنشآت التشغيلية والمناطق الخطرة' },
      { en: 'High-voltage switchgear installation with dedicated HSE oversight', ar: 'تركيب لوحات تحكم عالية الجهد بإشراف سلامة مخصص' },
      { en: 'Design coordination from process-safety documentation', ar: 'تنسيق تصميم استناداً إلى توثيق السلامة التشغيلية' },
      { en: 'Zero lost-time incident installation programs', ar: 'برامج تركيب دون أي حوادث تعطيل عمل' },
    ],
    relatedProjectSlugs: ['jumeirah-village-south-district-cooling', 'jumeirah-village-triangle-district-cooling-phase-3'],
  },
  {
    slug: 'aviation',
    title: { en: 'Aviation', ar: 'القطاع الجوي' },
    image: '/images/site/rooftop-cooling-equipment.jpg',
    overview: {
      en: 'We deliver civil and MEP works adjacent to live airside operations, planning every site access and lift jointly with aviation safety teams so construction moves around approved windows, not the other way around.',
      ar: 'ننفذ الأعمال المدنية والكهروميكانيكية المجاورة للعمليات الجوية النشطة، بتخطيط كل عملية دخول ورفع بالتعاون مع فرق السلامة الجوية بحيث يتكيف الإنشاء مع النوافذ الزمنية المعتمدة وليس العكس.',
    },
    capabilities: [
      { en: 'Civil and MEP works near active airside operations', ar: 'أعمال مدنية وكهروميكانيكية بجوار عمليات جوية نشطة' },
      { en: 'Site logistics planned with aviation safety teams', ar: 'تخطيط لوجستيات الموقع بالتعاون مع فرق السلامة الجوية' },
      { en: 'Access and lift scheduling within approved windows', ar: 'جدولة الدخول والرفع ضمن نوافذ زمنية معتمدة' },
      { en: 'Zero airside safety incidents across delivery', ar: 'صفر حوادث سلامة جوية طوال فترة التنفيذ' },
    ],
    relatedProjectSlugs: ['dubai-airport-terminal-c3-fresh-air-plant'],
  },
  {
    slug: 'oil-gas',
    title: { en: 'Oil & Gas', ar: 'النفط والغاز' },
    image: '/images/site/scaffolding-piping-install.jpg',
    overview: {
      en: 'We construct and integrate MEP systems for chemical and process facilities built to strict process-safety requirements, working from hazardous-area documentation from day one rather than retrofitting compliance later.',
      ar: 'ننفذ ونكامل الأنظمة الكهروميكانيكية للمنشآت الكيميائية والتشغيلية المبنية وفق متطلبات سلامة تشغيلية صارمة، بالعمل استناداً إلى توثيق المناطق الخطرة منذ اليوم الأول بدلاً من معالجة الامتثال لاحقاً.',
    },
    capabilities: [
      { en: 'MEP integration for process-safety-classified facilities', ar: 'تكامل كهروميكانيكي للمنشآت المصنّفة وفق السلامة التشغيلية' },
      { en: 'Hazardous-area-led routing and design', ar: 'توجيه وتصميم قائم على تصنيف المناطق الخطرة' },
      { en: 'Compliance verified by third-party inspection', ar: 'التحقق من الامتثال عبر فحص طرف ثالث' },
      { en: 'On-schedule commissioning and operational handover', ar: 'تشغيل وتسليم تشغيلي في الموعد المحدد' },
    ],
    relatedProjectSlugs: [],
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
