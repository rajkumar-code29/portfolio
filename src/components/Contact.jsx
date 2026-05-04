import { Mail, Download, Globe } from 'lucide-react';

const GithubIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

const LinkedinIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export function Contact() {
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/RajKumar_Resume.pdf'; 
    link.download = 'RajKumar_Resume.pdf';
    link.click();
  };

  const handleSendEmail = () => {
    window.location.href = 'mailto:raj.gk29@outlook.com?subject=Let\'s Connect!';
  };

  const socialLinks = [
    { icon: Globe, label: 'Website', url: 'https://www.rajkumar.codes' },
    { icon: LinkedinIcon, label: 'LinkedIn', url: 'https://www.linkedin.com/in/raj-kumar-g-k-5aaa2b235' },
    { icon: GithubIcon, label: 'GitHub', url: 'https://github.com/rajkumar-code29' },
  ];

  return (
    <section id="contact" className="py-24 bg-linear-to-br from-blue-600 to-indigo-700 dark:from-zinc-900 dark:to-zinc-950 text-white transition-colors duration-300 border-t dark:border-zinc-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Let's Connect</h2>
          <div className="w-16 h-1 bg-white mx-auto rounded-full mb-6 text-opacity-50"></div>
          <p className="text-xl text-blue-50 dark:text-zinc-400 max-w-2xl mx-auto transition-colors">
            I'm always open to discussing new opportunities, collaborations, or just having a chat about technology.
          </p>
        </div>

        <div className="bg-white/10 dark:bg-zinc-800/50 backdrop-blur-md rounded-3xl p-8 md:p-12 mb-12 border border-white/20 dark:border-zinc-700 shadow-2xl transition-colors duration-300">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-blue-500/30 dark:bg-zinc-700/50 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors">
              <Mail size={40} className="text-blue-50 dark:text-blue-400" />
            </div>
            <h3 className="text-3xl font-bold mb-3">Get in Touch</h3>
            <p className="text-blue-50 dark:text-zinc-300 text-lg transition-colors">
              Feel free to reach out for collaborations or just a friendly hello.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={handleSendEmail}
              className="flex items-center justify-center bg-white dark:bg-zinc-100 text-blue-700 dark:text-zinc-900 hover:bg-blue-50 dark:hover:bg-white px-8 py-4 text-lg font-bold rounded-xl shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
            >
              <Mail className="mr-3" size={20} />
              Send an Email
            </button>
            
            <button
              onClick={handleDownloadResume}
              className="flex items-center justify-center bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-400 dark:hover:bg-blue-500 px-8 py-4 text-lg font-bold rounded-xl shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
            >
              <Download className="mr-3" size={20} />
              Download Resume
            </button>
          </div>

          <div className="flex justify-center gap-8 border-t border-white/20 dark:border-zinc-700 pt-8 transition-colors">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-white/10 dark:bg-zinc-800 hover:bg-white/20 dark:hover:bg-zinc-700 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-1"
                aria-label={link.label}
              >
                <link.icon size={28} />
              </a>
            ))}
          </div>
        </div>

        <div className="text-center text-blue-100 dark:text-zinc-400 space-y-3 font-medium transition-colors">
          <p className="text-xl text-white">raj.gk29@outlook.com</p>
          <p>07343039118</p>
          <p>Glasgow, G1 1PU</p>
        </div>
      </div>
    </section>
  );
}