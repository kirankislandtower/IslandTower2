'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Solutions() {
  const t = useTranslations('Solutions');
  const solutions = [
    { num: '01', title: t('s1'), image: '/images/projects/pump-replacement-ductwork.jpg' },
    { num: '02', title: t('s2'), image: '/images/projects/pump-replacement-motor-install.jpg' },
    { num: '03', title: t('s3'), image: '/images/projects/pump-replacement-plant-room.jpg' },
    { num: '04', title: t('s4'), image: '/images/projects/saadiyat-pump-skid.jpg' },
    { num: '05', title: t('s5'), image: '/images/projects/difc-trial-pit-excavation.jpg' },
    { num: '06', title: t('s6'), image: '/images/site/fire-piping-plant-room.jpg' },
    { num: '07', title: t('s7'), image: '/images/site/excavation-team-trench.jpg' },
  ];

  return (
    <section className="bg-card py-24 md:py-32 w-full" id="expertise">
      <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-12 gap-12">

        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="md:col-span-4 flex flex-col items-start relative"
        >
          <div className="md:sticky md:top-32 w-full">
            <h2 className="text-4xl sm:text-5xl md:text-7xl text-foreground font-normal tracking-tight mb-6 flex items-start">
              {t('heading')}
              <sup className="text-lg sm:text-xl md:text-3xl mt-2 sm:mt-4 ms-1 font-light text-muted-foreground">7</sup>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed max-w-sm">
              {t('description')}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-block bg-accent text-on-accent font-mono uppercase tracking-widest text-sm px-6 py-4 hover:bg-accent/90 transition-colors cursor-pointer focus-ring"
              >
                {t('viewAllProjects')}
              </Link>
              <Link
                href="/services"
                className="inline-block border border-border text-foreground font-mono uppercase tracking-widest text-sm px-6 py-4 hover:border-accent hover:text-accent transition-colors cursor-pointer focus-ring"
              >
                {t('allServices')}
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Right Column */}
        <div className="md:col-span-8 mt-12 md:mt-0">
          <div className="flex flex-col border-t border-border">
            {solutions.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.4, delay: idx * 0.04, ease: "easeOut" }}
                className="group relative flex items-center py-8 md:py-10 border-b border-border hover:border-accent transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-8 md:gap-16 text-foreground group-hover:text-accent transition-colors">
                  <span className="font-mono text-sm md:text-base tracking-widest">{item.num}</span>
                  <span className="font-mono text-lg md:text-2xl tracking-widest uppercase">{item.title}</span>
                </div>

                {/* Hover Image */}
                <div className="absolute end-0 top-1/2 -translate-y-1/2 z-10 w-48 h-64 md:w-56 md:h-72 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-2xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="224px"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
