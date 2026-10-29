'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import MilestoneCarousel from '@/components/MilestoneCarousel';
import CapabilitiesCarousel from '@/components/CapabilitiesCarousel';
import { useParallax } from '@/hooks/useParallax';

const FOUNDED_YEAR = 2003;

export default function AboutContent() {
  const t = useTranslations('AboutPage');
  const [showDemoModal, setShowDemoModal] = useState(false);
  const { ref: storyImgRef, y: storyImgY } = useParallax(28);
  const yearsInOperation = new Date().getFullYear() - FOUNDED_YEAR;

  const stats = [
    { value: `${yearsInOperation}+`, label: t('stat1') },
    { value: '200+', label: t('stat2') },
    { value: '2', label: t('stat3') },
    { value: 'ISO 9001 · 14001 · 45001', label: t('stat4') },
  ];

  const values = [
    { title: t('value1Title'), description: t('value1Desc') },
    { title: t('value2Title'), description: t('value2Desc') },
    { title: t('value3Title'), description: t('value3Desc') },
    { title: t('value4Title'), description: t('value4Desc') },
    { title: t('value5Title'), description: t('value5Desc') },
    { title: t('value6Title'), description: t('value6Desc') },
  ];

  const milestones = [
    { year: t('milestone1Year'), label: t('milestone1Label'), text: t('milestone1Text'), image: '/images/site/excavation-team-trench.jpg' },
    { year: t('milestone2Year'), label: t('milestone2Label'), text: t('milestone2Text'), image: '/images/projects/chilled-water-flushing-works.jpg' },
    { year: t('milestone3Year'), label: t('milestone3Label'), text: t('milestone3Text'), image: '/images/projects/fabrication-piping-skid.jpg' },
    { year: t('milestone4Year'), label: t('milestone4Label'), text: t('milestone4Text'), image: '/images/projects/jvt-tank-installation.jpg' },
    { year: t('milestone5Year'), label: t('milestone5Label'), text: t('milestone5Text'), image: '/images/site/large-diameter-pipe-install.jpg' },
    { year: t('milestone6Year'), label: t('milestone6Label'), text: t('milestone6Text'), image: '/images/projects/hse-safety-briefing-difc.jpg' },
  ];

  const approvals = [
    { kind: t('approvalAuthority'), code: t('rtaCode'), desc: t('rtaDesc') },
    { kind: 'ISO', code: '9001:2015', desc: t('iso9001Desc') },
    { kind: 'ISO', code: '14001:2015', desc: t('iso14001Desc') },
    { kind: 'ISO', code: '45001:2018', desc: t('iso45001Desc') },
  ];

  const pillars = [
    { id: 'quality-system', title: t('qualityTitle'), description: t('qualityDesc') },
    { id: 'hse', title: t('hseTitle'), description: t('hseDesc') },
    { id: 'sustainability', title: t('sustainabilityTitle'), description: t('sustainabilityDesc') },
    { id: 'technology', title: t('technologyTitle'), description: t('technologyDesc') },
  ];

  const capabilities = [
    { title: t('capability1Title'), description: t('capability1Desc'), image: '/images/site/pump-room-team.jpg' },
    { title: t('capability2Title'), description: t('capability2Desc'), image: '/images/projects/tecom-mechanical-room.jpg' },
    { title: t('capability3Title'), description: t('capability3Desc'), image: '/images/site/excavation-team-trench.jpg' },
    { title: t('capability4Title'), description: t('capability4Desc'), image: '/images/projects/jvt-tank-installation.jpg' },
  ];

  return (
    <>
      <Header onDemoClick={() => setShowDemoModal(true)} />

      {/* Hero */}
      <section className="relative min-h-[85vh] w-full flex flex-col justify-center overflow-hidden bg-[#111]">
        <Image
          src="/images/site/rooftop-piping-install.jpg"
          alt="City skyline"
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

      {/* Our Story */}
      <section className="bg-card py-24 md:py-32 w-full">
        <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-accent" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{t('storyEyebrow')}</span>
            </div>
            <h2 className="text-3xl md:text-5xl text-foreground font-normal tracking-tight leading-[1.1] mb-6">
              {t('storyHeadline')}
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-4">
              {t('storyP1')}
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              {t('storyP2')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            ref={storyImgRef}
            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-muted"
          >
            <motion.div style={{ y: storyImgY, scale: 1.15 }} className="absolute inset-0 w-full h-full">
              <Image
                src="/images/site/excavation-team-trench.jpg"
                alt="Island Tower site team"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Leadership / Vision / Mission */}
      <section className="bg-background py-24 md:py-32 w-full">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-2 h-2 bg-accent" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{t('leadershipEyebrow')}</span>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: '0px 0px -100px 0px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="bg-card border border-border rounded-2xl p-8 md:p-10 flex flex-col"
            >
              <div className="flex items-center gap-5 mb-6">
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shrink-0">
                  <Image
                    src="/images/team/sasikumar-chairman.png"
                    alt={t('chairmanName')}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-foreground font-medium">{t('chairmanName')}</div>
                  <div className="font-mono text-xs tracking-widest uppercase text-muted-foreground mt-1">{t('chairmanTitle')}</div>
                </div>
              </div>

              <p className="text-2xl md:text-3xl text-foreground font-normal tracking-tight mb-6">{t('chairmanMotto')}</p>
              <div className="text-accent text-5xl font-serif leading-none mb-6">
                &ldquo;
              </div>
              <p className="text-foreground text-base leading-relaxed mb-6">{t('chairmanQuote')}</p>
              <p className="text-muted-foreground text-sm leading-relaxed mt-auto pt-6 border-t border-border">{t('chairmanBio')}</p>
            </motion.div>

            <div className="flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: '0px 0px -100px 0px' }}
                transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                whileHover={{ y: -4 }}
                className="bg-card border border-border rounded-2xl p-8 flex-1 transition-shadow hover:shadow-lg"
              >
                <h3 className="font-mono text-xs tracking-widest uppercase text-accent mb-3">{t('visionTitle')}</h3>
                <p className="text-foreground text-base leading-relaxed">{t('visionText')}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: '0px 0px -100px 0px' }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                whileHover={{ y: -4 }}
                className="bg-card border border-border rounded-2xl p-8 flex-1 transition-shadow hover:shadow-lg"
              >
                <h3 className="font-mono text-xs tracking-widest uppercase text-accent mb-3">{t('missionTitle')}</h3>
                <p className="text-foreground text-base leading-relaxed">{t('missionText')}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-background py-24 md:py-32 w-full">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center text-center mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-accent" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{t('timelineEyebrow')}</span>
            </div>
            <h2 className="text-3xl md:text-5xl text-foreground font-normal tracking-tight max-w-3xl">
              {t('timelineHeadline')}
            </h2>
          </motion.div>

          <MilestoneCarousel milestones={milestones} />
        </div>
      </section>

      {/* Approvals & Quality */}
      <section id="quality" className="bg-[#1c1f24] py-24 md:py-32 w-full scroll-mt-28">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-accent" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/60">{t('approvalsEyebrow')}</span>
            </div>
            <h2 className="text-3xl md:text-5xl text-white font-normal tracking-tight leading-[1.1] max-w-3xl">
              {t('approvalsHeadline')}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {approvals.map((item, idx) => (
              <motion.div
                key={item.code}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '0px 0px -60px 0px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
                className="border border-white/15 rounded-2xl p-7"
              >
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent mb-4">{item.kind}</div>
                <div className="text-white text-2xl font-medium tracking-tight" dir="ltr">{item.code}</div>
                <p className="text-white/65 text-sm leading-relaxed mt-3">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mt-6">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.id}
                id={pillar.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '0px 0px -60px 0px' }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: 'easeOut' }}
                className="scroll-mt-32 bg-white/[0.04] rounded-2xl p-7"
              >
                <h3 className="font-mono text-sm tracking-widest uppercase text-white mb-3">{pillar.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-card py-24 md:py-32 w-full">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center text-center mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-accent" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{t('capabilitiesEyebrow')}</span>
            </div>
            <h2 className="text-3xl md:text-5xl text-foreground font-normal tracking-tight max-w-3xl">
              {t('capabilitiesHeadline')}
            </h2>
          </motion.div>

          <CapabilitiesCarousel capabilities={capabilities} />
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-background py-24 md:py-32 w-full">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-center text-center mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-accent" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{t('valuesEyebrow')}</span>
            </div>
            <h2 className="text-4xl md:text-6xl text-foreground font-normal tracking-tight">
              {t('valuesHeadline')}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '0px 0px -60px 0px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <div className="font-mono text-xs text-accent mb-4">0{idx + 1}</div>
                <h3 className="text-lg text-foreground font-medium mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-background py-20 w-full border-y border-border">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
              className="text-center md:text-start"
            >
              <div className="font-mono text-4xl md:text-5xl text-accent font-light mb-2">{stat.value}</div>
              <div className="font-mono text-xs tracking-widest uppercase text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer onDemoClick={() => setShowDemoModal(true)} />
      <QuoteModal open={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </>
  );
}
