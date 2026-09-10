export type Locale = 'en' | 'ar';

interface LocalizedText {
  en: string;
  ar: string;
}

export interface Project {
  slug: string;
  title: LocalizedText;
  location: LocalizedText;
  category: LocalizedText;
  description: LocalizedText;
  image: string;
  gallery: string[];
  challenge: LocalizedText;
  approach: LocalizedText;
  results: LocalizedText[];
}

export interface LocalizedProject {
  slug: string;
  title: string;
  location: string;
  category: string;
  categoryKey: string;
  description: string;
  image: string;
  gallery: string[];
  challenge: string;
  approach: string;
  results: string[];
}

export function localizeProject(project: Project, locale: Locale): LocalizedProject {
  return {
    slug: project.slug,
    title: project.title[locale],
    location: project.location[locale],
    category: project.category[locale],
    categoryKey: project.category.en,
    description: project.description[locale],
    image: project.image,
    gallery: project.gallery,
    challenge: project.challenge[locale],
    approach: project.approach[locale],
    results: project.results.map((r) => r[locale]),
  };
}

export const projects: Project[] = [
  {
    slug: 'marina-business-bay-tower',
    title: { en: 'Marina Business Bay Tower', ar: 'برج مارينا بيزنس باي' },
    location: { en: 'Dubai, UAE', ar: 'دبي، الإمارات العربية المتحدة' },
    category: { en: 'MEP Engineering', ar: 'الهندسة الكهروميكانيكية' },
    description: {
      en: 'Full mechanical, electrical, and plumbing fit-out for a 42-storey mixed-use tower, coordinated across a compressed 18-month construction schedule.',
      ar: 'أعمال تجهيز ميكانيكية وكهربائية وصحية كاملة لبرج متعدد الاستخدامات من 42 طابقاً، تم تنسيقها ضمن جدول إنشائي مضغوط مدته 18 شهراً.',
    },
    image: 'https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop',
    ],
    challenge: {
      en: 'A 42-storey mixed-use tower with residential, retail, and office floors each carrying different MEP load profiles, on a schedule compressed to 18 months by the developer\'s handover commitments.',
      ar: 'برج متعدد الاستخدامات من 42 طابقاً يضم طوابق سكنية وتجارية ومكتبية، لكل منها متطلبات حمل كهروميكانيكية مختلفة، ضمن جدول زمني مضغوط إلى 18 شهراً بسبب التزامات المطور بالتسليم.',
    },
    approach: {
      en: 'We ran MEP coordination in parallel with the structural program rather than sequentially, resolving clashes floor-by-floor through BIM before any first-fix work began, and staged commissioning by zone so occupied floors could hand over while upper floors were still in fit-out.',
      ar: 'نفذنا تنسيق الأعمال الكهروميكانيكية بالتوازي مع البرنامج الإنشائي بدلاً من التسلسل، وحللنا التعارضات طابقاً بطابق عبر نمذجة معلومات البناء (BIM) قبل بدء أي أعمال تأسيسية، ونفذنا التشغيل التجريبي على مراحل حسب المنطقة ليتسنى تسليم الطوابق المشغولة بينما لا تزال الطوابق العليا قيد التجهيز.',
    },
    results: [
      { en: 'Full MEP fit-out delivered inside the 18-month window', ar: 'تسليم أعمال التجهيز الكهروميكانيكية الكاملة ضمن مدة 18 شهراً' },
      { en: 'Zero rework from late-stage service clashes', ar: 'صفر إعادة تنفيذ بسبب تعارضات الخدمات في مراحل متأخرة' },
      { en: 'Phased handover let the developer open retail floors ahead of full tower completion', ar: 'التسليم على مراحل مكّن المطور من افتتاح الطوابق التجارية قبل اكتمال البرج بالكامل' },
    ],
  },
  {
    slug: 'jebel-ali-water-treatment-expansion',
    title: { en: 'Jebel Ali Water Treatment Expansion', ar: 'توسعة محطة معالجة مياه جبل علي' },
    location: { en: 'Dubai, UAE', ar: 'دبي، الإمارات العربية المتحدة' },
    category: { en: 'Water Treatment', ar: 'معالجة المياه' },
    description: {
      en: 'Capacity expansion of a regional water treatment facility, including new clarifier basins and an upgraded filtration line.',
      ar: 'توسعة سعة منشأة إقليمية لمعالجة المياه، تشمل أحواض ترسيب جديدة وخط ترشيح محدّث.',
    },
    image: 'https://images.unsplash.com/photo-1644389355109-15b26f71c36b?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1533163238111-4a7ced54f2e4?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1644389355109-15b26f71c36b?q=80&w=1200&auto=format&fit=crop',
    ],
    challenge: {
      en: 'Expanding treatment capacity at a live facility that could not go offline, with new clarifier basins and a filtration line upgrade needing to tie into an active process stream.',
      ar: 'توسعة سعة المعالجة في منشأة تعمل باستمرار ولا يمكن إيقافها، مع الحاجة إلى ربط أحواض الترسيب الجديدة وخط الترشيح المحدّث بمسار تشغيلي نشط.',
    },
    approach: {
      en: 'Work was sequenced around the plant\'s own operating schedule, building and pressure-testing new basins in isolation before a series of short, planned tie-in windows rather than one extended shutdown.',
      ar: 'تم تنظيم الأعمال حول الجدول التشغيلي للمحطة نفسها، ببناء واختبار ضغط الأحواض الجديدة بشكل منفصل قبل سلسلة من فترات ربط قصيرة ومخططة بدلاً من إيقاف تشغيل ممتد واحد.',
    },
    results: [
      { en: 'Zero unplanned downtime for the existing treatment line', ar: 'صفر توقف غير مخطط له لخط المعالجة القائم' },
      { en: 'Expanded clarifier capacity commissioned in staged tie-ins', ar: 'تشغيل سعة الترسيب الموسّعة عبر عمليات ربط مرحلية' },
      { en: 'Upgraded filtration line handed over with full process documentation', ar: 'تسليم خط الترشيح المحدّث مع توثيق تشغيلي كامل' },
    ],
  },
  {
    slug: 'riyadh-industrial-energy-plant',
    title: { en: 'Riyadh Industrial Energy Plant', ar: 'محطة الطاقة الصناعية بالرياض' },
    location: { en: 'Riyadh, KSA', ar: 'الرياض، المملكة العربية السعودية' },
    category: { en: 'Energy Solutions', ar: 'حلول الطاقة' },
    description: {
      en: 'Electro-mechanical works for an industrial power facility, from switchgear installation through to commissioning and handover.',
      ar: 'أعمال كهروميكانيكية لمنشأة طاقة صناعية، من تركيب لوحات التحكم الكهربائية وحتى التشغيل والتسليم.',
    },
    image: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
    ],
    challenge: {
      en: 'High-voltage switchgear installation and cabling for an industrial power facility, where sequencing errors during energization carry real safety and equipment-damage risk.',
      ar: 'تركيب لوحات التحكم عالية الجهد والكابلات لمنشأة طاقة صناعية، حيث تحمل أخطاء التسلسل أثناء التغذية الكهربائية مخاطر حقيقية على السلامة والمعدات.',
    },
    approach: {
      en: 'A dedicated HSE lead sat on the switchgear crew for the full duration of installation, with every energization step signed off against a documented test procedure before proceeding to the next.',
      ar: 'رافق مسؤول مختص بالصحة والسلامة فريق التركيب طوال مدة العمل، مع اعتماد كل خطوة تغذية كهربائية وفق إجراء اختبار موثّق قبل الانتقال إلى الخطوة التالية.',
    },
    results: [
      { en: 'Switchgear installation and commissioning completed with zero lost-time incidents', ar: 'إتمام تركيب وتشغيل لوحات التحكم دون أي حوادث تعطيل عمل' },
      { en: 'Full test and commissioning documentation handed over for the plant\'s O&M records', ar: 'تسليم توثيق اختبار وتشغيل كامل لسجلات التشغيل والصيانة الخاصة بالمحطة' },
      { en: 'Facility energized on schedule for client handover', ar: 'تغذية المنشأة بالكهرباء في الموعد المحدد للتسليم للعميل' },
    ],
  },
  {
    slug: 'king-abdullah-logistics-hub',
    title: { en: 'King Abdullah Logistics Hub', ar: 'مركز الملك عبدالله اللوجستي' },
    location: { en: 'Jeddah, KSA', ar: 'جدة، المملكة العربية السعودية' },
    category: { en: 'Infrastructure', ar: 'البنية التحتية' },
    description: {
      en: 'Site-wide utilities and infrastructure works for a large-scale logistics and distribution hub serving the western region.',
      ar: 'أعمال مرافق وبنية تحتية على مستوى الموقع بأكمله لمركز لوجستي وتوزيع واسع النطاق يخدم المنطقة الغربية.',
    },
    image: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
    ],
    challenge: {
      en: 'Site-wide utilities — power distribution, water, and drainage — for a large logistics hub spread across multiple warehouse blocks being built in parallel by different contractors.',
      ar: 'مرافق على مستوى الموقع بأكمله — توزيع الكهرباء والمياه والصرف — لمركز لوجستي كبير موزّع على عدة مجمعات مستودعات يتم إنشاؤها بالتوازي من قبل مقاولين مختلفين.',
    },
    approach: {
      en: 'We took on utilities coordination across the whole site rather than block-by-block, giving each parallel contractor a single point of contact for tie-in scheduling and avoiding the clashes that come from independently-scheduled trenching and routing.',
      ar: 'تولينا تنسيق المرافق على مستوى الموقع بأكمله بدلاً من كل مجمع على حدة، مما وفّر لكل مقاول موازٍ جهة اتصال واحدة لجدولة الربط، وتجنّب التعارضات الناتجة عن أعمال الحفر والتمديد المجدولة بشكل منفصل.',
    },
    results: [
      { en: 'Site-wide utilities delivered across multiple concurrent building contracts', ar: 'تسليم المرافق على مستوى الموقع بأكمله عبر عدة عقود بناء متزامنة' },
      { en: 'No utility-related delays reported by any of the parallel building contractors', ar: 'عدم تسجيل أي تأخير متعلق بالمرافق من قبل أي من مقاولي البناء الموازيين' },
      { en: 'Infrastructure sized with headroom for the hub\'s planned future expansion phases', ar: 'تصميم البنية التحتية بسعة إضافية لمراحل التوسع المستقبلية المخطط لها للمركز' },
    ],
  },
  {
    slug: 'abu-dhabi-corporate-campus',
    title: { en: 'Abu Dhabi Corporate Campus', ar: 'المجمع المؤسسي بأبوظبي' },
    location: { en: 'Abu Dhabi, UAE', ar: 'أبوظبي، الإمارات العربية المتحدة' },
    category: { en: 'Civil Works', ar: 'الأعمال المدنية' },
    description: {
      en: 'Structural and civil works for a low-rise corporate campus, delivered to exacting quality and HSE standards from foundation to finishing.',
      ar: 'أعمال إنشائية ومدنية لمجمع مؤسسي منخفض الارتفاع، نُفذت وفق معايير جودة وسلامة صارمة من الأساسات إلى التشطيبات.',
    },
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop',
    ],
    challenge: {
      en: 'A low-rise corporate campus where the client\'s architectural finish tolerances were significantly tighter than typical commercial standards, spanning several connected structures.',
      ar: 'مجمع مؤسسي منخفض الارتفاع تطلّب معايير تشطيب معمارية أكثر دقة بكثير من المعايير التجارية المعتادة، ويمتد عبر عدة مبانٍ متصلة.',
    },
    approach: {
      en: 'We ran an independent quality inspection pass at every structural milestone, ahead of the client\'s own inspections, catching finish and tolerance issues early enough to correct without impacting the schedule.',
      ar: 'نفذنا جولة فحص جودة مستقلة عند كل مرحلة إنشائية، قبل فحوصات العميل نفسها، لرصد مشكلات التشطيب والدقة مبكراً بما يكفي لتصحيحها دون التأثير على الجدول الزمني.',
    },
    results: [
      { en: 'Structural and civil works delivered to the client\'s tightened finish tolerances', ar: 'تسليم الأعمال الإنشائية والمدنية وفق معايير التشطيب الدقيقة التي حددها العميل' },
      { en: 'No major inspection failures at any project milestone', ar: 'عدم وجود إخفاقات فحص كبرى في أي مرحلة من مراحل المشروع' },
      { en: 'Campus handed over on the agreed schedule', ar: 'تسليم المجمع وفق الجدول الزمني المتفق عليه' },
    ],
  },
  {
    slug: 'sharjah-chemical-processing-facility',
    title: { en: 'Sharjah Chemical Processing Facility', ar: 'منشأة المعالجة الكيميائية بالشارقة' },
    location: { en: 'Sharjah, UAE', ar: 'الشارقة، الإمارات العربية المتحدة' },
    category: { en: 'Chemical Facilities', ar: 'المنشآت الكيميائية' },
    description: {
      en: 'Specialized construction and MEP integration for a chemical processing plant, built to strict process-safety requirements.',
      ar: 'أعمال إنشاء وتكامل كهروميكانيكي متخصصة لمصنع معالجة كيميائية، نُفذت وفق متطلبات سلامة تشغيلية صارمة.',
    },
    image: 'https://images.unsplash.com/photo-1678984240126-70bcddd7a228?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1678984240126-70bcddd7a228?q=80&w=1200&auto=format&fit=crop',
    ],
    challenge: {
      en: 'MEP integration for a chemical processing plant where hazardous-area classification governed nearly every electrical and mechanical routing decision on site.',
      ar: 'تكامل كهروميكانيكي لمصنع معالجة كيميائية حيث حكم تصنيف المناطق الخطرة تقريباً كل قرار توجيه كهربائي وميكانيكي في الموقع.',
    },
    approach: {
      en: 'Our design coordination team worked from the process-safety documentation from day one rather than treating it as a late-stage compliance check, so hazardous-area boundaries shaped the MEP routing plan instead of forcing rework against it.',
      ar: 'عمل فريق تنسيق التصميم لدينا استناداً إلى توثيق السلامة التشغيلية منذ اليوم الأول بدلاً من التعامل معه كفحص امتثال متأخر، بحيث شكّلت حدود المناطق الخطرة خطة التوجيه الكهروميكانيكي بدلاً من فرض إعادة العمل عليها.',
    },
    results: [
      { en: 'MEP works delivered fully compliant with the facility\'s process-safety classification', ar: 'تسليم الأعمال الكهروميكانيكية بامتثال كامل لتصنيف السلامة التشغيلية للمنشأة' },
      { en: 'No hazardous-area routing conflicts identified during third-party inspection', ar: 'عدم رصد أي تعارضات في توجيه المناطق الخطرة أثناء فحص طرف ثالث' },
      { en: 'Plant commissioned and handed over to the client\'s operations team on schedule', ar: 'تشغيل المصنع وتسليمه لفريق تشغيل العميل في الموعد المحدد' },
    ],
  },
  {
    slug: 'dubai-south-aviation-support-facility',
    title: { en: 'Dubai South Aviation Support Facility', ar: 'منشأة الدعم الجوي بدبي الجنوب' },
    location: { en: 'Dubai, UAE', ar: 'دبي، الإمارات العربية المتحدة' },
    category: { en: 'Infrastructure', ar: 'البنية التحتية' },
    description: {
      en: 'Civil and MEP works for an aviation logistics support facility, coordinated tightly with airside safety and access restrictions.',
      ar: 'أعمال مدنية وكهروميكانيكية لمنشأة دعم لوجستي جوي، نُسّقت بدقة مع قيود السلامة والدخول في الجانب الجوي.',
    },
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590496793929-36417d3117de?q=80&w=1200&auto=format&fit=crop',
    ],
    challenge: {
      en: 'Civil and MEP works adjacent to active airside operations, where every site access and crane lift had to be scheduled around aviation safety restrictions rather than construction convenience.',
      ar: 'أعمال مدنية وكهروميكانيكية بجوار عمليات جوية نشطة، حيث تعيّن جدولة كل دخول للموقع وكل عملية رفع بالرافعة وفق قيود السلامة الجوية بدلاً من ملاءمة الإنشاء.',
    },
    approach: {
      en: 'Site logistics were planned jointly with the facility\'s aviation safety team before construction started, building an access and lift schedule around their approved windows instead of requesting exceptions as issues came up.',
      ar: 'تم تخطيط لوجستيات الموقع بالتعاون مع فريق السلامة الجوية للمنشأة قبل بدء الإنشاء، ببناء جدول للدخول والرفع حول النوافذ الزمنية المعتمدة بدلاً من طلب استثناءات كلما ظهرت مشكلة.',
    },
    results: [
      { en: 'Zero airside safety incidents or access violations across the build', ar: 'صفر حوادث سلامة جوية أو مخالفات دخول طوال فترة الإنشاء' },
      { en: 'Construction access windows maintained without disrupting adjacent operations', ar: 'الالتزام بنوافذ دخول الإنشاء دون تعطيل العمليات المجاورة' },
      { en: 'Facility delivered ready for aviation logistics handover', ar: 'تسليم المنشأة جاهزة للتشغيل اللوجستي الجوي' },
    ],
  },
  {
    slug: 'neom-regional-substation',
    title: { en: 'NEOM Regional Substation', ar: 'المحطة الفرعية الإقليمية بنيوم' },
    location: { en: 'Riyadh, KSA', ar: 'الرياض، المملكة العربية السعودية' },
    category: { en: 'Energy Solutions', ar: 'حلول الطاقة' },
    description: {
      en: 'Electro-mechanical build-out of a regional power substation supporting renewable energy integration for the surrounding grid.',
      ar: 'إنشاء كهروميكانيكي لمحطة كهرباء فرعية إقليمية تدعم تكامل الطاقة المتجددة مع الشبكة المحيطة.',
    },
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
    ],
    challenge: {
      en: 'A regional substation build-out needing to support variable load from renewable generation sources feeding into the grid, rather than the steady load profile of a conventional plant.',
      ar: 'إنشاء محطة فرعية إقليمية تحتاج إلى دعم حمل متغير من مصادر توليد متجددة تغذي الشبكة، بدلاً من نمط الحمل الثابت لمحطة تقليدية.',
    },
    approach: {
      en: 'Switchgear and protection systems were specified and installed to the grid operator\'s renewable-integration standard from the outset, with commissioning tests run against variable-load scenarios rather than a single fixed-load test.',
      ar: 'تم تحديد وتركيب أنظمة التحكم والحماية وفق معيار مشغّل الشبكة لتكامل الطاقة المتجددة منذ البداية، مع إجراء اختبارات التشغيل وفق سيناريوهات حمل متغيرة بدلاً من اختبار حمل ثابت واحد.',
    },
    results: [
      { en: 'Substation commissioned to the grid operator\'s renewable-integration standard', ar: 'تشغيل المحطة الفرعية وفق معيار مشغّل الشبكة لتكامل الطاقة المتجددة' },
      { en: 'Protection systems validated across variable-load test scenarios', ar: 'التحقق من أنظمة الحماية عبر سيناريوهات اختبار حمل متغيرة' },
      { en: 'Handed over ready to support the surrounding grid\'s renewable capacity', ar: 'التسليم جاهزة لدعم سعة الطاقة المتجددة للشبكة المحيطة' },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
