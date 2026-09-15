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
  client?: string;
  consultant?: string;
  contractValue?: LocalizedText;
  scope: LocalizedText;
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
  client?: string;
  consultant?: string;
  contractValue?: string;
  scope: string;
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
    client: project.client,
    consultant: project.consultant,
    contractValue: project.contractValue?.[locale],
    scope: project.scope[locale],
  };
}

// Sourced from Island Tower's official pre-qualification document
// (major projects executed, with real clients, consultants and contract values).
export const projects: Project[] = [
  {
    slug: 'jumeirah-village-south-district-cooling',
    title: {
      en: 'Jumeirah Village South District Cooling Network',
      ar: 'شبكة التبريد المركزي لقرية جميرا الجنوبية',
    },
    location: { en: 'Dubai, UAE', ar: 'دبي، الإمارات العربية المتحدة' },
    category: { en: 'District Cooling', ar: 'التبريد المركزي' },
    description: {
      en: 'Valve chamber construction and large-diameter GRP chilled water pipe installation for one of the largest district cooling contracts in our portfolio.',
      ar: 'إنشاء غرف الصمامات وتركيب أنابيب المياه المبردة من الألياف الزجاجية كبيرة القطر، ضمن أحد أكبر عقود التبريد المركزي في أعمالنا.',
    },
    image: 'https://images.unsplash.com/photo-1678984240126-70bcddd7a228?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      '/images/projects/fabrication-piping-skid.jpg',
      '/images/projects/chilled-water-pump-replacement.jpg',
    ],
    client: 'Empower',
    consultant: 'DAR Al-Handasah Consultants',
    contractValue: { en: 'AED 45 Million', ar: '45 مليون درهم إماراتي' },
    scope: {
      en: 'Construction of valve chambers, and installation and commissioning of GRP chilled water pipe up to 1,400mm in diameter, for the Jumeirah Village South district cooling network.',
      ar: 'إنشاء غرف الصمامات، وتركيب وتشغيل أنابيب المياه المبردة من الألياف الزجاجية بأقطار تصل إلى 1400 مم، لشبكة التبريد المركزي في قرية جميرا الجنوبية.',
    },
  },
  {
    slug: 'jumeirah-village-triangle-district-cooling-phase-3',
    title: {
      en: 'Jumeirah Village Triangle District Cooling — Phase 3',
      ar: 'التبريد المركزي لقرية جميرا المثلث — المرحلة 3',
    },
    location: { en: 'Dubai, UAE', ar: 'دبي، الإمارات العربية المتحدة' },
    category: { en: 'District Cooling', ar: 'التبريد المركزي' },
    description: {
      en: 'Valve chamber construction and 1,200mm chilled water pipe installation for the third phase of the Jumeirah Village Triangle district cooling network.',
      ar: 'إنشاء غرف الصمامات وتركيب أنابيب مياه مبردة بقطر 1200 مم للمرحلة الثالثة من شبكة التبريد المركزي لقرية جميرا المثلث.',
    },
    image: '/images/projects/jvt-tank-installation.jpg',
    gallery: [
      '/images/projects/chilled-water-pump-replacement.jpg',
      'https://images.unsplash.com/photo-1644389355109-15b26f71c36b?q=80&w=1200&auto=format&fit=crop',
    ],
    client: 'Empower',
    consultant: 'Jouzy Consultant Engineers',
    contractValue: { en: 'AED 20 Million', ar: '20 مليون درهم إماراتي' },
    scope: {
      en: 'Construction of valve chambers, and installation and commissioning of 1,200mm chilled water pipe, for phase three of the Jumeirah Village Triangle district cooling project.',
      ar: 'إنشاء غرف الصمامات، وتركيب وتشغيل أنابيب مياه مبردة بقطر 1200 مم، للمرحلة الثالثة من مشروع التبريد المركزي لقرية جميرا المثلث.',
    },
  },
  {
    slug: 'dubai-beachfront-chilled-water-network',
    title: { en: 'Dubai Beachfront Chilled Water Network', ar: 'شبكة المياه المبردة لدبي بيتش فرونت' },
    location: { en: 'Dubai, UAE', ar: 'دبي، الإمارات العربية المتحدة' },
    category: { en: 'District Cooling', ar: 'التبريد المركزي' },
    description: {
      en: 'Supply, laying, testing, and commissioning of the chilled water network for Emaar\'s Dubai Beachfront development.',
      ar: 'توريد وتمديد واختبار وتشغيل شبكة المياه المبردة لمشروع دبي بيتش فرونت التابع لإعمار.',
    },
    image: '/images/site/utility-tunnel-corridor.jpg',
    gallery: [
      '/images/projects/chilled-water-flushing-works.jpg',
      '/images/projects/electrical-panel-works.jpg',
    ],
    client: 'Emaar',
    consultant: 'Allied Consultant Ltd',
    contractValue: { en: 'AED 18.39 Million', ar: '18.39 مليون درهم إماراتي' },
    scope: {
      en: 'Supply, laying, testing, and commissioning of the chilled water network serving the Dubai Beachfront development.',
      ar: 'توريد وتمديد واختبار وتشغيل شبكة المياه المبردة الخاصة بمشروع دبي بيتش فرونت.',
    },
  },
  {
    slug: 'dubai-multi-district-chilled-water-network',
    title: { en: 'DIAC, DLRC, DIFC & Tecom-A Chilled Water Network', ar: 'شبكة المياه المبردة لمدينة دبي الأكاديمية ومجمع دبي للاستثمار السكني ومركز دبي المالي العالمي وتيكوم-A' },
    location: { en: 'Dubai, UAE', ar: 'دبي، الإمارات العربية المتحدة' },
    category: { en: 'District Cooling', ar: 'التبريد المركزي' },
    description: {
      en: 'Chilled water network installation spanning five major Dubai developments — Dubai International Academic City, Dubai Land Residence Complex, DIFC, Dubai Science Park, and Tecom-A.',
      ar: 'تركيب شبكة مياه مبردة تمتد عبر خمس مناطق تطوير رئيسية في دبي — مدينة دبي الأكاديمية الدولية، ومجمع دبي للاستثمار السكني، ومركز دبي المالي العالمي، وحديقة دبي للعلوم، وتيكوم-A.',
    },
    image: '/images/projects/hse-safety-briefing-difc.jpg',
    gallery: [
      '/images/projects/weld-inspection-tecom.jpg',
      '/images/projects/tecom-mechanical-room.jpg',
      '/images/projects/difc-trial-pit-excavation.jpg',
    ],
    client: 'Empower',
    consultant: 'Khatib & Alami',
    contractValue: { en: 'AED 15 Million', ar: '15 مليون درهم إماراتي' },
    scope: {
      en: 'Supplying, laying, testing, and commissioning chilled water networks across Dubai International Academic City (DIAC), Dubai Land Residence Complex (DLRC), Dubai International Financial Centre (DIFC), Dubai Science Park (DSP), and Tecom-A.',
      ar: 'توريد وتمديد واختبار وتشغيل شبكات المياه المبردة في مدينة دبي الأكاديمية الدولية، ومجمع دبي للاستثمار السكني، ومركز دبي المالي العالمي، وحديقة دبي للعلوم، وتيكوم-A.',
    },
  },
  {
    slug: 'dragon-mart-district-cooling',
    title: { en: 'Dragon Mart District Cooling Project', ar: 'مشروع التبريد المركزي لدراغون مارت' },
    location: { en: 'Dubai, UAE', ar: 'دبي، الإمارات العربية المتحدة' },
    category: { en: 'District Cooling', ar: 'التبريد المركزي' },
    description: {
      en: 'Construction and upgrade of chilled water piping networks and the semi-permanent cooling plant serving Dragon Mart.',
      ar: 'إنشاء وتطوير شبكات أنابيب المياه المبردة ومحطة التبريد شبه الدائمة الخاصة بدراغون مارت.',
    },
    image: '/images/site/large-diameter-pipe-install.jpg',
    gallery: [
      '/images/projects/dragonmart-electrical-panel.jpg',
      '/images/projects/dragonmart-corridor-cabling.jpg',
    ],
    client: 'Empower',
    consultant: 'Empower',
    contractValue: { en: 'AED 14.6 Million', ar: '14.6 مليون درهم إماراتي' },
    scope: {
      en: 'Construction, completion, and defects-liability-period maintenance of the chilled water piping networks and upgrade of the existing semi-permanent cooling plant, including dismantling of the legacy air-cooled chiller and primary pumps.',
      ar: 'إنشاء وإتمام وصيانة شبكات أنابيب المياه المبردة خلال فترة ضمان العيوب، وتطوير محطة التبريد شبه الدائمة القائمة، بما في ذلك تفكيك المبرد الهوائي والمضخات الأساسية القديمة.',
    },
  },
  {
    slug: 'cleveland-clinic-abu-dhabi-steam-piping',
    title: { en: 'Cleveland Clinic Abu Dhabi — Steam Piping', ar: 'مستشفى كليفلاند كلينك أبوظبي — أعمال أنابيب البخار' },
    location: { en: 'Abu Dhabi, UAE', ar: 'أبوظبي، الإمارات العربية المتحدة' },
    category: { en: 'MEP Engineering', ar: 'الهندسة الكهروميكانيكية' },
    description: {
      en: 'Steam piping installation and commissioning, up to 900mm in diameter, for Cleveland Clinic Abu Dhabi.',
      ar: 'تركيب وتشغيل أنابيب البخار بأقطار تصل إلى 900 مم لمستشفى كليفلاند كلينك أبوظبي.',
    },
    image: '/images/site/pump-room-team.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
    ],
    client: 'Mubadala',
    consultant: 'AECOM / JACOBS',
    contractValue: { en: 'AED 5.2 Million', ar: '5.2 مليون درهم إماراتي' },
    scope: {
      en: 'Steam piping installation and commissioning works, up to 900mm in diameter, at Cleveland Clinic Abu Dhabi.',
      ar: 'أعمال تركيب وتشغيل أنابيب البخار بأقطار تصل إلى 900 مم في مستشفى كليفلاند كلينك أبوظبي.',
    },
  },
  {
    slug: 'al-shindagha-corridor-chilled-water',
    title: { en: 'Al Shindagha Corridor Chilled Water Network', ar: 'شبكة المياه المبردة لممر الشندغة' },
    location: { en: 'Dubai, UAE', ar: 'دبي، الإمارات العربية المتحدة' },
    category: { en: 'Infrastructure', ar: 'البنية التحتية' },
    description: {
      en: 'Chilled water network works for the Al Shindagha Corridor double-deck road improvement on Corniche Street, for the RTA.',
      ar: 'أعمال شبكة المياه المبردة لتحسين طريق شارع الكورنيش المزدوج الطوابق ضمن ممر الشندغة، لصالح هيئة الطرق والمواصلات.',
    },
    image: '/images/projects/rta-shindagha-valve-chamber.jpg',
    gallery: [
      '/images/projects/shindagha-valve-chamber-formwork.jpg',
      '/images/projects/shindagha-pipe-trench-shoring.jpg',
    ],
    client: 'RTA',
    consultant: 'Parsons',
    contractValue: { en: 'AED 4 Million', ar: '4 ملايين درهم إماراتي' },
    scope: {
      en: 'Supplying, laying, testing, and commissioning of chilled water network for the R1013/2D improvement of Al Shindagha Corridor Phase 2D, a double-deck road project on Corniche Street.',
      ar: 'توريد وتمديد واختبار وتشغيل شبكة المياه المبردة لمشروع تحسين ممر الشندغة المرحلة 2D، وهو مشروع طريق مزدوج الطوابق على شارع الكورنيش.',
    },
  },
  {
    slug: 'dubai-airport-terminal-c3-fresh-air-plant',
    title: { en: 'Dubai Airport Terminal C3 — Fresh Air Plant Room', ar: 'محطة هواء نقي بمطار دبي — المبنى C3' },
    location: { en: 'Dubai, UAE', ar: 'دبي، الإمارات العربية المتحدة' },
    category: { en: 'MEP Engineering', ar: 'الهندسة الكهروميكانيكية' },
    description: {
      en: 'Fresh air plant room installation works for Dubai Airport Terminal C3.',
      ar: 'أعمال تركيب غرفة محطة الهواء النقي لمبنى المطار C3 في دبي.',
    },
    image: '/images/site/tunnel-piping-run.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop',
    ],
    client: 'DAAC',
    consultant: 'DAR / ADPi',
    contractValue: { en: 'AED 800,000', ar: '800,000 درهم إماراتي' },
    scope: {
      en: 'Fresh air plant room installation works at Dubai Airport Terminal C3.',
      ar: 'أعمال تركيب غرفة محطة الهواء النقي في مبنى المطار C3 بدبي.',
    },
  },
  {
    slug: 'vantage-tower-damac-mep-works',
    title: { en: 'Vantage Tower — ETS Room & MEP Works', ar: 'برج فانتاج — أعمال غرفة ETS والكهروميكانيك' },
    location: { en: 'Dubai, UAE', ar: 'دبي، الإمارات العربية المتحدة' },
    category: { en: 'MEP Engineering', ar: 'الهندسة الكهروميكانيكية' },
    description: {
      en: 'ETS room installation and associated chilled water piping works for DAMAC\'s Vantage Tower.',
      ar: 'تركيب غرفة ETS وأعمال أنابيب المياه المبردة المرتبطة بها لبرج فانتاج التابع لداماك.',
    },
    image: '/images/site/rooftop-piping-install.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1644389355109-15b26f71c36b?q=80&w=1200&auto=format&fit=crop',
    ],
    client: 'DAMAC',
    consultant: 'Engineering Consortium',
    contractValue: { en: 'AED 150,000', ar: '150,000 درهم إماراتي' },
    scope: {
      en: 'ETS room installation and related chilled water piping works at Vantage Tower.',
      ar: 'تركيب غرفة ETS وأعمال أنابيب المياه المبردة ذات الصلة في برج فانتاج.',
    },
  },
  {
    slug: 'green-field-dubai-process-piping',
    title: { en: 'Process Piping — Green Field, Dubai', ar: 'أعمال أنابيب العمليات — جرين فيلد، دبي' },
    location: { en: 'Dubai, UAE', ar: 'دبي، الإمارات العربية المتحدة' },
    category: { en: 'MEP Engineering', ar: 'الهندسة الكهروميكانيكية' },
    description: {
      en: 'Fabrication and installation of industrial process piping, including insulated pipe runs, valve assemblies, and pressure vessels, at the Green Field facility in Dubai.',
      ar: 'تصنيع وتركيب أنابيب العمليات الصناعية، بما يشمل خطوط الأنابيب المعزولة، ومجموعات الصمامات، وأوعية الضغط، في منشأة جرين فيلد بدبي.',
    },
    image: '/images/projects/fabrication-piping-skid.jpg',
    gallery: [
      '/images/projects/green-field-piping-insulation.jpg',
      '/images/projects/green-field-storage-tank.jpg',
      '/images/projects/green-field-plant-piping.jpg',
    ],
    scope: {
      en: 'Fabrication, installation, and testing of industrial process piping systems — including insulated pipework, valve assemblies, and pressure vessels — for the Green Field facility.',
      ar: 'تصنيع وتركيب واختبار أنظمة أنابيب العمليات الصناعية — بما يشمل الأنابيب المعزولة، ومجموعات الصمامات، وأوعية الضغط — لمنشأة جرين فيلد.',
    },
  },
  {
    slug: 'saadiyat-chilled-water-flushing',
    title: { en: 'Chilled Water Flushing — Saadiyat Island', ar: 'غسيل المياه المبردة — جزيرة السعديات' },
    location: { en: 'Abu Dhabi, UAE', ar: 'أبوظبي، الإمارات العربية المتحدة' },
    category: { en: 'District Cooling', ar: 'التبريد المركزي' },
    description: {
      en: 'Rooftop chilled water flushing works for a development on Saadiyat Island, Abu Dhabi.',
      ar: 'أعمال غسيل المياه المبردة على سطح مبنى ضمن مشروع تطوير في جزيرة السعديات، أبوظبي.',
    },
    image: '/images/projects/chilled-water-flushing-works.jpg',
    gallery: [
      '/images/projects/saadiyat-flushing-equipment.jpg',
      '/images/projects/saadiyat-pump-skid.jpg',
      '/images/projects/saadiyat-chiller-units.jpg',
    ],
    scope: {
      en: 'Chilled water flushing and treatment works for rooftop plant equipment at a Saadiyat Island development.',
      ar: 'أعمال غسيل ومعالجة المياه المبردة لمعدات المحطة على سطح المبنى في مشروع بجزيرة السعديات.',
    },
  },
  {
    slug: 'chilled-water-pump-replacement-works',
    title: { en: 'Chilled Water Pump Replacement Works', ar: 'أعمال استبدال مضخات المياه المبردة' },
    location: { en: 'Dubai, UAE', ar: 'دبي، الإمارات العربية المتحدة' },
    category: { en: 'MEP Engineering', ar: 'الهندسة الكهروميكانيكية' },
    description: {
      en: 'Replacement of chilled water pumps and associated insulated piping within an existing plant room.',
      ar: 'استبدال مضخات المياه المبردة وأعمال الأنابيب المعزولة المرتبطة بها داخل غرفة محطة قائمة.',
    },
    image: '/images/projects/chilled-water-pump-replacement.jpg',
    gallery: [
      '/images/projects/pump-replacement-motor-install.jpg',
      '/images/projects/pump-replacement-ductwork.jpg',
      '/images/projects/pump-replacement-plant-room.jpg',
    ],
    scope: {
      en: 'Removal and replacement of chilled water pumps, motors, and associated insulated piping within an operational plant room, minimizing disruption to ongoing building operations.',
      ar: 'إزالة واستبدال مضخات المياه المبردة والمحركات وأعمال الأنابيب المعزولة المرتبطة بها داخل غرفة محطة تشغيلية، مع تقليل التأثير على عمليات المبنى الجارية.',
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
