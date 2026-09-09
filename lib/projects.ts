export interface Project {
  slug: string;
  title: string;
  location: string;
  category: string;
  description: string;
  image: string;
  gallery: string[];
  challenge: string;
  approach: string;
  results: string[];
}

export const projects: Project[] = [
  {
    slug: 'marina-business-bay-tower',
    title: 'Marina Business Bay Tower',
    location: 'Dubai, UAE',
    category: 'MEP Engineering',
    description:
      'Full mechanical, electrical, and plumbing fit-out for a 42-storey mixed-use tower, coordinated across a compressed 18-month construction schedule.',
    image: 'https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop',
    ],
    challenge:
      'A 42-storey mixed-use tower with residential, retail, and office floors each carrying different MEP load profiles, on a schedule compressed to 18 months by the developer\'s handover commitments.',
    approach:
      'We ran MEP coordination in parallel with the structural program rather than sequentially, resolving clashes floor-by-floor through BIM before any first-fix work began, and staged commissioning by zone so occupied floors could hand over while upper floors were still in fit-out.',
    results: [
      'Full MEP fit-out delivered inside the 18-month window',
      'Zero rework from late-stage service clashes',
      'Phased handover let the developer open retail floors ahead of full tower completion',
    ],
  },
  {
    slug: 'jebel-ali-water-treatment-expansion',
    title: 'Jebel Ali Water Treatment Expansion',
    location: 'Dubai, UAE',
    category: 'Water Treatment',
    description:
      'Capacity expansion of a regional water treatment facility, including new clarifier basins and an upgraded filtration line.',
    image: 'https://images.unsplash.com/photo-1644389355109-15b26f71c36b?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1548611716-3922abcae1c8?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1200&auto=format&fit=crop',
    ],
    challenge:
      'Expanding treatment capacity at a live facility that could not go offline, with new clarifier basins and a filtration line upgrade needing to tie into an active process stream.',
    approach:
      'Work was sequenced around the plant\'s own operating schedule, building and pressure-testing new basins in isolation before a series of short, planned tie-in windows rather than one extended shutdown.',
    results: [
      'Zero unplanned downtime for the existing treatment line',
      'Expanded clarifier capacity commissioned in staged tie-ins',
      'Upgraded filtration line handed over with full process documentation',
    ],
  },
  {
    slug: 'riyadh-industrial-energy-plant',
    title: 'Riyadh Industrial Energy Plant',
    location: 'Riyadh, KSA',
    category: 'Energy Solutions',
    description:
      'Electro-mechanical works for an industrial power facility, from switchgear installation through to commissioning and handover.',
    image: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
    ],
    challenge:
      'High-voltage switchgear installation and cabling for an industrial power facility, where sequencing errors during energization carry real safety and equipment-damage risk.',
    approach:
      'A dedicated HSE lead sat on the switchgear crew for the full duration of installation, with every energization step signed off against a documented test procedure before proceeding to the next.',
    results: [
      'Switchgear installation and commissioning completed with zero lost-time incidents',
      'Full test and commissioning documentation handed over for the plant\'s O&M records',
      'Facility energized on schedule for client handover',
    ],
  },
  {
    slug: 'king-abdullah-logistics-hub',
    title: 'King Abdullah Logistics Hub',
    location: 'Jeddah, KSA',
    category: 'Infrastructure',
    description:
      'Site-wide utilities and infrastructure works for a large-scale logistics and distribution hub serving the western region.',
    image: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
    ],
    challenge:
      'Site-wide utilities — power distribution, water, and drainage — for a large logistics hub spread across multiple warehouse blocks being built in parallel by different contractors.',
    approach:
      'We took on utilities coordination across the whole site rather than block-by-block, giving each parallel contractor a single point of contact for tie-in scheduling and avoiding the clashes that come from independently-scheduled trenching and routing.',
    results: [
      'Site-wide utilities delivered across multiple concurrent building contracts',
      'No utility-related delays reported by any of the parallel building contractors',
      'Infrastructure sized with headroom for the hub\'s planned future expansion phases',
    ],
  },
  {
    slug: 'abu-dhabi-corporate-campus',
    title: 'Abu Dhabi Corporate Campus',
    location: 'Abu Dhabi, UAE',
    category: 'Civil Works',
    description:
      'Structural and civil works for a low-rise corporate campus, delivered to exacting quality and HSE standards from foundation to finishing.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop',
    ],
    challenge:
      'A low-rise corporate campus where the client\'s architectural finish tolerances were significantly tighter than typical commercial standards, spanning several connected structures.',
    approach:
      'We ran an independent quality inspection pass at every structural milestone, ahead of the client\'s own inspections, catching finish and tolerance issues early enough to correct without impacting the schedule.',
    results: [
      'Structural and civil works delivered to the client\'s tightened finish tolerances',
      'No major inspection failures at any project milestone',
      'Campus handed over on the agreed schedule',
    ],
  },
  {
    slug: 'sharjah-chemical-processing-facility',
    title: 'Sharjah Chemical Processing Facility',
    location: 'Sharjah, UAE',
    category: 'Chemical Facilities',
    description:
      'Specialized construction and MEP integration for a chemical processing plant, built to strict process-safety requirements.',
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1200&auto=format&fit=crop',
    ],
    challenge:
      'MEP integration for a chemical processing plant where hazardous-area classification governed nearly every electrical and mechanical routing decision on site.',
    approach:
      'Our design coordination team worked from the process-safety documentation from day one rather than treating it as a late-stage compliance check, so hazardous-area boundaries shaped the MEP routing plan instead of forcing rework against it.',
    results: [
      'MEP works delivered fully compliant with the facility\'s process-safety classification',
      'No hazardous-area routing conflicts identified during third-party inspection',
      'Plant commissioned and handed over to the client\'s operations team on schedule',
    ],
  },
  {
    slug: 'dubai-south-aviation-support-facility',
    title: 'Dubai South Aviation Support Facility',
    location: 'Dubai, UAE',
    category: 'Infrastructure',
    description:
      'Civil and MEP works for an aviation logistics support facility, coordinated tightly with airside safety and access restrictions.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590496793929-36417d3117de?q=80&w=1200&auto=format&fit=crop',
    ],
    challenge:
      'Civil and MEP works adjacent to active airside operations, where every site access and crane lift had to be scheduled around aviation safety restrictions rather than construction convenience.',
    approach:
      'Site logistics were planned jointly with the facility\'s aviation safety team before construction started, building an access and lift schedule around their approved windows instead of requesting exceptions as issues came up.',
    results: [
      'Zero airside safety incidents or access violations across the build',
      'Construction access windows maintained without disrupting adjacent operations',
      'Facility delivered ready for aviation logistics handover',
    ],
  },
  {
    slug: 'neom-regional-substation',
    title: 'NEOM Regional Substation',
    location: 'Riyadh, KSA',
    category: 'Energy Solutions',
    description:
      'Electro-mechanical build-out of a regional power substation supporting renewable energy integration for the surrounding grid.',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
    ],
    challenge:
      'A regional substation build-out needing to support variable load from renewable generation sources feeding into the grid, rather than the steady load profile of a conventional plant.',
    approach:
      'Switchgear and protection systems were specified and installed to the grid operator\'s renewable-integration standard from the outset, with commissioning tests run against variable-load scenarios rather than a single fixed-load test.',
    results: [
      'Substation commissioned to the grid operator\'s renewable-integration standard',
      'Protection systems validated across variable-load test scenarios',
      'Handed over ready to support the surrounding grid\'s renewable capacity',
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
