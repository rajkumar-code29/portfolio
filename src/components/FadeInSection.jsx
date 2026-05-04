import { useState, useRef, useEffect } from 'react';

export function FadeInSection({ children }) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // When the element enters the screen, trigger the fade
        if (entry.isIntersecting) {
          setVisible(entry.isIntersecting);
          // Optional: Stop observing once it's visible so it doesn't fade out again
          observer.unobserve(entry.target);
        }
      });
    }, {
      // Trigger when 10% of the element is visible
      threshold: 0.1, 
      rootMargin: "0px 0px -50px 0px"
    });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      }`}
    >
      {children}
    </div>
  );
}