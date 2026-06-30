import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How do funded accounts work?',
    a: 'You open an account with a regulated broker in your name and deposit your funds. You grant RALF Trading a Limited Power of Attorney (LPOA) that allows us to trade the account on XAUUSD via MT4/MT5. We cannot withdraw or transfer your funds. Profits are split according to our agreement.',
  },
  {
    q: 'How is profit shared?',
    a: 'We operate on a strict 50/50 profit-sharing model for funded accounts. Performance fees are calculated based on high-water marks to ensure we only get paid when your account grows.',
  },
  {
    q: 'What is the minimum investment?',
    a: 'Minimum capital requirements vary based on the solution chosen (Funded Account vs Institutional Capital Management). Please contact our team to discuss the specific tiers and requirements for onboarding.',
  },
  {
    q: 'How is risk managed?',
    a: 'Capital preservation is our primary mandate. We employ strict algorithmic and manual risk controls on every XAUUSD trade, including hard daily drawdown limits (4%), strict position sizing (never risking more than 0.5–1% per trade), and no exposure to any other instrument.',
  },
  {
    q: 'When and how are withdrawals processed?',
    a: 'Since you retain full custody of your brokerage account, you control withdrawals. However, to maintain the integrity of the trading strategy and margin requirements, we request that withdrawals be coordinated with our team at the end of the trading month.',
  },
  {
    q: 'What markets do you trade?',
    a: 'We trade exclusively XAUUSD — Gold Spot. This is not a limitation; it is our defining competitive advantage. 100% of our research, analysis, systems and risk management are built around the Gold market. We have no exposure to any other instrument, currency pair, index or asset class.',
  },
  {
    q: 'Are returns guaranteed?',
    a: 'Absolutely not. Any stated return figures (e.g., ~2% daily objective) are targets based on historical Gold market modelling and risk parameters. Trading XAUUSD carries significant risk of loss. We guarantee discipline and adherence to our process — we cannot guarantee market outcomes.',
  },
  {
    q: 'Why do you trade only Gold (XAUUSD)?',
    a: 'Deep specialisation is our edge. Rather than spreading attention and capital across many instruments and mastering none, we have spent over 14 years developing unparalleled expertise in XAUUSD. Gold is one of the most liquid, globally significant financial instruments — driven by central bank policy, inflation data, geopolitical risk and dollar dynamics. When you master one instrument completely, your execution precision, risk intuition and pattern recognition become far superior to generalists.',
  },
  {
    q: 'How do I get started?',
    a: 'Begin by submitting an inquiry through our Contact page. Our team will schedule an initial consultation to discuss your capital, risk tolerance, and determine if our XAUUSD trading approach aligns with your investment objectives.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    document.title = 'FAQ | RALF Trading';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="pb-20"
    >
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-10 bg-primary" />
          <span className="text-primary uppercase tracking-[0.2em] text-xs">XAUUSD Specialists</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-serif mb-4 text-center">Frequently Asked Questions</h1>
        <p className="text-center text-white/40 text-sm mb-4">All answers relate exclusively to our XAUUSD trading operations.</p>
        <div className="w-20 h-1 bg-primary mx-auto mb-16" />

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="glass-card rounded-xl overflow-hidden border border-white/5">
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`font-serif text-lg transition-colors ${openIndex === index ? 'text-primary' : 'text-white'}`}>
                  {faq.q}
                </span>
                <ChevronDown
                  className={`text-white/40 transition-transform duration-300 shrink-0 ml-4 ${openIndex === index ? 'rotate-180 text-primary' : ''}`}
                  size={20}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-white/60 leading-relaxed text-sm border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-white/40 mb-4">Still have questions about our Gold trading approach?</p>
          <a
            href="mailto:support@ralfstrading.com"
            className="text-primary hover:text-white uppercase tracking-widest text-sm transition-colors border-b border-primary hover:border-white pb-1"
          >
            Contact Our Team
          </a>
        </div>
      </div>
    </motion.div>
  );
}
