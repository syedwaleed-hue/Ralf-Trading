import React, { useEffect } from 'react';

export default function RiskDisclosure() {
  useEffect(() => {
    document.title = 'Risk Disclosure | RALF Trading';
  }, []);

  return (
    <div className="pb-20 page-fade-in">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-10 bg-primary" />
          <span className="text-primary uppercase tracking-[0.2em] text-xs">Legal</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif mb-4">Risk Disclosure</h1>
        <div className="w-20 h-1 bg-primary mb-12" />

        <div className="glass-card p-8 md:p-12 rounded-2xl prose prose-invert max-w-none text-white/65">
          <p className="lead text-xl text-white/85 leading-relaxed">
            Trading XAUUSD (Gold Spot) on margin carries a high level of risk and may not be suitable for all investors.
            The following disclosures apply to all services, information and investment arrangements offered by RALF Trading.
          </p>

          <h3 className="text-primary font-serif text-2xl mt-10 mb-4">1. General Risk Warning</h3>
          <p>
            The high degree of leverage associated with XAUUSD trading can work against you as well as for you.
            Gold is a highly volatile instrument influenced by macroeconomic data releases, central bank policy,
            geopolitical events, and global currency dynamics. Before deciding to allocate capital to RALF Trading,
            you should carefully consider your investment objectives, level of experience, and risk appetite.
            There is a real possibility that you could sustain a loss of some or all of your initial investment —
            you should never invest capital you cannot afford to lose.
          </p>

          <h3 className="text-primary font-serif text-2xl mt-10 mb-4">2. Exclusive XAUUSD Mandate</h3>
          <p>
            All trading conducted by RALF Trading is executed exclusively in the XAUUSD (Gold Spot) market.
            We do not trade any other instrument, currency pair, cryptocurrency, index or commodity.
            All risk disclosure, performance objectives and operational procedures described on this website
            relate solely to XAUUSD.
          </p>

          <h3 className="text-primary font-serif text-2xl mt-10 mb-4">3. Performance Objectives vs Guarantees</h3>
          <p>
            Any return targets, performance objectives, win rates, profit factors or historical simulations
            mentioned on this website (such as a "~2% daily return objective") are strictly targets based on
            historical XAUUSD modelling and risk parameters.{' '}
            <strong className="text-white">They do not constitute guarantees of future performance.</strong>{' '}
            Past performance in the Gold market is not indicative of future results. Market conditions dictate
            actual returns, and periods of drawdown are an inevitable part of trading.
          </p>

          <h3 className="text-primary font-serif text-2xl mt-10 mb-4">4. Gold Market Liquidity and Volatility</h3>
          <p>
            XAUUSD is subject to extreme volatility caused by macroeconomic data releases (NFP, CPI, FOMC),
            geopolitical events, central bank gold reserve changes and global risk sentiment shifts.
            These factors can cause sudden, rapid price movements that may result in slippage, execution delays
            or gaps in pricing that bypass stop-loss orders. No risk management system eliminates this possibility.
          </p>

          <h3 className="text-primary font-serif text-2xl mt-10 mb-4">5. No Financial Advice</h3>
          <p>
            The content on this website is provided for informational and educational purposes only and should
            not be construed as investment advice, financial advice, or an offer or solicitation to buy or sell
            any financial instrument. RALF Trading is not acting as your fiduciary or financial advisor.
          </p>

          <h3 className="text-primary font-serif text-2xl mt-10 mb-4">6. Funded Account Custody</h3>
          <p>
            In our Funded Account Management model, you maintain custody of your capital at a third-party
            brokerage. RALF Trading assumes no liability for the solvency, execution quality or operational
            integrity of your chosen broker. You bear the counterparty risk associated with your broker.
          </p>
        </div>
      </div>
    </div>
  );
}
