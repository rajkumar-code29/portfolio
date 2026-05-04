import { ArrowDown, Smartphone, Quote, ChevronUp, ChevronDown, BadgeCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Hero({ onScrollToAbout, accolades = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    
    const heroAccolades = accolades.slice(0, 5);
    const total = heroAccolades.length; // Show only the top 5 accolades in the hero section

  // Auto-play and Progress Bar Logic
  useEffect(() => {
    if (total === 0) return; // No accolades to show, skip the timer
    const updateInterval = 50; // Update the bar every 50ms for smoothness
    const duration = 5000; // 5 seconds total
    const increment = (updateInterval / duration) * 100;
    
    let timer;
    if (!isPaused) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            // Move to next slide when progress hits 100%
            setCurrentIndex((current) => (current + 1) % total);
            return 0;
          }
          return prev + increment;
        });
      }, updateInterval);
    }

    return () => clearInterval(timer);
  }, [isPaused, total]);

  // Manual Navigation Handlers
  const nextSlide = () => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
    setProgress(0); // Reset timer on manual click
  };

  const prevSlide = () => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setProgress(0); // Reset timer on manual click
  };

  const scrollToTestimonials = () => {
    const element = document.getElementById('testimonials');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Mathematical positioning for the 1/3rd overlap effect
  const getCardStyle = (index) => {
    if (index === currentIndex) {
      // Centered, fully visible active card
      return "top-[50%] -translate-y-[50%] scale-100 opacity-100 z-30 blur-none cursor-pointer shadow-xl";
    }
    if (index === (currentIndex - 1 + total) % total) {
      // Previous card (Starts at the top, translates UP so only bottom 33% is visible)
      return "top-0 -translate-y-[66%] scale-95 opacity-40 z-10 blur-[2px] pointer-events-none";
    }
    if (index === (currentIndex + 1) % total) {
      // Next card (Starts at the bottom, translates UP so only top 33% is visible)
      return "top-[100%] -translate-y-[34%] scale-95 opacity-40 z-10 blur-[2px] pointer-events-none";
    }
    // Hidden cards
    return "top-[50%] -translate-y-[50%] scale-75 opacity-0 z-0 pointer-events-none";
  };

  return (
    <section id="hero" className="min-h-screen flex items-center bg-slate-50 dark:bg-zinc-950 px-4 pt-24 pb-12 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* LEFT COLUMN: Name and Details */}
        <div className="flex flex-col items-start text-left z-10">

            {/* --- Profile picture --- */}
            <div className="relative w-32 h-38 sm:w-40 mb-8 group">
                {/* Animated Gradient Ring */}
                <div className="absolute inset-0 bg-linear-to-tr from-blue-600 to purple-500 rounded-4xl rotate-3 group-hover:rotate-6 transition-transform duration-300 opacity-70 blur-sm"></div>
                {/* Image Container */}
                <div className='absolute inset-0 bg-white dark:bg-zinc-900 rounded-4xl p-1.5 shadow-xl transition-colors'>
                    {/*image*/}
                    <img
                      src="/profile.PNG"
                      alt="Raj Kumar G K"
                      className="w-full h-full object-cover rounded-4xl"
                      // fallback in case image fails to load
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/150?text=Raj+Kumar+G+K';
                        }}
                    
                    />
                </div>
            </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight transition-colors">
            Raj Kumar G K
          </h1>
          
          <h2 className="text-2xl sm:text-3xl text-blue-600 dark:text-blue-400 font-bold mb-6 transition-colors">
            Data Professional & Software Developer
          </h2>
          
          <p className="text-lg sm:text-xl text-slate-600 dark:text-zinc-400 max-w-xl mb-10 leading-relaxed transition-colors">
            8+ years of cross-functional experience in data governance, incident management and automated dashboarding.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto">
            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-lg hover:-translate-y-1 cursor-pointer">
              <Smartphone size={20} />
              Download My App (Coming Soon)
            </button>
          </div>

          <button 
            onClick={onScrollToAbout}
            className="flex items-center gap-3 text-slate-500 dark:text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group cursor-pointer font-medium"
          >
            <span>Explore my work</span>
            <ArrowDown className="animate-bounce group-hover:text-blue-600 dark:group-hover:text-blue-400" size={20} />
          </button>
        </div>

        {/* RIGHT COLUMN: Interactive Vertical Carousel */}
        <div className="relative h-112.5 lg:h-137.5 w-full hidden lg:flex items-center justify-between pl-8">
          
          {/* Slider Container */}
          <div 
            className="relative w-full max-w-md h-full overflow-hidden rounded-3xl"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {total > 0 ? heroAccolades.map((testimonial, index) => (
                <div 
                key={testimonial.id}
                onClick={index === currentIndex ? scrollToTestimonials : undefined}
                className={`absolute left-0 right-0 w-full bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 transition-all duration-700 ease-in-out ${getCardStyle(index)}`}
                >
                <Quote className="text-blue-500 mb-4" size={28} />
                <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed italic">
                    "{testimonial.testimonial}" {/* Note: The DB column is named 'testimonial' */}
                </p>
                <div className="border-t border-slate-100 dark:border-zinc-800 pt-4">
                    
                    {/* THE VERIFIED BADGE */}
                    <div className="flex items-center gap-1 mb-1">
                    <p className="text-slate-900 dark:text-white font-bold">{testimonial.name}</p>
                    <BadgeCheck className="text-blue-500" size={18} title="Verified Accolade" />
                    </div>
                    
                    <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{testimonial.company}</p>
    {/* TEXT LINKEDIN BUTTON */}
                    <div className="mt-1">
                      {testimonial.linkedin ? (
                        <a 
                          href={testimonial.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()} 
                          className="text-xs font-bold text-[#0A66C2] dark:text-[#70B5F9] hover:underline transition-colors"
                        >
                          LinkedIn
                        </a>
                      ) : (
                        <span className="text-xs font-semibold text-slate-400 dark:text-zinc-600 cursor-not-allowed">
                          LinkedIn
                        </span>
                      )}
                    </div>

                  </div>
                </div>
              )) : (
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-zinc-500 border border-dashed border-slate-200 dark:border-zinc-800 rounded-3xl">
                  Awaiting first approved accolade...
                </div>
              )}
          </div>

          {/* Controls Pillar (Arrows + Progress Bar) */}
          <div 
            className="flex flex-col items-center justify-center gap-4 ml-6 h-full py-12"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <ChevronUp size={24} />
            </button>

            {/* Vertical Progress Bar */}
            <div className="w-1.5 h-32 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden relative">
              <div 
                className="absolute top-0 w-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-75 ease-linear"
                style={{ height: `${progress}%` }}
              />
            </div>

            <button 
              onClick={nextSlide}
              className="p-2 rounded-full text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <ChevronDown size={24} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}