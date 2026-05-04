import { useEffect, useRef, useState } from 'react';
import { Quote, X, ArrowRight, BadgeCheck } from 'lucide-react';

export function Testimonials({ onViewAll, accolades = [] }) {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const scrollContainerRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      if (!isPaused && container) {
        scrollPosition += scrollSpeed;
        if (scrollPosition >= container.scrollWidth / 2) {
          scrollPosition = 0;
        }
        container.scrollLeft = scrollPosition;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  // If there are no accolades yet, don't break the layout!
  const safeAccolades = accolades || [];

  return (
    <section id="testimonials" className="py-24 bg-slate-50 dark:bg-zinc-950 overflow-hidden relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center mb-16 px-4 relative">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-900 dark:text-white transition-colors">Accolades</h2>
          <div className="w-16 h-1 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto mb-6 transition-colors">
            What colleagues and leaders say about working with me.
          </p>
          
          <button 
            onClick={onViewAll}
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:text-blue-700 dark:hover:text-blue-300 transition-colors group cursor-pointer"
          >
            View All Accolades <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-slate-50 dark:from-zinc-950 to-transparent z-10 pointer-events-none transition-colors" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-slate-50 dark:from-zinc-950 to-transparent z-10 pointer-events-none transition-colors" />

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-hidden pb-8 px-4"
            style={{ scrollBehavior: 'auto' }}
          >
            {[...safeAccolades, ...safeAccolades].map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                onClick={() => setSelectedTestimonial(testimonial)}
                className="shrink-0 w-80 sm:w-96 bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-slate-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:-translate-y-2 cursor-pointer shadow-md dark:shadow-none"
              >
                <Quote className="text-blue-500 mb-6" size={32} />
                <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed italic line-clamp-4 transition-colors">
                  "{testimonial.testimonial}"
                </p>
                <div className="border-t border-slate-100 dark:border-zinc-800 pt-4 transition-colors">
                  
                  {/* Verified Badge Header */}
                  <div className="flex items-center gap-1 mb-1">
                    <p className="text-slate-900 dark:text-white font-bold transition-colors">{testimonial.name}</p>
                    <BadgeCheck className="text-blue-500" size={18} title="Verified Accolade" />
                  </div>

                  <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors">{testimonial.role}</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium transition-colors">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedTestimonial && (
        <div
          className="fixed inset-0 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-colors duration-300"
          onClick={() => setSelectedTestimonial(null)}
        >
          <div
            className="bg-white dark:bg-zinc-900 rounded-3xl p-8 max-w-2xl w-full border border-slate-200 dark:border-zinc-800 shadow-2xl relative transition-colors duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedTestimonial(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors text-slate-600 dark:text-slate-300 cursor-pointer"
            >
              <X size={24} />
            </button>
            <div className="mt-4">
              <Quote className="text-blue-500 mb-6" size={48} />
              <p className="text-slate-700 dark:text-slate-200 text-xl leading-relaxed italic mb-8 transition-colors">
                "{selectedTestimonial.testimonial}"
              </p>
              <div className="border-t border-slate-200 dark:border-zinc-800 pt-6 transition-colors">
                
                {/* Verified Badge Header (Modal) */}
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-slate-900 dark:text-white text-2xl font-bold transition-colors">{selectedTestimonial.name}</p>
                  <BadgeCheck className="text-blue-500 mt-1" size={24} title="Verified Accolade" />
                </div>
                
                <p className="text-slate-600 dark:text-slate-400 mb-1 transition-colors">{selectedTestimonial.role}</p>
                <p className="text-blue-600 dark:text-blue-400 font-medium transition-colors">{selectedTestimonial.company}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}