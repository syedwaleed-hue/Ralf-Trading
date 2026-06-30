import React, { useEffect } from 'react';
import { Briefcase, BarChart, GraduationCap, Layout } from 'lucide-react';
import { Link } from 'wouter';

export default function Solutions() {
  useEffect(() => {
    document.title = "Investment Solutions | RALF Trading";
  }, []);

  return (
    <div className="pb-20 page-fade-in">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-5xl md:text-6xl font-serif mb-6">Investment Solutions</h1>
        <div className="w-20 h-1 bg-primary mb-12"></div>
        
        <p className="text-xl text-white/70 max-w-3xl mb-16 leading-relaxed">
          We offer bespoke trading and capital management solutions designed for high-net-worth individuals, family offices, and institutional partners who understand that real wealth is built through consistent, risk-managed processes.
        </p>

        <div className="space-y-12">
          {/* Solution 1 */}
          <div className="glass-card p-10 md:p-12 rounded-2xl flex flex-col lg:flex-row gap-10 items-center">
            <div className="lg:w-1/3 flex justify-center">
              <div className="w-32 h-32 rounded-full border-4 border-primary/20 flex items-center justify-center bg-primary/5">
                <Briefcase size={48} className="text-primary" />
              </div>
            </div>
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-serif mb-4 text-primary">Proprietary Trading</h2>
              <p className="text-white/70 leading-relaxed mb-6">
                Our core operation involves trading firm capital across highly liquid markets, primarily focusing on XAUUSD. Utilizing advanced technical models, fundamental analysis, and strict risk parameters, we target steady capital appreciation regardless of market direction.
              </p>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full"></div> Intraday and swing strategies</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full"></div> algorithmic assistance for execution precision</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full"></div> Hard daily drawdown limits</li>
              </ul>
            </div>
          </div>

          {/* Solution 2 */}
          <div className="glass-card p-10 md:p-12 rounded-2xl flex flex-col lg:flex-row-reverse gap-10 items-center">
            <div className="lg:w-1/3 flex justify-center">
              <div className="w-32 h-32 rounded-full border-4 border-primary/20 flex items-center justify-center bg-primary/5">
                <BarChart size={48} className="text-primary" />
              </div>
            </div>
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-serif mb-4 text-primary">Funded Account Management</h2>
              <p className="text-white/70 leading-relaxed mb-6">
                We directly trade and manage investor-funded accounts. This model provides complete transparency, as the investor retains custody of the account. Our mandate is execution. We target an approximate 2% daily return objective, operating on a strict 50/50 profit-sharing model.
              </p>
              <Link href="/funded-accounts">
                <button className="px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-black transition-colors uppercase tracking-widest text-sm mt-2">
                  Learn More
                </button>
              </Link>
            </div>
          </div>

          {/* Solution 3 */}
          <div className="glass-card p-10 md:p-12 rounded-2xl flex flex-col lg:flex-row gap-10 items-center">
            <div className="lg:w-1/3 flex justify-center">
              <div className="w-32 h-32 rounded-full border-4 border-primary/20 flex items-center justify-center bg-primary/5">
                <Layout size={48} className="text-primary" />
              </div>
            </div>
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-serif mb-4 text-primary">Capital Management</h2>
              <p className="text-white/70 leading-relaxed mb-6">
                For larger institutional allocations, we construct bespoke trading mandates. Risk parameters, drawdown limits, and return objectives are customized to align with the overarching goals of the portfolio.
              </p>
              <Link href="/contact">
                <button className="px-6 py-3 bg-primary text-black hover:bg-white transition-colors uppercase tracking-widest text-sm mt-2 font-semibold">
                  Inquire Now
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}