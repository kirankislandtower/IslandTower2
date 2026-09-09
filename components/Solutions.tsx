'use client';

import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Solutions() {
  const t = useTranslations('Solutions');
  const solutions = [
    { num: '01', title: t('s1'), image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=500' },
    { num: '02', title: t('s2'), image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=500' },
    { num: '03', title: t('s3'), image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=500' },
    { num: '04', title: t('s4'), image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=500' },
    { num: '05', title: t('s5'), image: 'https://images.unsplash.com/photo-1644389355109-15b26f71c36b?q=80&w=500' },
    { num: '06', title: t('s6'), image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=500' },
    { num: '07', title: t('s7'), image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=500' },
  ];

  return (
    <section className="bg-card py-32 w-full" id="expertise">
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
            <h2 className="text-6xl md:text-7xl text-foreground font-normal tracking-tight mb-6 flex items-start">
              {t('heading')}
              <sup className="text-2xl md:text-3xl mt-4 ms-1 font-light text-muted-foreground">7</sup>
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
                <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-48 h-64 md:w-56 md:h-72 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-2xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
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
