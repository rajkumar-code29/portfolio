import { Trophy, Swords, Mountain, Code2, Database, Briefcase } from 'lucide-react';

export function Interests() {
  const interests = [
    {
      icon: Trophy,
      title: 'Entrepreneurship',
      description: 'Finalist in Strath Inspire Entrepreneurship Challenge 2025-2026, where we developed "Claros" a smart indoor Air & Energy monitoring system',
      color: 'from-amber-400 to-orange-500',
    },
    {
      icon: Swords,
      title: 'Martial Arts',
      description: 'Dedicated MMA practitioner, Self-defense instructor which cultivated discipline, focus and resilience',
      color: 'from-red-400 to-rose-500',
    },
    {
      icon: Mountain,
      title: 'Exploring',
      description: 'Passionate about Trekking, Have done multiple himalayan expeditions, currently exploring scottish highlands to actively maintain work-life balance',
      color: 'from-green-400 to-emerald-500',
    },
    {
      icon: Code2,
      title: 'Software Development',
      description: 'MSc in Software Development at University of Strathclyde',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      icon: Database,
      title: 'Data Engineering',
      description: 'Building ETL pipelines and automated reporting systems',
      color: 'from-purple-400 to-pink-500',
    },
    {
      icon: Briefcase,
      title: 'Problem Solving',
      description: 'Strategic commercial acumen and innovative business concepts',
      color: 'from-indigo-400 to-purple-500',
    },
  ];

  return (
    <section id="interests" className="py-24 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4 transition-colors">
            Beyond the Code
          </h2>
          <div className="w-16 h-1 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-slate-600 dark:text-zinc-400 max-w-3xl mx-auto transition-colors">
            What keeps me inspired, balanced, and sharp.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {interests.map((interest, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${interest.color} opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}></div>
              
              <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${interest.color} flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform`}>
                <interest.icon className="text-white" size={28} />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 transition-colors">
                {interest.title}
              </h3>
              
              <p className="text-slate-600 dark:text-zinc-400 leading-relaxed transition-colors">
                {interest.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}