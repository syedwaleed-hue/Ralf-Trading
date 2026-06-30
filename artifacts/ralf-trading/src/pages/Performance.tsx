import React, { useEffect, useRef } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

// ── TradingView XAUUSD Performance Chart ────────────────────────────────────
const TradingViewMiniChart = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'height:100%;width:100%;';

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: 'OANDA:XAUUSD',
      interval: 'W',
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      backgroundColor: 'rgba(5, 5, 5, 0.95)',
      gridColor: 'rgba(212, 175, 55, 0.06)',
      hide_top_toolbar: false,
      save_image: false,
      allow_symbol_change: false,
      support_host: 'https://www.tradingview.com',
    });

    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.style.cssText = 'height:calc(100% - 32px);width:100%;';

    wrapper.appendChild(widgetDiv);
    wrapper.appendChild(script);
    container.appendChild(wrapper);

    return () => { container.innerHTML = ''; };
  }, []);

  return <div ref={containerRef} style={{ height: '100%', width: '100%' }} />;
};

// ── Simulated monthly return data ────────────────────────────────────────────
const monthlyData = [
  { month: 'Jan', return: 12.4, target: 10 },
  { month: 'Feb', return: 15.2, target: 10 },
  { month: 'Mar', return: 8.7,  target: 10 },
  { month: 'Apr', return: 18.1, target: 10 },
  { month: 'May', return: 14.5, target: 10 },
  { month: 'Jun', return: 22.3, target: 10 },
];

export default function Performance() {
  useEffect(() => {
    document.title = 'Gold Performance | RALF Trading';
  }, []);

  return (
    <div className="pb-20 page-fade-in">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-primary" />
            <span className="text-primary uppercase tracking-[0.2em] text-xs">XAUUSD Exclusive</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif mb-3">Gold Performance & Metrics</h1>
          <div className="w-20 h-1 bg-primary mb-4" />
          <p className="text-white/50 max-w-2xl leading-relaxed">
            All performance data, figures and objectives below relate exclusively to XAUUSD (Gold Spot) trading. We trade no other instrument.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="glass-card p-8 rounded-xl border border-primary/20">
            <div className="text-xs text-white/40 uppercase tracking-widest mb-2">Target Win Rate · XAUUSD</div>
            <div className="text-4xl font-serif text-primary">68.5%</div>
            <div className="text-xs text-white/35 mt-2">Objective based on historical Gold system modelling</div>
          </div>
          <div className="glass-card p-8 rounded-xl">
            <div className="text-xs text-white/40 uppercase tracking-widest mb-2">Target Profit Factor</div>
            <div className="text-4xl font-serif">1.85</div>
            <div className="text-xs text-white/35 mt-2">Average winner vs. average loser ratio target in Gold</div>
          </div>
          <div className="glass-card p-8 rounded-xl">
            <div className="text-xs text-white/40 uppercase tracking-widest mb-2">Max Daily Drawdown Limit</div>
            <div className="text-4xl font-serif text-red-400">4.0%</div>
            <div className="text-xs text-white/35 mt-2">Hard stop parameter — capital preservation first</div>
          </div>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Simulation chart */}
          <div className="lg:col-span-2 glass-card p-8 rounded-2xl">
            <h3 className="text-xl font-serif mb-2">XAU/USD Return Objectives vs Targets</h3>
            <p className="text-xs text-white/35 mb-6 uppercase tracking-wider">Illustrative simulation — not live data</p>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorReturn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#555" tick={{ fill: '#888', fontSize: 12 }} />
                  <YAxis stroke="#555" tick={{ fill: '#888', fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0d0d0d', borderColor: '#D4AF37', borderRadius: '8px' }}
                    itemStyle={{ color: '#D4AF37' }}
                    labelStyle={{ color: '#888' }}
                  />
                  <Area type="monotone" dataKey="return" stroke="#D4AF37" fillOpacity={1} fill="url(#colorReturn)" name="XAUUSD %" strokeWidth={2} />
                  <Area type="monotone" dataKey="target" stroke="#555" fill="none" strokeDasharray="5 5" name="Target %" strokeWidth={1.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-white/30 mt-4 text-center">
              Illustrative objective curves for XAUUSD only. Not a record of actual trading results.
            </p>
          </div>

          {/* Focus card */}
          <div className="glass-card p-8 rounded-2xl border border-primary/15">
            <h3 className="text-xl font-serif mb-2">Trading Focus</h3>
            <p className="text-xs text-white/35 uppercase tracking-wider mb-8">Instrument allocation</p>

            {/* Single instrument — 100% */}
            <div className="flex flex-col items-center justify-center gap-6 py-4">
              <div className="relative w-36 h-36">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1a1a1a" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="15.9" fill="none"
                    stroke="#D4AF37" strokeWidth="3"
                    strokeDasharray="100 0"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-serif text-primary">100%</span>
                </div>
              </div>

              <div className="text-center">
                <div className="text-lg font-serif text-primary mb-1">XAU / USD</div>
                <div className="text-sm text-white/50">Gold Spot · Only Instrument</div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-black/40 rounded-lg border border-primary/10">
              <p className="text-sm text-white/55 leading-relaxed text-center">
                100% of our trading activity is conducted exclusively in XAUUSD. This absolute focus enables deep specialisation and mastery of Gold's unique price dynamics.
              </p>
            </div>
          </div>
        </div>

        {/* Live TradingView Gold Chart */}
        <div className="mb-12">
          <h3 className="text-2xl font-serif mb-2">Live XAUUSD Market Chart</h3>
          <p className="text-xs text-white/35 uppercase tracking-wider mb-6">Weekly timeframe · OANDA:XAUUSD · TradingView</p>
          <div
            className="glass-card rounded-2xl overflow-hidden border border-primary/15"
            style={{ height: '520px' }}
          >
            <TradingViewMiniChart />
          </div>
        </div>

        {/* Gold statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Daily Return Objective', value: '~2.0%', note: 'Target — not guaranteed' },
            { label: 'Profit Share', value: '50 / 50', note: 'Investor / RALF Trading' },
            { label: 'Position Risk per Trade', value: '≤1.0%', note: 'Max risk on any single trade' },
            { label: 'Instrument', value: 'XAU/USD', note: 'Gold Spot — exclusively' },
          ].map(({ label, value, note }) => (
            <div key={label} className="glass-card p-6 rounded-xl text-center border border-white/5">
              <div className="text-xs text-white/35 uppercase tracking-wider mb-2">{label}</div>
              <div className="text-2xl font-serif text-primary mb-1">{value}</div>
              <div className="text-xs text-white/30">{note}</div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="bg-primary/5 border border-primary/15 p-6 rounded-xl">
          <h4 className="text-primary font-serif mb-2">Important Notice Regarding Performance</h4>
          <p className="text-sm text-white/65 leading-relaxed">
            Trading XAUUSD (Gold Spot) on margin carries a high level of risk and may not be suitable for all investors. Past performance is not indicative of future results. All performance metrics, charts, objectives and figures shown above represent targets and historical system models — they do not guarantee future returns. The high degree of leverage available in Gold trading can work against you as well as for you. Do not allocate capital you cannot afford to lose.
          </p>
        </div>
      </div>
    </div>
  );
}
