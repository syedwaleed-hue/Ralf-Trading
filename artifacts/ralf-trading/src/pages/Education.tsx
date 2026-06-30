import React, { useEffect } from 'react';
import { BookOpen, Lock } from 'lucide-react';

const courses = [
  {
    title: "Mastering XAUUSD Price Action",
    desc: "A deep dive into the specific behavioral patterns of Gold. Learn how to identify liquidity grabs, session timing, and institutional footprints.",
    level: "Advanced",
    status: "available"
  },
  {
    title: "Institutional Risk Management",
    desc: "How to size positions mathematically, calculate true R-multiples, and survive drawdown periods without emotional collapse.",
    level: "Intermediate",
    status: "available"
  },
  {
    title: "Algorithmic Assistance for Manual Traders",
    desc: "Using custom indicators and EAs to filter noise, manage trailing stops, and execute with precision.",
    level: "Advanced",
    status: "coming_soon"
  },
  {
    title: "The Psychology of Large Capital",
    desc: "Transitioning from retail account sizing to managing six and seven-figure funded accounts. Overcoming monetary attachment.",
    level: "All Levels",
    status: "available"
  },
  {
    title: "Macro Fundamentals for Intraday",
    desc: "How NFP, CPI, and FOMC data actually move the market, and how to position before and after major liquidity events.",
    level: "Intermediate",
    status: "coming_soon"
  },
  {
    title: "Building a Trading Plan",
    desc: "Creating a mechanical rule-based system that eliminates second-guessing. Documenting the edge.",
    level: "Beginner",
    status: "coming_soon"
  }
];

export default function Education() {
  useEffect(() => {
    document.title = "Education | RALF Trading";
  }, []);

  return (
    <div className="pb-20 page-fade-in">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-5xl md:text-6xl font-serif mb-6">Trading Education</h1>
        <div className="w-20 h-1 bg-primary mb-12"></div>
        
        <p className="text-xl text-white/70 max-w-3xl mb-16 leading-relaxed">
          The retail trading industry is filled with noise. Our curriculum is designed solely for serious individuals looking to transition from amateur speculation to systematic, process-driven execution.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <div key={i} className="glass-card p-8 rounded-xl flex flex-col h-full relative overflow-hidden group">
              {course.status === 'coming_soon' && (
                <div className="absolute top-4 right-4 bg-white/10 text-white/50 text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md flex items-center gap-1">
                  <Lock size={12} /> Coming Soon
                </div>
              )}
              
              <div className="mb-4">
                <span className="text-xs text-primary uppercase tracking-widest border border-primary/30 px-2 py-1 rounded">
                  {course.level}
                </span>
              </div>
              <h3 className={`text-2xl font-serif mb-4 ${course.status === 'coming_soon' ? 'text-white/50' : 'text-white group-hover:text-primary transition-colors'}`}>
                {course.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed mb-8 flex-grow">
                {course.desc}
              </p>
              
              <button 
                disabled={course.status === 'coming_soon'}
                className={`w-full py-3 text-sm uppercase tracking-widest transition-colors flex justify-center items-center gap-2
                  ${course.status === 'coming_soon' 
                    ? 'bg-black/30 text-white/30 cursor-not-allowed border border-white/5' 
                    : 'bg-primary text-black hover:bg-white font-semibold'}`}
              >
                {course.status === 'coming_soon' ? 'Locked' : 'Access Course'} <BookOpen size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-20 glass-card p-10 rounded-2xl text-center border border-primary/20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif mb-4">One-on-One Mentorship</h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            For individuals seeking direct guidance, Mr. Rahil Pasha offers limited 1-on-1 mentorship spots focused on system development and psychological rewiring.
          </p>
          <a href="mailto:support@ralfstrading.com">
            <button className="px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-black transition-colors uppercase tracking-widest text-sm">
              Inquire Availability
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}