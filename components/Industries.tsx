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
    <section className="bg-white py-24 w-full">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 bg-[#94a3b8]" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-gray-800">SECTORS</span>
          </div>
          <h2 className="text-5xl md:text-7xl text-[#111] font-normal tracking-tight mb-6">
            Serving Critical Sectors
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl leading-relaxed">
            Island Tower provides specialized engineering, construction, and MEP services across a wide range of challenging industries and sectors throughout the region.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {industries.map((item, idx) => (
            <div 
              key={idx} 
              className="relative aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent opacity-80" />
              <h3 className="absolute top-6 left-6 right-6 text-white text-2xl md:text-xl lg:text-2xl font-medium leading-snug">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
