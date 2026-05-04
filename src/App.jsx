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
import {supabase} from './supabaseClient'; // Importing the Supabase client

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isDarkTheme, setIsDarkTheme] = useState(true); 
  
  // New state to act as our simple page router
  const [currentView, setCurrentView] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'invite') return 'invite';
    return 'home';
  });

  // database State
  const [accolades, setAccolades] = useState([]);

  useEffect(() => {
    const fetchAccolades = async () => {
      const {data, error} = await supabase
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

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  useEffect(() => {
    // Only track scrolling if we are on the home page
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
          <Hero onScrollToAbout={scrollToAbout} />
          <About />
          <Experience />
          <Interests />
          <Testimonials onViewAll={() => setCurrentView('testimonials')} />
          <Contact />
        </main>
      )}
      
      {/* 2. The Full Accolades Grid Page */}
      {currentView === 'testimonials' && (
        <main>
          {/*Pass accolades down! */}
          <TestimonialsPage onBack={() => setCurrentView('home')} accolades={accolades} />
        </main>
      )}

      {/* 3. The Hidden Invite View */}
      {currentView === 'invite' && (
        <main>
          {/* Form is strictly on TOP */}
          <AccoladeForm />
          
          {/* Social Proof (Accolades) is strictly on BOTTOM */}
          <Testimonials onViewAll={() => setCurrentView('testimonials')} />
        </main>
      )}
    </div>
  );
}