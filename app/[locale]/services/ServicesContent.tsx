'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import { useParallax } from '@/hooks/useParallax';
import { projects as allProjects, localizeProject, type Locale } from '@/lib/projects';

const RELATED_SLUGS = [
  'jumeirah-village-triangle-district-cooling-phase-3',
  'saadiyat-chilled-water-flushing',
  'al-shindagha-corridor-chilled-water',
];

function ServiceCard({ service, idx }: { service: { num: string; title: string; description: string; image: string }; idx: number }) {
  const { ref: parallaxRef, y: parallaxY } = useParallax(20);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.5, delay: (idx % 3) * 0.08, ease: 'easeOut' }}
      className="group relative flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/40 transition-colors"
    >
      <div ref={parallaxRef} className="relative aspect-[16/10] overflow-hidden">
        <motion.div
          style={{ y: parallaxY, scale: 1.15 }}
          className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-[1.22]"
        >
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute top-4 start-4 font-mono text-white text-xs tracking-widest">{service.num}</span>
      </div>
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <h3 className="text-xl md:text-2xl text-foreground font-medium tracking-tight mb-3">{service.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
      </div>
    </motion.div>
  );
}

export default function ServicesContent() {
  const t = useTranslations('ServicesPage');
  const [showDemoModal, setShowDemoModal] = useState(false);

  const locale = useLocale() as Locale;

  const districtCooling = [
    { num: '01', title: t('s1Title'), description: t('s1Desc'), image: '/images/projects/jvt-tank-installation.jpg' },
    { num: '02', title: t('dc2Title'), description: t('dc2Desc'), image: '/images/projects/saadiyat-flushing-equipment.jpg' },
    { num: '03', title: t('dc3Title'), description: t('dc3Desc'), image: '/images/projects/tecom-mechanical-room.jpg' },
    { num: '04', title: t('dc4Title'), description: t('dc4Desc'), image: '/images/projects/shindagha-valve-chamber-formwork.jpg' },
    { num: '05', title: t('dc5Title'), description: t('dc5Desc'), image: '/images/site/rooftop-cooling-equipment.jpg' },
    { num: '06', title: t('dc6Title'), description: t('dc6Desc'), image: '/images/projects/weld-inspection-tecom.jpg' },
  ];

  const mep = [
    { num: '01', title: t('s3Title'), description: t('s3Desc'), image: '/images/projects/chilled-water-pump-replacement.jpg' },
    { num: '02', title: t('s2Title'), description: t('s2Desc'), image: '/images/projects/electrical-panel-works.jpg' },
    { num: '03', title: t('s7Title'), description: t('s7Desc'), image: '/images/projects/dragonmart-corridor-cabling.jpg' },
    { num: '04', title: t('s5Title'), description: t('s5Desc'), image: '/images/projects/fabrication-piping-skid.jpg' },
    { num: '05', title: t('s4Title'), description: t('s4Desc'), image: '/images/projects/green-field-storage-tank.jpg' },
    { num: '06', title: t('s6Title'), description: t('s6Desc'), image: '/images/site/mep-corridor-interior.jpg' },
  ];

  const equipment = [
    { value: '1,600', unit: 'm³/hr', label: t('equip1') },
    { value: '450', unit: 'mm', label: t('equip2') },
    { value: '1,400', unit: 'mm', label: t('equip3') },
  ];

  const related = RELATED_SLUGS.map((slug) => allProjects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((p) => localizeProject(p, locale));

  const groupHeading = (num: string, eyebrow: string, headline: string, description: string, light = false) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '0px 0px -100px 0px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mb-14 max-w-3xl"
    >
      <span className={`font-mono text-xs tracking-[0.2em] uppercase ${light ? 'text-white/60' : 'text-accent'}`}>{num} · {eyebrow}</span>
      <h2 className={`text-3xl md:text-5xl font-normal tracking-tight leading-[1.1] mt-4 ${light ? 'text-white' : 'text-foreground'}`}>{headline}</h2>
      <p className={`text-base md:text-lg leading-relaxed mt-5 ${light ? 'text-white/70' : 'text-muted-foreground'}`}>{description}</p>
    </motion.div>
  );

  return (
    <>
      <Header onDemoClick={() => setShowDemoModal(true)} />

      {/* Hero */}
      <section className="relative min-h-[70vh] w-full flex flex-col justify-center overflow-hidden bg-[#111]">
        <Image
          src="/images/site/steel-structure-piping.jpg"
          alt="MEP engineering works on site"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111]/80 via-[#111]/50 to-[#111]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          className="relative z-10 w-full px-6 md:px-10 mt-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/70">{t('eyebrow')}</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-normal tracking-tight leading-[1.05] max-w-4xl">
            {t('title')}
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed mt-6">
            {t('subtitle')}
          </p>
        </motion.div>
      </section>

      {/* Group 1: District cooling */}
      <section id="district-cooling" className="bg-background py-24 md:py-32 w-full scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-6">
          {groupHeading('01', t('dcEyebrow'), t('dcHeadline'), t('dcDescription'))}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {districtCooling.map((service, idx) => (
              <ServiceCard key={service.title} service={service} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Group 2: MEP building services */}
      <section id="mep" className="bg-card py-24 md:py-32 w-full scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-6">
          {groupHeading('02', t('mepEyebrow'), t('mepHeadline'), t('mepDescription'))}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {mep.map((service, idx) => (
              <ServiceCard key={service.title} service={service} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="bg-[#1c1f24] py-24 md:py-32 w-full">
        <div className="max-w-[1400px] mx-auto px-6">
          {groupHeading('03', t('equipEyebrow'), t('equipHeadline'), t('equipDescription'), true)}
          <div className="grid md:grid-cols-3 border-t border-white/15">
            {equipment.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '0px 0px -60px 0px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
                className="pt-8 pe-6 pb-2"
              >
                <div className="text-white text-5xl md:text-6xl font-medium tracking-tight" dir="ltr">
                  {item.value}<span className="text-xl md:text-2xl ms-1 text-white/70">{item.unit}</span>
                </div>
                <div className="text-white/65 text-sm mt-3">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related projects */}
      <section className="bg-background py-24 md:py-32 w-full">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <h2 className="text-3xl md:text-5xl text-foreground font-normal tracking-tight leading-[1.1]">{t('relatedHeadline')}</h2>
            <Link href="/projects" className="w-fit border border-border text-foreground font-mono uppercase tracking-widest text-sm px-6 py-4 hover:border-accent hover:text-accent transition-colors focus-ring">
              {t('allProjects')}
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="group block focus-ring rounded-2xl">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5">
                  <Image src={project.image} alt={project.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-accent">{project.category}</span>
                <h3 className="text-xl text-foreground font-normal tracking-tight mt-2 group-hover:text-accent transition-colors">{project.title}</h3>
                <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mt-2">{project.location}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer onDemoClick={() => setShowDemoModal(true)} />
      <QuoteModal open={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </>
  );
}
