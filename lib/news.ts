export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
}

export const articles: Article[] = [
  {
    slug: 'mep-coordination-before-structural-freeze',
    title: 'Why MEP Coordination Should Start Before the Structural Design Freezes',
    excerpt:
      'Waiting for structural drawings to lock before starting MEP coordination is the single biggest source of late-stage clashes on tower projects.',
    category: 'MEP Engineering',
    date: '2026-08-12',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1600&auto=format&fit=crop',
    content: [
      'On most mixed-use tower projects, MEP coordination is treated as a downstream activity — something that starts once structural drawings are issued for construction. By that point, riser locations, slab penetrations, and ceiling voids are effectively fixed, and every MEP clash becomes a negotiation over an already-poured structure.',
      'The alternative is to bring MEP coordination into the same design room as structural engineering while both are still in schematic development. This does not mean MEP drawings need to be complete — it means the major service runs, riser sizing, and plant room locations get reviewed against the structural grid before either discipline locks its own assumptions.',
      'In practice, this shifts a meaningful share of coordination effort earlier in the program, when changes are cheap, instead of during construction, when changes mean rework. It also gives the MEP contractor a real say in decisions — like riser shaft sizing or transfer floor locations — that are difficult or impossible to revisit once structural work is underway.',
      'The tradeoff is that it asks more of the design team early on: structural and MEP engineers need to be in the same conversations well before either discipline is ready to finalize. For projects on compressed schedules, that upfront coordination cost is consistently smaller than the cost of resolving clashes after first-fix work has started.',
    ],
  },
  {
    slug: 'hse-protocols-that-reduce-incidents',
    title: 'HSE Protocols That Actually Reduce Lost-Time Incidents',
    excerpt:
      'Most safety programs look similar on paper. The ones that actually move incident rates share a few specific, unglamorous habits.',
    category: 'Safety & HSE',
    date: '2026-07-28',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop',
    content: [
      'Every EPC contractor publishes a safety policy, and most of them look nearly identical: PPE requirements, toolbox talks, incident reporting procedures. The documents rarely explain what actually separates a site with a strong safety record from one that struggles with recurring near-misses.',
      'The practical difference usually comes down to a small number of specific habits. The first is closing the loop on near-misses, not just incidents — a site that treats a near-miss report as seriously as an actual injury catches the pattern before someone gets hurt. The second is giving site supervisors real authority to stop work without needing sign-off from someone off-site, which sounds obvious but is inconsistently applied in practice.',
      'The third, and probably the most overlooked, is scheduling. A disproportionate share of site incidents cluster around schedule-compression periods — the last two weeks before a milestone, or the days right after a delay when everyone is trying to catch up. Safety programs that build explicit schedule buffer around known-risky phases, rather than treating safety and schedule as separate conversations, consistently show better outcomes than programs that rely purely on training and signage.',
      'None of this is complicated. It is also not free — stopping work costs time, and buffer costs schedule contingency. The sites that hold to it anyway are the ones with the numbers to show for it at handover.',
    ],
  },
  {
    slug: 'selecting-an-epc-contractor-in-the-uae',
    title: 'What to Look for When Selecting an EPC Contractor in the UAE',
    excerpt:
      'Beyond price and past project photos, a handful of specific questions reveal whether a contractor can actually deliver on a complex scope.',
    category: 'Industry Insight',
    date: '2026-07-05',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1600&auto=format&fit=crop',
    content: [
      'Most EPC contractor shortlists are built around the same three inputs: price, a portfolio of past projects, and a handful of client references. All three matter, but none of them answer the question that actually predicts project outcomes — how the contractor handles the inevitable moment when the schedule, the scope, and the site conditions stop agreeing with each other.',
      'A more useful set of questions goes further. Who on the contractor\'s team has direct authority to make a call when a design clash is discovered on site — and how long does that decision typically take? What does their subcontractor management actually look like on a live project, not on paper? How do they handle a client-driven scope change six weeks before a milestone, and what does that do to the rest of the schedule?',
      'It is also worth asking about safety record in a specific way — not just a total incident number, but how incidents and near-misses get reported and what changes as a result. A contractor with a small number of well-documented near-misses that led to real changes in site procedure is often a safer bet than one reporting zero incidents with no visible process behind that number.',
      'Finally, ask what happens when things go well. A contractor that can walk through a project where the original plan changed significantly, and explain specifically how they adapted without losing the schedule or the budget, has usually demonstrated more real capability than one whose case studies all describe projects that went exactly to plan.',
    ],
  },
  {
    slug: 'water-treatment-capacity-planning',
    title: 'Water Treatment Capacity Planning for Growing Facilities',
    excerpt:
      'Expanding treatment capacity at a live facility comes with constraints that new-build projects never have to think about.',
    category: 'Water Treatment',
    date: '2026-06-18',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1644389355109-15b26f71c36b?q=80&w=1600&auto=format&fit=crop',
    content: [
      'A new-build water treatment facility gets to design its process train from a blank site. A capacity expansion at an existing, operating facility does not have that luxury — every new clarifier basin, filtration line, or pump station has to tie into a process that cannot go offline for the length of a typical construction program.',
      'The planning challenge is less about the treatment technology itself and more about sequencing. New infrastructure needs to be built and pressure-tested in isolation from the live process, with tie-in work compressed into short, carefully scheduled windows rather than one extended shutdown. That means the construction program has to be built around the facility\'s own operating constraints, not the other way around.',
      'It also changes how much slack a project can realistically build in. A delay on a new-build site usually costs schedule and money. A delay on a live-facility expansion can mean re-planning an entire tie-in window around the facility\'s operating calendar, which might not have another opening for weeks.',
      'Facilities planning a capacity expansion get the most value out of engaging their EPC partner during the feasibility stage, before tie-in points are fixed on paper — the same way structural and MEP coordination benefits from an earlier conversation, sequencing around a live process benefits from being part of the design from the start, not bolted on afterward.',
    ],
  },
  {
    slug: 'phased-commissioning-mixed-use-towers',
    title: 'The Case for Phased Commissioning on Mixed-Use Towers',
    excerpt:
      'Commissioning a tower floor by floor, rather than all at once, changes what a compressed handover schedule actually looks like.',
    category: 'MEP Engineering',
    date: '2026-05-22',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?q=80&w=1600&auto=format&fit=crop',
    content: [
      'The default assumption on most tower projects is that commissioning happens once, at the end, across the whole building. That assumption holds up fine on a generous schedule. It breaks down fast on a compressed one, where the developer needs to open retail or lower floors well before upper floors are anywhere near ready.',
      'Phased, zone-by-zone commissioning is the practical alternative — testing and handing over MEP systems floor by floor or zone by zone as each section is complete, rather than waiting for the entire building to finish. It requires the systems to be designed with that kind of independence in mind from early on, since shared risers and central plant can make true zone isolation difficult to retrofit late in a project.',
      'The payoff is real: a developer can start generating revenue from completed floors while upper floors are still in fit-out, instead of the whole building sitting idle until the last piece of commissioning is signed off. The cost is added coordination complexity — commissioning teams need clear zone boundaries, and central plant capacity needs to be planned around partial occupancy loads, not just the building\'s final full-occupancy demand.',
      'For projects with firm, staged handover commitments, that added complexity is usually worth it. For projects with a single, all-at-once handover date, it is often unnecessary overhead. The decision comes down to how much the schedule actually depends on early partial occupancy — which is worth settling well before the MEP design is finalized, not after.',
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
