import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
// Import your new database client!
import { supabase } from '../supabaseClient'; 

export function AccoladeForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Added loading state
  const [wordCount, setWordCount] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null); // Added error state
  const WORD_LIMIT = 100;

  const [formData, setFormData] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      name: params.get('name') || '',
      role: params.get('role') || '',
      company: params.get('company') || '',
      linkedin: '',
      testimonial: ''
    };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'testimonial') {
      const words = value.trim().split(/\s+/).filter(word => word.length > 0);
      if (words.length <= WORD_LIMIT) {
        setFormData(prev => ({ ...prev, [name]: value }));
        setWordCount(words.length);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // The updated submit function connecting to Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const { error } = await supabase
      .from('accolades')
      .insert([
        { 
          name: formData.name, 
          role: formData.role, 
          company: formData.company, 
          linkedin: formData.linkedin, 
          testimonial: formData.testimonial 
          // status will automatically default to 'pending' in the DB
        }
      ]);

    setIsSubmitting(false);

    if (error) {
      console.error("Error inserting data:", error);
      setErrorMsg("Something went wrong connecting to the database. Please try again.");
    } else {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-slate-50 dark:bg-zinc-950 flex items-center justify-center transition-colors duration-300 px-4">
        <div className="bg-white dark:bg-zinc-900 p-10 rounded-3xl shadow-xl border border-slate-200 dark:border-zinc-800 text-center max-w-lg w-full">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6"/>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Thank You!</h2>
          <p className="text-slate-600 dark:text-zinc-400 text-lg">
            Your feedback has been safely received and queued for review. I truly appreciate your time!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Share Your Experience
          </h1>
          <div className="w-16 h-1 bg-blue-600 dark:bg-blue-500 rounded-full mb-6"></div>
          <p className="text-xl text-slate-600 dark:text-zinc-400">
            Thank you for taking the time to write a brief accolade about our time working together.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 p-8 sm:p-10 rounded-3xl shadow-lg border border-slate-200 dark:border-zinc-800 transition-colors">
          
          
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400">
              <AlertCircle size="{20}"/>
              <p className="font-medium">{errorMsg}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Full Name *</label>
              <input 
                required
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">LinkedIn Profile (Optional)</label>
              <input 
                type="url" 
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Designation / Role *</label>
              <input 
                required
                type="text" 
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Senior Data Engineer"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Company *</label>
              <input 
                required
                type="text" 
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Amazon"
              />
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-end mb-2">
              <label className="block text-sm font-semibold text-slate-900 dark:text-white">Your Accolade *</label>
              <span className={`text-xs font-medium ${wordCount >= WORD_LIMIT ? 'text-red-500' : 'text-slate-500 dark:text-zinc-500'}`}>
                {wordCount} / {WORD_LIMIT} words
              </span>
            </div>
            <textarea 
              required
              name="testimonial"
              value={formData.testimonial}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
              placeholder="Raj's expertise in..."
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-zinc-500">
              <AlertCircle size="{16}"/>
              <span>Feedback will be reviewed before publishing.</span>
            </div>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:-translate-y-1 disabled:hover:translate-y-0 transition-all cursor-pointer"
            >
              {isSubmitting ? <Loader2 size="{20}" className="animate-spin"/> : <Send size="{20}"/>}
              {isSubmitting ? 'Submitting...' : 'Submit Accolade'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}