import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@assets/Logo_1782745341412.webp';
import { Shield } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    document.title = isLogin ? "Client Portal Login | RALF Trading" : "Register | RALF Trading";
  }, [isLogin]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[80vh] flex items-center justify-center p-6"
    >
      <div className="w-full max-w-5xl glass-card rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl border-white/10">
        
        {/* Brand Side */}
        <div className="w-full md:w-5/12 bg-[#050505] p-12 flex flex-col justify-between relative border-r border-white/5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px]"></div>
          
          <div>
            <img src={logo} alt="RALF Trading" className="w-32 mb-12" />
            <h2 className="text-3xl font-serif mb-4 leading-tight">Client Portal</h2>
            <p className="text-sm text-white/60 leading-relaxed mb-8">
              Access your performance dashboards, accounting reports, and direct communication channels.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-primary w-5 h-5" />
              <span className="text-xs uppercase tracking-widest text-primary">Secure Access</span>
            </div>
            <p className="text-xs text-white/40 italic">
              "Discipline is doing what you hate to do, but doing it like you love it."
            </p>
          </div>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-7/12 p-12 bg-[#0a0a0a]">
          <div className="flex gap-8 border-b border-white/10 mb-8 pb-4">
            <button 
              onClick={() => setIsLogin(true)}
              className={`text-lg font-serif transition-colors relative ${isLogin ? 'text-primary' : 'text-white/50 hover:text-white'}`}
            >
              Login
              {isLogin && <motion.div layoutId="underline" className="absolute -bottom-4 left-0 right-0 h-0.5 bg-primary" />}
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`text-lg font-serif transition-colors relative ${!isLogin ? 'text-primary' : 'text-white/50 hover:text-white'}`}
            >
              Register Request
              {!isLogin && <motion.div layoutId="underline" className="absolute -bottom-4 left-0 right-0 h-0.5 bg-primary" />}
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.form 
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
              onSubmit={(e) => e.preventDefault()}
            >
              {!isLogin && (
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs text-white/50 uppercase tracking-widest">First Name</label>
                    <input type="text" className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/50 uppercase tracking-widest">Last Name</label>
                    <input type="text" className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs text-white/50 uppercase tracking-widest">Email Address</label>
                <input type="email" className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs text-white/50 uppercase tracking-widest">Password</label>
                  {isLogin && <a href="#" className="text-xs text-primary hover:underline">Forgot?</a>}
                </div>
                <input type="password" className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
              </div>

              {!isLogin && (
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 text-xs text-white/70 leading-relaxed">
                  Registration creates a portal request. Full access is granted only after identity verification and onboarding completion by our compliance team.
                </div>
              )}

              <button type="submit" className="w-full bg-primary text-black font-semibold uppercase tracking-widest py-4 hover:bg-white transition-colors mt-8">
                {isLogin ? 'Enter Portal' : 'Submit Request'}
              </button>
            </motion.form>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}