import React from 'react';

const features = [
  {
    id: 'upload',
    title: 'Match to job',
    description: 'Paste a job description, upload your resume, and get a match score with tips.',
    cta: 'Start matching',
    accent: 'from-blue-500 to-blue-600',
    ring: 'ring-blue-200',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    ),
  },
  {
    id: 'compare',
    title: 'Compare versions',
    description: 'Upload several resume files and see which version scores highest.',
    cta: 'Compare resumes',
    accent: 'from-green-500 to-green-600',
    ring: 'ring-green-200',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    ),
  },
  {
    id: 'versions',
    title: 'Browse versions',
    description: 'Open any saved version for section scores, feedback, and charts.',
    cta: 'View versions',
    accent: 'from-purple-500 to-purple-600',
    ring: 'ring-purple-200',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    ),
  },
];

const HomeView = ({ onNavigate }) => {
  return (
    <main className="flex-1 min-h-[calc(100dvh-4rem)] flex flex-col items-center justify-center px-4 sm:px-6 pt-28 pb-16">
      <div className="w-full max-w-5xl mx-auto text-center">
        <p className="animate-fade-in-up text-sm font-medium tracking-wide text-white/90 uppercase mb-3">
          No sign-in required
        </p>
        <h1 className="animate-fade-in-up animate-delay-100 text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-sm">
          ResumeChecker
        </h1>
        <p className="animate-fade-in-up animate-delay-200 text-lg sm:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
          Match your resume to any role, compare versions, and keep your work as you move between tabs.
        </p>
        <p className="animate-fade-in-up animate-delay-300 text-sm text-white/70 mt-4">
          Use the menu in the header, or pick a tool below
        </p>
      </div>

      <div className="w-full max-w-5xl mx-auto mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {features.map((feature, index) => (
          <button
            key={feature.id}
            type="button"
            onClick={() => onNavigate(feature.id)}
            style={{ animationDelay: `${0.35 + index * 0.12}s` }}
            className={`animate-fade-in-up group text-left bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl ring-1 ${feature.ring} hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white`}
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.accent} flex items-center justify-center mb-4 shadow-md`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {feature.icon}
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-5">{feature.description}</p>
            <span className="inline-flex items-center text-sm font-semibold text-gray-800 group-hover:text-gray-600">
              {feature.cta}
              <svg className="w-4 h-4 ml-1 text-gray-400 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        ))}
      </div>
    </main>
  );
};

export default HomeView;
