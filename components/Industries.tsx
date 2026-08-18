'use client';

import { motion } from 'framer-motion';

export default function Industries() {
  const industries = [
    { title: 'Infrastructure', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=600&auto=format&fit=crop' },
    { title: 'Energy & Power', image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=600&auto=format&fit=crop' },
    { title: 'Water Treatment', image: 'https://images.unsplash.com/photo-1644389355109-15b26f71c36b?q=80&w=600&auto=format&fit=crop' },
    { title: 'Commercial', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop' },
    { title: 'Residential', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop' },
    { title: 'Industrial', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=600&auto=format&fit=crop' },
    { title: 'Aviation', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop' },
    { title: 'Oil & Gas', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop' },
  ];

  return (
    <section className="bg-background py-24 w-full">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-2 h-2 bg-accent" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">SECTORS</span>
          </motion.div>

          <div className="overflow-hidden mb-6">
            <motion.h2
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
              className="text-5xl md:text-7xl text-foreground font-normal tracking-tight"
            >
              Serving Critical Sectors
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed"
          >
            Island Tower provides specialized engineering, construction, and MEP services across a wide range of challenging industries and sectors throughout the region.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {industries.map((item, idx) => {
            const row = Math.floor(idx / 4);
            const col = idx % 4;
            const delay = (row + col) * 0.09;

            return (
              <motion.div
                key={idx}
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay, ease: [0.65, 0, 0.35, 1] }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer"
              >
                <motion.img
                  src={item.image}
                  alt={item.title}
                  initial={{ scale: 1.25 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.9, delay, ease: [0.65, 0, 0.35, 1] }}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent opacity-80" />

                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: delay + 0.5 }}
                  className="absolute top-6 right-6 font-mono text-white/60 text-xs tracking-widest"
                >
                  0{idx + 1}
                </motion.span>

                <h3 className="absolute top-6 left-6 right-6 text-white text-2xl md:text-xl lg:text-2xl font-medium leading-snug">
                  {item.title}
                </h3>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
