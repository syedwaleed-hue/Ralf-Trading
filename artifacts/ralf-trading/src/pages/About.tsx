import React, { useEffect } from 'react';
import deskPhoto from '@assets/TRADING_SETUP_1782745233549.webp';
import { Target, Shield, Award, Users } from 'lucide-react';

export default function About() {
  useEffect(() => {
    document.title = "About | RALF Trading";
  }, []);

  return (
    <div className="pb-20 page-fade-in">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-5xl md:text-6xl font-serif mb-6">About RALF Trading</h1>
        <div className="w-20 h-1 bg-primary mb-12"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="text-3xl font-serif text-primary mb-6">Mr. Rahil Pasha</h2>
            <p className="text-white/70 leading-relaxed mb-6 text-lg">
              Founded in 2011, RALF Trading was established by Mr. Rahil Pasha with a singular vision: to bring institutional-grade discipline to proprietary trading and capital management.
            </p>
            <p className="text-white/70 leading-relaxed mb-6 text-lg">
              With over 14 years of rigorous market experience, Mr. Pasha developed a specialized focus on XAUUSD (Gold/USD)—one of the most demanding yet rewarding instruments when approached with the correct methodology.
            </p>
            <p className="text-white/70 leading-relaxed text-lg">
              Our firm does not rely on luck or market euphoria. We rely on statistical edges, strict risk parameters, and an unwavering commitment to our trading process.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-2 relative">
             <div className="absolute inset-0 gold-glow opacity-20 rounded-2xl"></div>
             <img src={deskPhoto} alt="Trading Desk" className="rounded-xl w-full h-full object-cover filter contrast-125 brightness-90 min-h-[400px]" />
          </div>
        </div>

        <div className="mb-24">
          <h2 className="text-3xl font-serif text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-8 rounded-xl text-center hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <Target size={32} />
              </div>
              <h3 className="text-xl font-serif mb-3">Precision</h3>
              <p className="text-sm text-white/60">Executing trades exactly when statistical probabilities align.</p>
            </div>
            <div className="glass-card p-8 rounded-xl text-center hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-serif mb-3">Risk Management</h3>
              <p className="text-sm text-white/60">Capital preservation is prioritized above aggressive growth.</p>
            </div>
            <div className="glass-card p-8 rounded-xl text-center hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-serif mb-3">Discipline</h3>
              <p className="text-sm text-white/60">Adhering strictly to established trading systems without emotion.</p>
            </div>
            <div className="glass-card p-8 rounded-xl text-center hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-serif mb-3">Transparency</h3>
              <p className="text-sm text-white/60">Clear communication of objectives, performance, and risk to all partners.</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-12 rounded-2xl max-w-4xl mx-auto text-center border-t-4 border-t-primary">
          <h2 className="text-3xl font-serif mb-6">Company Timeline</h2>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 hidden md:block -z-10"></div>
            
            <div className="bg-[#111] px-4">
              <div className="text-primary font-bold text-xl mb-2">2011</div>
              <div className="text-white/60 text-sm">Founded by<br/>Mr. Rahil Pasha</div>
            </div>
            <div className="bg-[#111] px-4">
              <div className="text-primary font-bold text-xl mb-2">2015</div>
              <div className="text-white/60 text-sm">XAUUSD<br/>Specialization</div>
            </div>
            <div className="bg-[#111] px-4">
              <div className="text-primary font-bold text-xl mb-2">2020</div>
              <div className="text-white/60 text-sm">Institutional<br/>Capital Entry</div>
            </div>
            <div className="bg-[#111] px-4">
              <div className="text-primary font-bold text-xl mb-2">Present</div>
              <div className="text-white/60 text-sm">14+ Years<br/>Excellence</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}