export default function Solutions() {
  const solutions = [
    { num: '01', title: 'INFRASTRUCTURE', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=500' },
    { num: '02', title: 'MEP ENGINEERING', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=500' },
    { num: '03', title: 'CIVIL WORKS', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=500' },
    { num: '04', title: 'CHEMICAL FACILITIES', image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=500' },
    { num: '05', title: 'WATER TREATMENT', image: 'https://images.unsplash.com/photo-1644389355109-15b26f71c36b?q=80&w=500' },
    { num: '06', title: 'ENERGY SOLUTIONS', image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=500' },
    { num: '07', title: 'RESEARCH & DEVELOPMENT', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=500' },
  ];

  return (
    <section className="bg-white py-32 w-full" id="expertise">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-12">
        
        {/* Left Column */}
        <div className="md:col-span-4 flex flex-col items-start relative">
          <div className="md:sticky md:top-32 w-full">
            <h2 className="text-6xl md:text-7xl text-[#111] font-normal tracking-tight mb-6 flex items-start">
              Expertise
              <sup className="text-2xl md:text-3xl mt-4 ml-1 font-light text-[#111]">7</sup>
            </h2>
            <p className="text-gray-500 text-base md:text-lg mb-8 leading-relaxed max-w-sm">
              Built for major projects across the Middle East, our team delivers high-quality engineering, procurement, and construction solutions across multiple specialized sectors.
            </p>
            <a 
              href="#projects" 
              className="inline-block bg-[#94a3b8] text-white font-mono uppercase tracking-widest text-sm px-6 py-4 hover:bg-[#64748b] transition-colors"
            >
              VIEW ALL PROJECTS
            </a>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-8 mt-12 md:mt-0">
          <div className="flex flex-col border-t border-gray-300">
            {solutions.map((item, idx) => (
              <div 
                key={idx} 
                className="group relative flex items-center py-8 md:py-10 border-b border-gray-300 hover:border-[#94a3b8] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-8 md:gap-16 text-[#111] group-hover:text-[#94a3b8] transition-colors">
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
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
