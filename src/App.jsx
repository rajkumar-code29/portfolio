import { useEffect, useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Interests } from './components/Interests';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { TestimonialsPage } from './components/TestimonialsPage';
import { AccoladeForm } from './components/AccoladeForm';
import { FadeInSection } from './components/FadeInSection';

// Import your Supabase client
import { supabase } from './supabaseClient';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isDarkTheme, setIsDarkTheme] = useState(true); 
  
  // Router State
  const [currentView, setCurrentView] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'invite') return 'invite';
    return 'home';
  });

  // Database State
  const [accolades, setAccolades] = useState([]);

  // Fetch from Supabase exactly once when the app loads
  useEffect(() => {
    const fetchAccolades = async () => {
      const { data, error } = await supabase
        .from('accolades')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setAccolades(data);
      }
    };

    fetchAccolades();
  }, []);

  // Theme logic
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  // Scroll tracking logic
  useEffect(() => {
    if (currentView !== 'home') return;

    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'interests', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  return (
    <div className="w-full min-h-screen font-sans bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-50 transition-colors duration-300">
      <Navigation 
        activeSection={activeSection} 
        isDarkTheme={isDarkTheme} 
        toggleTheme={toggleTheme}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      
      {/* 1. The Main Home Page */}
      {currentView === 'home' && (
        <main>
          {/* FIXED: Passed accolades prop to Hero */}
          <Hero onScrollToAbout={scrollToAbout} accolades={accolades} />
          <FadeInSection>
            <About />
          </FadeInSection>
          <FadeInSection>
            <Experience />
          </FadeInSection>
          <FadeInSection>
            <Interests />
          </FadeInSection>
          {/* FIXED: Passed accolades prop to Testimonials */}
          <Testimonials onViewAll={() => setCurrentView('testimonials')} accolades={accolades} />
          <FadeInSection>
            <Contact />
          </FadeInSection>
        </main>
      )}
      
      {/* 2. The Full Accolades Grid Page */}
      {currentView === 'testimonials' && (
        <main>
          {/* FIXED: Passed accolades prop to TestimonialsPage */}
          <TestimonialsPage onBack={() => setCurrentView('home')} accolades={accolades} />
        </main>
      )}

      {/* 3. The Hidden Invite View */}
      {currentView === 'invite' && (
        <main>
          <AccoladeForm />
          {/* FIXED: Passed accolades prop to social proof carousel underneath the form */}
          <Testimonials onViewAll={() => setCurrentView('testimonials')} accolades={accolades} />
        </main>
      )}
    </div>
  );
}