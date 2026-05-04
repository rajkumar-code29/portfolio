import { Briefcase, Calendar, MapPin } from 'lucide-react';

export function Experience() {
  const experiences = [
    {
      company: 'IntrigueSphere E Learning LLP',
      position: 'Data Engineer & Developer',
      location: 'Remote',
      period: 'Mar 2024 – Aug 2025',
      description: [
        'Spearheaded end-to-end data architecture and full-stack development for innovative e-learning and hospitality platform',
        'Bridged commercial requirements with technical execution, translating business needs into scalable backend data pipelines',
      ],
      technologies: ['Python', 'SQL', 'Data Architecture', 'Full-Stack Development'],
    },
    {
      company: 'Amazon',
      position: 'Senior Compliance Analyst',
      location: 'Hyderabad, India',
      period: 'May 2020 – Jan 2024',
      description: [
        'Converted a 5-step manual Associate-QA process into a fully automated system using PowerApps and Excel, reducing review time and giving a production boost by 48% per month',
        'Designed and implemented an end-to-end reporting automation system that replaced a multi-step manual process involving QA scoring, associate productivity tracking, and Excel-based manager reviews',
        'Built custom VBA Macros to allow QA reviewers and associates to instantly evaluate scores and productivity metrics, auto-generate reports, and update a centralized dashboard',
        'Adopted across all teams within the process, this automation resulted in an estimated 30 hours/week of manual effort saved',
        'Developed a web scraping automation tool with Python and Selenium to retrieve and evaluate image-based search results, improving accuracy in similarity matching from 47% to 70%',
      ],
      technologies: ['Python', 'Selenium', 'PowerApps', 'VBA', 'Excel', 'Automation'],
    },
    {
      company: 'Snacks at Work',
      position: 'Operations Manager',
      location: 'Hyderabad, India',
      period: 'Mar 2018 – Nov 2019',
      description: [
        'Managed P&L, supply chain logistics and cross-functional team leadership for a B2B start-up',
      ],
      technologies: ['P&L Management', 'Supply Chain', 'Team Leadership'],
    },
    {
      company: 'Amazon',
      position: 'Customer Service Associate',
      location: 'Hyderabad, India',
      period: 'Jul 2017 – Jan 2018',
      description: [
        'Supported customers with queries related to the orders placed and other queries related to marketplace',
      ],
      technologies: ['Customer Service', 'Communication'],
    },
    {
      company: 'Decathlon Sports India',
      position: 'Workshop Manager & Coach',
      location: 'India',
      period: 'Jun 2015 – Nov 2016',
      description: [
        'Managed workshop operations and coached customers on sports equipment and techniques',
      ],
      technologies: ['Team Management', 'Customer Relations'],
    },
  ];

  return (
    <section id="experience" className="min-h-screen py-24 bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4 transition-colors">
            Experience
          </h2>
          <div className="w-16 h-1 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full mb-6"></div>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 dark:border-zinc-800"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 border-b border-slate-100 dark:border-zinc-800 pb-6 transition-colors">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">
                    {exp.position}
                  </h3>
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-lg transition-colors">
                    <Briefcase size={20} />
                    <span>{exp.company}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-slate-500 dark:text-zinc-400 mt-4 md:mt-0 transition-colors">
                  <div className="flex items-center gap-2 font-medium">
                    <Calendar size={18} />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <MapPin size={18} />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {exp.description.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-zinc-300 leading-relaxed transition-colors">
                    <span className="text-blue-600 dark:text-blue-500 mt-1.5 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-1.5 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 rounded-full text-sm font-semibold tracking-wide transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}