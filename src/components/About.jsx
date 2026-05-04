import { Database, Lightbulb, Users, Zap } from 'lucide-react';

export function About() {
  const skills = [
    {
      icon: Database,
      title: 'Technical Excellence',
      description: 'Expertise in Python, Java, SQL, PostgreSQL, Flutter & Microsoft Azure.',
    },
    {
      icon: Lightbulb,
      title: 'Data Architecture',
      description: 'Building robust ETL pipelines and end-to-end automated reporting systems.',
    },
    {
      icon: Users,
      title: 'Cross-Functional Leadership',
      description: 'Bridging commercial requirements with technical execution and incident management.',
    },
    {
      icon: Zap,
      title: 'Process Automation',
      description: 'Eliminating bottlenecks to recover hours of manual effort and boost productivity.',
    },
  ];

  return (
    <section id="about" className="min-h-screen py-24 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4 transition-colors">
            About Me
          </h2>
          <div className="w-16 h-1 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full mb-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-5 group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-colors duration-300">
                <skill.icon className="text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 transition-colors">
                {skill.title}
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 leading-relaxed transition-colors">{skill.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-linear-to-br from-slate-50 to-blue-50/50 dark:from-zinc-900 dark:to-blue-900/10 rounded-3xl p-8 md:p-12 border border-slate-100 dark:border-zinc-800 shadow-sm transition-colors duration-300">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 transition-colors">My Journey</h3>
          <div className="space-y-6 text-lg text-slate-700 dark:text-zinc-300 leading-relaxed transition-colors">
            <p>
              I have a proven track record of architecting Python and SQL-driven ETL pipelines that eliminate manual bottlenecks. During my tenure at Amazon, I designed and implemented automated reporting systems that recovered 30+ hours weekly and boosted team productivity by 48% per month. I was also recognized with the Brainiac Award for developing a web scraping automation tool using Python and Selenium.
            </p>
            <p>
              Recently, I spearheaded end-to-end data architecture and full-stack development for an innovative e-learning platform at IntrigueSphere.
            </p>
            <p>
                Created a full stack booking system for "GetPowerNap" to prove proof of concept further leading to successful react web-app deployment.
            </p>
            <p>
              I am currently finalising an MSc in Software Development at the University of Strathclyde in Glasgow. This allows me to offer employers a rare combination of heavy-duty engineering capability—spanning Azure, PostgreSQL, Flutter, Java, and Python—paired with a senior-level understanding of P&L and operational scalability.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}