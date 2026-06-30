import React, { useEffect } from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

export default function FundedAccounts() {
  useEffect(() => {
    document.title = "Funded Accounts | RALF Trading";
  }, []);

  return (
    <div className="pb-20 page-fade-in">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif mb-6">Funded Account Management</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-white/70 leading-relaxed">
            A transparent, performance-aligned partnership where you maintain control of the capital, and we provide the execution edge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="glass-card p-10 rounded-2xl">
            <h2 className="text-2xl font-serif text-primary mb-6">The Model</h2>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg text-white mb-2 font-semibold">1. Account Custody</h4>
                <p className="text-sm text-white/60">The investor opens and funds an account with an approved, regulated broker. You retain sole withdrawal rights and total control of the capital.</p>
              </div>
              <div>
                <h4 className="text-lg text-white mb-2 font-semibold">2. Limited Power of Attorney (LPOA)</h4>
                <p className="text-sm text-white/60">RALF Trading is granted trading-only access via MT4/MT5. We cannot deposit, withdraw, or transfer funds.</p>
              </div>
              <div>
                <h4 className="text-lg text-white mb-2 font-semibold">3. Execution</h4>
                <p className="text-sm text-white/60">Our desk executes the strategy, targeting an approximate 2% daily return objective subject to market conditions.</p>
              </div>
              <div>
                <h4 className="text-lg text-white mb-2 font-semibold">4. Profit Sharing</h4>
                <p className="text-sm text-white/60">Profits generated are split 50/50 between the investor and RALF Trading, settled weekly or monthly.</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="glass-card p-8 rounded-xl border border-primary/30 bg-primary/5">
              <h3 className="text-xl font-serif text-primary mb-4">Target Objectives</h3>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl font-serif">~2%</span>
                <span className="text-white/60 pb-1 uppercase tracking-wider text-sm">Daily Return Target</span>
              </div>
              <p className="text-xs text-white/40 mt-4">* Targets are objectives based on historical modeling and risk parameters. They do not constitute guarantees of future performance.</p>
            </div>

            <div className="glass-card p-8 rounded-xl">
              <h3 className="text-xl font-serif mb-6">Requirements</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} />
                  <span className="text-sm text-white/80">Minimum account size requirements apply (contact for tiers)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} />
                  <span className="text-sm text-white/80">Use of A-Book, raw spread/ECN broker accounts</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} />
                  <span className="text-sm text-white/80">Agreement to strict LPOA and profit-sharing terms</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} />
                  <span className="text-sm text-white/80">Understanding of risk disclosure</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-serif mb-6">Ready to Partner?</h2>
          <Link href="/contact">
            <button className="px-8 py-4 bg-primary text-black font-semibold uppercase tracking-widest hover:bg-white transition-colors">
              Begin Onboarding Process
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}