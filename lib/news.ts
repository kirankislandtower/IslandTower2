export type Locale = 'en' | 'ar';

interface LocalizedText {
  en: string;
  ar: string;
}

export interface Article {
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  category: LocalizedText;
  date: string;
  readTime: LocalizedText;
  image: string;
  content: LocalizedText[];
}

export interface LocalizedArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
}

export function localizeArticle(article: Article, locale: Locale): LocalizedArticle {
  return {
    slug: article.slug,
    title: article.title[locale],
    excerpt: article.excerpt[locale],
    category: article.category[locale],
    date: article.date,
    readTime: article.readTime[locale],
    image: article.image,
    content: article.content.map((c) => c[locale]),
  };
}

export const articles: Article[] = [
  {
    slug: 'mep-coordination-before-structural-freeze',
    title: {
      en: 'Why MEP Coordination Should Start Before the Structural Design Freezes',
      ar: 'لماذا يجب أن يبدأ التنسيق الكهروميكانيكي قبل تجميد التصميم الإنشائي',
    },
    excerpt: {
      en: 'Waiting for structural drawings to lock before starting MEP coordination is the single biggest source of late-stage clashes on tower projects.',
      ar: 'انتظار اعتماد المخططات الإنشائية قبل بدء التنسيق الكهروميكانيكي هو أكبر مصدر منفرد للتعارضات المتأخرة في مشاريع الأبراج.',
    },
    category: { en: 'MEP Engineering', ar: 'الهندسة الكهروميكانيكية' },
    date: '2026-08-12',
    readTime: { en: '5 min read', ar: 'قراءة 5 دقائق' },
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1600&auto=format&fit=crop',
    content: [
      {
        en: 'On most mixed-use tower projects, MEP coordination is treated as a downstream activity — something that starts once structural drawings are issued for construction. By that point, riser locations, slab penetrations, and ceiling voids are effectively fixed, and every MEP clash becomes a negotiation over an already-poured structure.',
        ar: 'في معظم مشاريع الأبراج متعددة الاستخدامات، يُعامل التنسيق الكهروميكانيكي كنشاط لاحق — يبدأ بعد إصدار المخططات الإنشائية للتنفيذ. عند تلك المرحلة، تكون مواقع المجاري الرأسية وفتحات البلاطات وفراغات الأسقف مثبتة فعلياً، ويتحول كل تعارض كهروميكانيكي إلى مفاوضة حول هيكل تم صبه بالفعل.',
      },
      {
        en: 'The alternative is to bring MEP coordination into the same design room as structural engineering while both are still in schematic development. This does not mean MEP drawings need to be complete — it means the major service runs, riser sizing, and plant room locations get reviewed against the structural grid before either discipline locks its own assumptions.',
        ar: 'البديل هو إشراك فريق التنسيق الكهروميكانيكي في نفس غرفة التصميم مع الهندسة الإنشائية بينما لا يزال كلاهما في مرحلة التطوير المبدئي. هذا لا يعني أن المخططات الكهروميكانيكية يجب أن تكون مكتملة — بل يعني مراجعة مسارات الخدمات الرئيسية وأحجام المجاري الرأسية ومواقع غرف المعدات مقابل الشبكة الإنشائية قبل أن يثبّت أي من التخصصين افتراضاته الخاصة.',
      },
      {
        en: 'In practice, this shifts a meaningful share of coordination effort earlier in the program, when changes are cheap, instead of during construction, when changes mean rework. It also gives the MEP contractor a real say in decisions — like riser shaft sizing or transfer floor locations — that are difficult or impossible to revisit once structural work is underway.',
        ar: 'من الناحية العملية، ينقل هذا جزءاً مهماً من جهد التنسيق إلى مرحلة أبكر من البرنامج، حين تكون التغييرات رخيصة، بدلاً من مرحلة التنفيذ حين تعني التغييرات إعادة عمل. كما يمنح المقاول الكهروميكانيكي رأياً حقيقياً في قرارات — مثل حجم بئر المجرى الرأسي أو مواقع الطوابق الانتقالية — يصعب أو يستحيل مراجعتها بعد بدء الأعمال الإنشائية.',
      },
      {
        en: 'The tradeoff is that it asks more of the design team early on: structural and MEP engineers need to be in the same conversations well before either discipline is ready to finalize. For projects on compressed schedules, that upfront coordination cost is consistently smaller than the cost of resolving clashes after first-fix work has started.',
        ar: 'المقابل هو أن ذلك يتطلب المزيد من فريق التصميم مبكراً: يحتاج المهندسون الإنشائيون والكهروميكانيكيون إلى المشاركة في نفس النقاشات قبل وقت طويل من استعداد أي من التخصصين للاعتماد النهائي. بالنسبة للمشاريع ذات الجداول الزمنية المضغوطة، تكون تكلفة هذا التنسيق المبكر أقل باستمرار من تكلفة حل التعارضات بعد بدء أعمال التأسيس.',
      },
    ],
  },
  {
    slug: 'hse-protocols-that-reduce-incidents',
    title: {
      en: 'HSE Protocols That Actually Reduce Lost-Time Incidents',
      ar: 'بروتوكولات الصحة والسلامة التي تقلل فعلياً حوادث تعطيل العمل',
    },
    excerpt: {
      en: 'Most safety programs look similar on paper. The ones that actually move incident rates share a few specific, unglamorous habits.',
      ar: 'تبدو معظم برامج السلامة متشابهة على الورق. البرامج التي تخفض معدلات الحوادث فعلياً تشترك في بضع عادات محددة وغير لافتة.',
    },
    category: { en: 'Safety & HSE', ar: 'السلامة والصحة المهنية' },
    date: '2026-07-28',
    readTime: { en: '4 min read', ar: 'قراءة 4 دقائق' },
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop',
    content: [
      {
        en: 'Every EPC contractor publishes a safety policy, and most of them look nearly identical: PPE requirements, toolbox talks, incident reporting procedures. The documents rarely explain what actually separates a site with a strong safety record from one that struggles with recurring near-misses.',
        ar: 'ينشر كل مقاول EPC سياسة سلامة، ومعظمها متشابه تقريباً: متطلبات معدات الحماية الشخصية، واجتماعات التوعية اليومية، وإجراءات الإبلاغ عن الحوادث. نادراً ما توضح هذه الوثائق ما الذي يميز فعلياً موقعاً بسجل سلامة قوي عن آخر يعاني من حوادث وشيكة متكررة.',
      },
      {
        en: 'The practical difference usually comes down to a small number of specific habits. The first is closing the loop on near-misses, not just incidents — a site that treats a near-miss report as seriously as an actual injury catches the pattern before someone gets hurt. The second is giving site supervisors real authority to stop work without needing sign-off from someone off-site, which sounds obvious but is inconsistently applied in practice.',
        ar: 'يعود الفرق العملي عادة إلى عدد صغير من العادات المحددة. الأولى هي إغلاق الحلقة على الحوادث الوشيكة، لا الحوادث الفعلية فقط — فالموقع الذي يتعامل مع تقرير حادث وشيك بجدية توازي الإصابة الفعلية يكتشف النمط قبل أن يتأذى أحد. الثانية هي منح مشرفي الموقع صلاحية حقيقية لإيقاف العمل دون الحاجة لموافقة من خارج الموقع، وهو أمر يبدو بديهياً لكنه يُطبق بشكل متفاوت عملياً.',
      },
      {
        en: 'The third, and probably the most overlooked, is scheduling. A disproportionate share of site incidents cluster around schedule-compression periods — the last two weeks before a milestone, or the days right after a delay when everyone is trying to catch up. Safety programs that build explicit schedule buffer around known-risky phases, rather than treating safety and schedule as separate conversations, consistently show better outcomes than programs that rely purely on training and signage.',
        ar: 'الثالثة، وربما الأكثر إغفالاً، هي الجدولة. تتركز نسبة غير متناسبة من حوادث الموقع حول فترات ضغط الجدول الزمني — الأسبوعين الأخيرين قبل معلم رئيسي، أو الأيام التي تعقب مباشرة أي تأخير حين يحاول الجميع تعويض الوقت. برامج السلامة التي تبني هامشاً زمنياً صريحاً حول المراحل المعروفة بالخطورة، بدلاً من التعامل مع السلامة والجدول الزمني كنقاشين منفصلين، تُظهر نتائج أفضل باستمرار من البرامج التي تعتمد فقط على التدريب واللافتات.',
      },
      {
        en: 'None of this is complicated. It is also not free — stopping work costs time, and buffer costs schedule contingency. The sites that hold to it anyway are the ones with the numbers to show for it at handover.',
        ar: 'لا شيء من هذا معقد. كما أنه ليس مجانياً — إيقاف العمل يكلف وقتاً، والهامش الزمني يكلف احتياطي الجدول. المواقع التي تلتزم به رغم ذلك هي التي تملك الأرقام التي تثبت ذلك عند التسليم.',
      },
    ],
  },
  {
    slug: 'selecting-an-epc-contractor-in-the-uae',
    title: {
      en: 'What to Look for When Selecting an EPC Contractor in the UAE',
      ar: 'ما الذي يجب البحث عنه عند اختيار مقاول EPC في الإمارات',
    },
    excerpt: {
      en: 'Beyond price and past project photos, a handful of specific questions reveal whether a contractor can actually deliver on a complex scope.',
      ar: 'إلى جانب السعر وصور المشاريع السابقة، تكشف بضعة أسئلة محددة ما إذا كان المقاول قادراً فعلياً على تنفيذ نطاق عمل معقد.',
    },
    category: { en: 'Industry Insight', ar: 'رؤى القطاع' },
    date: '2026-07-05',
    readTime: { en: '6 min read', ar: 'قراءة 6 دقائق' },
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1600&auto=format&fit=crop',
    content: [
      {
        en: 'Most EPC contractor shortlists are built around the same three inputs: price, a portfolio of past projects, and a handful of client references. All three matter, but none of them answer the question that actually predicts project outcomes — how the contractor handles the inevitable moment when the schedule, the scope, and the site conditions stop agreeing with each other.',
        ar: 'تُبنى معظم القوائم المختصرة لمقاولي EPC حول نفس المدخلات الثلاثة: السعر، ومحفظة المشاريع السابقة، وعدد من مراجع العملاء. الثلاثة مهمة، لكن لا يجيب أي منها عن السؤال الذي يتنبأ فعلياً بنتائج المشروع — كيف يتعامل المقاول مع اللحظة الحتمية حين يتوقف الجدول الزمني ونطاق العمل وظروف الموقع عن الاتساق مع بعضها.',
      },
      {
        en: 'A more useful set of questions goes further. Who on the contractor\'s team has direct authority to make a call when a design clash is discovered on site — and how long does that decision typically take? What does their subcontractor management actually look like on a live project, not on paper? How do they handle a client-driven scope change six weeks before a milestone, and what does that do to the rest of the schedule?',
        ar: 'مجموعة أسئلة أكثر فائدة تذهب أبعد من ذلك. من في فريق المقاول يملك صلاحية مباشرة لاتخاذ قرار عند اكتشاف تعارض تصميمي في الموقع — وكم من الوقت يستغرق ذلك القرار عادة؟ كيف تبدو إدارة المقاولين من الباطن فعلياً في مشروع حقيقي، لا على الورق؟ كيف يتعاملون مع تغيير في نطاق العمل بطلب من العميل قبل ستة أسابيع من معلم رئيسي، وما تأثير ذلك على بقية الجدول الزمني؟',
      },
      {
        en: 'It is also worth asking about safety record in a specific way — not just a total incident number, but how incidents and near-misses get reported and what changes as a result. A contractor with a small number of well-documented near-misses that led to real changes in site procedure is often a safer bet than one reporting zero incidents with no visible process behind that number.',
        ar: 'يستحق الأمر أيضاً السؤال عن سجل السلامة بطريقة محددة — ليس فقط عدد الحوادث الإجمالي، بل كيف يتم الإبلاغ عن الحوادث والحوادث الوشيكة وما الذي يتغير نتيجة لذلك. المقاول الذي لديه عدد صغير من الحوادث الوشيكة الموثقة جيداً والتي أدت إلى تغييرات حقيقية في إجراءات الموقع غالباً ما يكون خياراً أكثر أماناً من مقاول يعلن صفر حوادث دون عملية واضحة خلف ذلك الرقم.',
      },
      {
        en: 'Finally, ask what happens when things go well. A contractor that can walk through a project where the original plan changed significantly, and explain specifically how they adapted without losing the schedule or the budget, has usually demonstrated more real capability than one whose case studies all describe projects that went exactly to plan.',
        ar: 'أخيراً، اسأل عما يحدث عندما تسير الأمور بشكل جيد. المقاول القادر على شرح مشروع تغيرت خطته الأصلية بشكل كبير، وتوضيح كيف تكيّف تحديداً دون فقدان الجدول الزمني أو الميزانية، يكون قد أظهر عادة قدرة حقيقية أكبر من مقاول تصف كل دراسات حالته مشاريع سارت تماماً كما خُطط لها.',
      },
    ],
  },
  {
    slug: 'water-treatment-capacity-planning',
    title: {
      en: 'Water Treatment Capacity Planning for Growing Facilities',
      ar: 'تخطيط سعة معالجة المياه للمنشآت المتنامية',
    },
    excerpt: {
      en: 'Expanding treatment capacity at a live facility comes with constraints that new-build projects never have to think about.',
      ar: 'توسعة سعة المعالجة في منشأة قائمة تأتي مع قيود لا تحتاج مشاريع الإنشاء الجديدة للتفكير فيها إطلاقاً.',
    },
    category: { en: 'Water Treatment', ar: 'معالجة المياه' },
    date: '2026-06-18',
    readTime: { en: '5 min read', ar: 'قراءة 5 دقائق' },
    image: 'https://images.unsplash.com/photo-1644389355109-15b26f71c36b?q=80&w=1600&auto=format&fit=crop',
    content: [
      {
        en: 'A new-build water treatment facility gets to design its process train from a blank site. A capacity expansion at an existing, operating facility does not have that luxury — every new clarifier basin, filtration line, or pump station has to tie into a process that cannot go offline for the length of a typical construction program.',
        ar: 'تحظى منشأة معالجة مياه جديدة بتصميم مسار معالجتها من موقع فارغ تماماً. أما توسعة السعة في منشأة قائمة وتعمل فلا تملك هذه الميزة — فكل حوض ترسيب أو خط ترشيح أو محطة ضخ جديدة يجب أن ترتبط بعملية لا يمكن إيقافها طوال مدة برنامج الإنشاء المعتاد.',
      },
      {
        en: 'The planning challenge is less about the treatment technology itself and more about sequencing. New infrastructure needs to be built and pressure-tested in isolation from the live process, with tie-in work compressed into short, carefully scheduled windows rather than one extended shutdown. That means the construction program has to be built around the facility\'s own operating constraints, not the other way around.',
        ar: 'تحدي التخطيط أقل ارتباطاً بتقنية المعالجة نفسها وأكثر ارتباطاً بالتسلسل. يجب بناء البنية التحتية الجديدة واختبار ضغطها بمعزل عن العملية التشغيلية النشطة، مع ضغط أعمال الربط في نوافذ زمنية قصيرة ومجدولة بعناية بدلاً من إيقاف تشغيل ممتد واحد. هذا يعني أن برنامج الإنشاء يجب أن يُبنى حول القيود التشغيلية الخاصة بالمنشأة، لا العكس.',
      },
      {
        en: 'It also changes how much slack a project can realistically build in. A delay on a new-build site usually costs schedule and money. A delay on a live-facility expansion can mean re-planning an entire tie-in window around the facility\'s operating calendar, which might not have another opening for weeks.',
        ar: 'كما يغير ذلك مقدار المرونة التي يمكن للمشروع بناؤها واقعياً. التأخير في موقع إنشاء جديد يكلف عادة وقتاً ومالاً. أما التأخير في توسعة منشأة قائمة فقد يعني إعادة تخطيط نافذة ربط كاملة حول التقويم التشغيلي للمنشأة، والذي قد لا تتوفر فيه فرصة أخرى لأسابيع.',
      },
      {
        en: 'Facilities planning a capacity expansion get the most value out of engaging their EPC partner during the feasibility stage, before tie-in points are fixed on paper — the same way structural and MEP coordination benefits from an earlier conversation, sequencing around a live process benefits from being part of the design from the start, not bolted on afterward.',
        ar: 'تحصل المنشآت التي تخطط لتوسعة سعتها على أكبر قيمة من إشراك شريك EPC خلال مرحلة دراسة الجدوى، قبل تثبيت نقاط الربط على الورق — تماماً كما يستفيد التنسيق الإنشائي والكهروميكانيكي من نقاش أبكر، يستفيد التسلسل حول عملية تشغيلية نشطة من أن يكون جزءاً من التصميم منذ البداية، لا إضافة لاحقة.',
      },
    ],
  },
  {
    slug: 'phased-commissioning-mixed-use-towers',
    title: {
      en: 'The Case for Phased Commissioning on Mixed-Use Towers',
      ar: 'حجة التشغيل المرحلي في الأبراج متعددة الاستخدامات',
    },
    excerpt: {
      en: 'Commissioning a tower floor by floor, rather than all at once, changes what a compressed handover schedule actually looks like.',
      ar: 'تشغيل البرج طابقاً بطابق، بدلاً من دفعة واحدة، يغير شكل الجدول الزمني المضغوط للتسليم فعلياً.',
    },
    category: { en: 'MEP Engineering', ar: 'الهندسة الكهروميكانيكية' },
    date: '2026-05-22',
    readTime: { en: '4 min read', ar: 'قراءة 4 دقائق' },
    image: 'https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?q=80&w=1600&auto=format&fit=crop',
    content: [
      {
        en: 'The default assumption on most tower projects is that commissioning happens once, at the end, across the whole building. That assumption holds up fine on a generous schedule. It breaks down fast on a compressed one, where the developer needs to open retail or lower floors well before upper floors are anywhere near ready.',
        ar: 'الافتراض الافتراضي في معظم مشاريع الأبراج هو أن التشغيل يحدث مرة واحدة، في النهاية، عبر المبنى بأكمله. يصمد هذا الافتراض جيداً في جدول زمني مرن. لكنه ينهار سريعاً في جدول مضغوط، حيث يحتاج المطور لافتتاح الطوابق التجارية أو السفلية قبل وقت طويل من اقتراب الطوابق العليا من الجاهزية.',
      },
      {
        en: 'Phased, zone-by-zone commissioning is the practical alternative — testing and handing over MEP systems floor by floor or zone by zone as each section is complete, rather than waiting for the entire building to finish. It requires the systems to be designed with that kind of independence in mind from early on, since shared risers and central plant can make true zone isolation difficult to retrofit late in a project.',
        ar: 'التشغيل المرحلي حسب المنطقة هو البديل العملي — اختبار وتسليم الأنظمة الكهروميكانيكية طابقاً بطابق أو منطقة بمنطقة عند اكتمال كل قسم، بدلاً من انتظار اكتمال المبنى بأكمله. يتطلب هذا تصميم الأنظمة مع مراعاة هذا النوع من الاستقلالية منذ وقت مبكر، إذ يمكن أن تجعل المجاري الرأسية المشتركة والمعدات المركزية عزل المناطق الحقيقي صعب التعديل في مرحلة متأخرة من المشروع.',
      },
      {
        en: 'The payoff is real: a developer can start generating revenue from completed floors while upper floors are still in fit-out, instead of the whole building sitting idle until the last piece of commissioning is signed off. The cost is added coordination complexity — commissioning teams need clear zone boundaries, and central plant capacity needs to be planned around partial occupancy loads, not just the building\'s final full-occupancy demand.',
        ar: 'العائد حقيقي: يمكن للمطور البدء بتحصيل إيرادات من الطوابق المكتملة بينما لا تزال الطوابق العليا قيد التجهيز، بدلاً من بقاء المبنى بأكمله خاملاً حتى اعتماد آخر جزء من التشغيل. التكلفة هي تعقيد تنسيقي إضافي — تحتاج فرق التشغيل إلى حدود واضحة للمناطق، ويجب التخطيط لسعة المعدات المركزية حول أحمال الإشغال الجزئي، لا فقط الطلب النهائي عند الإشغال الكامل للمبنى.',
      },
      {
        en: 'For projects with firm, staged handover commitments, that added complexity is usually worth it. For projects with a single, all-at-once handover date, it is often unnecessary overhead. The decision comes down to how much the schedule actually depends on early partial occupancy — which is worth settling well before the MEP design is finalized, not after.',
        ar: 'بالنسبة للمشاريع ذات التزامات التسليم المرحلي الثابتة، يستحق هذا التعقيد الإضافي عادة. أما المشاريع ذات موعد تسليم واحد دفعة واحدة، فغالباً ما يكون هذا عبئاً غير ضروري. يعود القرار إلى مدى اعتماد الجدول الزمني فعلياً على الإشغال الجزئي المبكر — وهو أمر يستحق حسمه قبل اعتماد التصميم الكهروميكانيكي النهائي، لا بعده.',
      },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
