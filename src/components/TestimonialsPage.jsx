import { ArrowLeft, Quote, BadgeCheck } from 'lucide-react';

export function TestimonialsPage({ onBack, accolades = [] }) {
  // Scrolls to top automatically when this page mounts
  window.scrollTo(0, 0);

  const safeAccolades = accolades || [];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-12">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-slate-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors group cursor-pointer font-medium"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 transition-colors">
            All Accolades
          </h1>
          <div className="w-16 h-1 bg-blue-600 dark:bg-blue-500 rounded-full mb-6"></div>
          <p className="text-xl text-slate-600 dark:text-zinc-400 max-w-3xl leading-relaxed transition-colors">
            A comprehensive collection of feedback from managers, peers, and stakeholders I have had the pleasure of working alongside throughout my career.
          </p>
        </div>

        {safeAccolades.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-slate-500 dark:text-zinc-400">No accolades have been published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safeAccolades.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 transition-colors flex flex-col justify-between"
              >
                <div>
                  <Quote className="text-blue-500 mb-6" size={32} />
                  <p className="text-slate-700 dark:text-slate-300 mb-8 leading-relaxed italic text-lg transition-colors">
                    "{testimonial.testimonial}"
                  </p>
                </div>
                <div className="border-t border-slate-100 dark:border-zinc-800 pt-5 transition-colors">
                  
                  {/* Verified Badge Header */}
                  <div className="flex items-center gap-1 mb-1">
                    <p className="text-slate-900 dark:text-white font-bold text-lg transition-colors">{testimonial.name}</p>
                    <BadgeCheck className="text-blue-500" size={18} title="Verified Accolade" />
                  </div>

                  <div className="flex flex-col gap-1 mt-1">
                    <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors">{testimonial.role}</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium transition-colors">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}