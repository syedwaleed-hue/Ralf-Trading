import React, { useEffect, useState, useRef } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import {
  ArrowRight,
  ChevronRight,
  Shield,
  Target,
  TrendingUp,
  Mail,
  Clock,
  Activity,
  Award,
  Zap,
  Globe,
  Users,
  Trophy,
} from "lucide-react";
import { Link } from "wouter";
import deskPhoto from "@assets/TRADING_SETUP_1782745233549.webp";
import logo from "@assets/Logo_1782745341412.webp";

// ── TradingView XAUUSD Chart ─────────────────────────────────────────────────
const TradingViewChart = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";

    const wrapper = document.createElement("div");
    wrapper.className = "tradingview-widget-container";
    wrapper.style.cssText = "height:100%;width:100%;";

    const widgetDiv = document.createElement("div");
    widgetDiv.className = "tradingview-widget-container__widget";
    widgetDiv.style.cssText = "height:calc(100% - 32px);width:100%;";

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "OANDA:XAUUSD",
      interval: "H1",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      backgroundColor: "rgba(5, 5, 5, 0.95)",
      gridColor: "rgba(212, 175, 55, 0.06)",
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      allow_symbol_change: false,
      support_host: "https://www.tradingview.com",
    });

    wrapper.appendChild(widgetDiv);
    wrapper.appendChild(script);
    container.appendChild(wrapper);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return <div ref={containerRef} style={{ height: "100%", width: "100%" }} />;
};

// ── Live XAUUSD Price Display ─────────────────────────────────────────────────
const LiveGoldPrice = () => {
  const [price, setPrice] = useState(2341.8);
  const [prev, setPrev] = useState(2341.8);
  const [dailyOpen] = useState(2328.4);

  useEffect(() => {
    const iv = setInterval(() => {
      setPrice((p) => {
        setPrev(p);
        return +(p + (Math.random() - 0.5) * 1.8).toFixed(2);
      });
    }, 1800);
    return () => clearInterval(iv);
  }, []);

  const change = +(price - dailyOpen).toFixed(2);
  const pct = +((change / dailyOpen) * 100).toFixed(2);
  const isUp = change >= 0;
  const ticked = price !== prev;
  const now = new Date();
  const hour = now.getUTCHours();
  const marketOpen = hour >= 1 && hour < 22; // Gold roughly Sun 23–Fri 22 UTC

  return (
    <div className="glass-card rounded-2xl p-8 md:p-10 border border-primary/20 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-primary/8 blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`w-2 h-2 rounded-full ${marketOpen ? "bg-green-400 animate-pulse" : "bg-red-400"}`}
            />
            <span className="text-xs uppercase tracking-[0.2em] text-white/50">
              {marketOpen ? "Market Open" : "Market Closed"}
            </span>
            <span className="text-xs text-white/30">· XAU/USD Gold Spot</span>
          </div>
          <h3 className="text-lg text-white/60 font-sans uppercase tracking-widest">
            Live Gold Price
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-white/40 bg-black/40 rounded px-3 py-1 border border-white/5">
            OANDA:XAUUSD
          </div>
          <div className="text-xs text-white/40 bg-black/40 rounded px-3 py-1 border border-white/5">
            Spread ≈ 0.30
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-8">
        {/* Price */}
        <div
          className="text-6xl md:text-7xl font-serif transition-colors duration-300"
          style={{ color: ticked ? (isUp ? "#4ade80" : "#f87171") : "#D4AF37" }}
        >
          $
          {price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>

        <div className="flex flex-col gap-2 mb-2">
          <div
            className={`text-xl font-semibold ${isUp ? "text-green-400" : "text-red-400"}`}
          >
            {isUp ? "+" : ""}
            {change.toFixed(2)}
          </div>
          <div
            className={`text-sm px-3 py-1 rounded ${isUp ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"}`}
          >
            {isUp ? "▲" : "▼"} {Math.abs(pct).toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Daily Open", value: `$${dailyOpen.toFixed(2)}` },
          { label: "Daily High", value: `$${(dailyOpen + 18.4).toFixed(2)}` },
          { label: "Daily Low", value: `$${(dailyOpen - 9.2).toFixed(2)}` },
          { label: "Session", value: "London / NY" },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-black/30 rounded-xl p-4 border border-white/5"
          >
            <div className="text-xs text-white/40 uppercase tracking-wider mb-1">
              {label}
            </div>
            <div className="text-sm font-semibold text-white/80">{value}</div>
          </div>
        ))}
      </div>

      <p className="text-xs text-white/25 mt-4">
        * Indicative price for illustrative purposes. Not a live feed. For live
        data see the chart below.
      </p>
    </div>
  );
};

// ── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ end, suffix = "", title, icon: Icon }: any) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  return (
    <div
      ref={ref}
      className="glass-card p-8 rounded-xl flex flex-col items-center text-center group hover:gold-border-hover transition-all duration-300"
    >
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <Icon className="text-primary w-8 h-8" />
      </div>
      <div className="text-4xl md:text-5xl font-serif text-white mb-2">
        {inView ? <CountUp end={end} duration={2.5} separator="," /> : "0"}
        {suffix}
      </div>
      <div className="text-white/60 text-sm uppercase tracking-widest">
        {title}
      </div>
    </div>
  );
};

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  useEffect(() => {
    document.title = "RALF Trading | Institutional XAUUSD Specialists";
  }, []);

  return (
    <div className="pb-20 page-fade-in">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 flex-grow flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full py-16">
            {/* Left: copy */}
            <div className="max-w-2xl">
              <div className="hero-item hero-item-1 mb-6">
                <span className="text-primary uppercase tracking-[0.3em] text-xs font-sans">
                  Discipline. Strategy. Consistency.
                </span>
              </div>

              <h1 className="hero-item hero-item-2 text-5xl md:text-7xl lg:text-[5.5rem] font-serif leading-[1.05] mb-8">
                We Trade.
                <br />
                <span className="gold-gradient-text">You Grow.</span>
              </h1>

              <p className="hero-item hero-item-3 text-lg md:text-xl text-white/65 mb-10 max-w-xl leading-relaxed">
                RALF Trading is a proprietary trading firm built on
                institutional knowledge, advanced risk management, and
                data-driven execution.
              </p>

              <div className="hero-item hero-item-4 flex flex-col sm:flex-row gap-4">
                <Link href="/funded-accounts">
                  <span className="px-8 py-4 bg-primary text-black font-semibold uppercase tracking-wider text-sm hover:bg-white transition-colors cursor-pointer text-center flex justify-center items-center gap-2 btn-hover">
                    Get Funded <ArrowRight size={16} />
                  </span>
                </Link>
                <Link href="/performance">
                  <span className="px-8 py-4 bg-black/40 border border-white/25 text-white hover:border-primary hover:text-primary transition-colors uppercase tracking-wider text-sm cursor-pointer text-center flex justify-center items-center gap-2 btn-hover">
                    View Performance <TrendingUp size={16} />
                  </span>
                </Link>
              </div>
            </div>

            {/* Right: logo */}
            <div className="hero-item hero-item-5 flex justify-center items-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-[90px]" />
                <img
                  src={logo}
                  alt="RALF Trading"
                  className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px] object-contain drop-shadow-[0_0_50px_rgba(212,175,55,0.35)] animate-[spin_60s_linear_infinite]"
                  style={{ animationDuration: "60s" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="container mx-auto px-6 relative z-10 pb-10 pt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-8">
            {[
              { value: "20K+", label: "Traders Funded", icon: Users },
              { value: "150M+", label: "Payouts Processed", icon: Trophy },
              { value: "99.7%", label: "Uptime", icon: Shield },
              { value: "14+", label: "Years in Business", icon: Clock },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 md:gap-4"
              >
                <stat.icon className="text-primary w-5 h-5 md:w-6 md:h-6 shrink-0" />
                <div>
                  <div className="text-xl md:text-2xl font-serif text-white">
                    {stat.value}
                  </div>
                  <div className="text-[10px] md:text-xs text-white/50 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── Stats ── */}
      <section className="py-20 relative z-10 border-y border-white/5 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard end={2011} title="Founded" icon={Clock} />
            <StatCard end={14} suffix="+" title="Years in Gold" icon={Award} />
            <StatCard end={1} title="Instrument: XAUUSD" icon={Target} />
            <StatCard end={100} suffix="%" title="Risk Managed" icon={Shield} />
          </div>
        </div>
      </section>
      {/* ── About ── */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-primary" />
                <span className="text-primary uppercase tracking-widest text-sm">
                  About RALF Trading
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif mb-8">
                The Gold Standard of Institutional Trading
              </h2>
              <div className="glass-card p-8 md:p-10 rounded-2xl border-l-4 border-l-primary relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
                <p className="text-lg text-white/80 leading-relaxed mb-6">
                  Founded in 2011 by Mr. Rahil Pasha, RALF Trading has built its
                  reputation through an unwavering focus on a single instrument:
                  XAUUSD. We do not diversify across markets. We master one.
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                  Through years of research, disciplined execution and
                  structured risk management, we have cultivated a deep
                  understanding of Gold's behaviour, liquidity patterns and
                  macroeconomic drivers that few can match.
                </p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-2 relative">
              <div className="absolute inset-0 gold-glow opacity-20 rounded-2xl" />
              <img
                src={deskPhoto}
                alt="RALF Trading Desk"
                className="rounded-xl w-full h-[500px] object-cover filter contrast-125 brightness-90"
              />
            </div>
          </div>
        </div>
      </section>
      {/* ── Live Gold Market ── */}
      <section className="py-20 relative z-10 bg-[#070707] border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-primary" />
              <span className="text-primary uppercase tracking-[0.2em] text-xs">
                Live Market
              </span>
              <div className="h-px w-12 bg-primary" />
            </div>
            <h2 className="text-4xl font-serif mb-3">Gold Market Dashboard</h2>
            <p className="text-white/40 text-sm uppercase tracking-widest">
              XAUUSD · Spot Gold · The Only Instrument We Trade
            </p>
          </div>

          {/* Live price display */}
          <div className="mb-8">
            <LiveGoldPrice />
          </div>

          {/* TradingView chart */}
          <div
            className="glass-card rounded-2xl overflow-hidden border border-primary/15"
            style={{ height: "560px" }}
          >
            <TradingViewChart />
          </div>

          {/* Gold statistics below chart */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="glass-card p-8 rounded-xl text-center border border-primary/10">
              <div className="text-xs text-white/40 uppercase tracking-widest mb-2">
                Daily Return Objective
              </div>
              <div className="text-4xl font-serif text-primary">~2.0%</div>
              <div className="text-xs text-white/30 mt-2">
                Target — not guaranteed
              </div>
            </div>
            <div className="glass-card p-8 rounded-xl text-center">
              <div className="text-xs text-white/40 uppercase tracking-widest mb-2">
                Max Daily Drawdown Limit
              </div>
              <div className="text-4xl font-serif text-red-400">4.0%</div>
              <div className="text-xs text-white/30 mt-2">
                Hard stop — capital preservation
              </div>
            </div>
            <div className="glass-card p-8 rounded-xl text-center">
              <div className="text-xs text-white/40 uppercase tracking-widest mb-2">
                Profit Share Model
              </div>
              <div className="text-4xl font-serif">50 / 50</div>
              <div className="text-xs text-white/30 mt-2">
                Investor / RALF Trading split
              </div>
            </div>
          </div>

          <p className="text-xs text-white/25 text-center mt-6">
            * All return targets represent objectives based on historical
            modelling and are not guarantees of future performance.
          </p>
        </div>
      </section>
      {/* ── Mastering XAUUSD ── */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-primary" />
              <span className="text-primary uppercase tracking-[0.2em] text-xs">
                Our Edge
              </span>
              <div className="h-px w-12 bg-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">
              Mastering <span className="gold-gradient-text">XAUUSD</span>
            </h2>
            <p className="text-lg text-white/60 leading-relaxed">
              Gold is not just another trading instrument. It is a sovereign
              asset, a macroeconomic barometer, and the world's ultimate store
              of value. We have spent over a decade understanding every nuance
              of its behaviour.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="glass-card p-10 rounded-2xl hover:gold-border-hover transition-colors border border-white/5">
              <h3 className="text-2xl font-serif mb-6 text-primary">
                Why Only Gold?
              </h3>
              <p className="text-white/65 leading-relaxed mb-6">
                Most traders spread their attention across dozens of instruments
                and master none. We made a different choice: deep specialisation
                in XAUUSD. This single-instrument focus allows us to develop
                pattern recognition, timing precision, and risk intuition that
                generalists cannot replicate.
              </p>
              <p className="text-white/65 leading-relaxed">
                XAUUSD is one of the most liquid, globally significant
                instruments — driven by central bank policy, inflation data,
                geopolitical risk and dollar strength. Once its behaviour is
                mastered, it offers highly reliable, repeatable intraday
                opportunities.
              </p>
            </div>

            <div className="space-y-5">
              {[
                {
                  icon: Activity,
                  title: "Structured Execution",
                  desc: "Precision entries based on liquidity analysis, institutional footprints and session timing in the Gold market.",
                },
                {
                  icon: Shield,
                  title: "Hard Risk Controls",
                  desc: "A 4% maximum daily drawdown limit is enforced without exception. Capital preservation always comes first.",
                },
                {
                  icon: TrendingUp,
                  title: "Consistent Objectives",
                  desc: "A systematic approach targeting ~2% daily return, driven by process rather than intuition or market sentiment.",
                },
                {
                  icon: Zap,
                  title: "Macro Intelligence",
                  desc: "Deep understanding of how NFP, CPI, FOMC and geopolitical events move Gold, allowing us to position with conviction.",
                },
                {
                  icon: Globe,
                  title: "Session Mastery",
                  desc: "Specialised knowledge of Gold behaviour across Asian, London and New York sessions — each with distinct liquidity profiles.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="glass-card p-5 rounded-xl flex items-start gap-4 hover:gold-border-hover transition-colors"
                >
                  <div className="mt-0.5 bg-primary/10 p-2 rounded-lg text-primary shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4 className="font-serif text-base mb-1">{title}</h4>
                    <p className="text-white/55 text-sm leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ── Services ── */}
      <section className="py-20 relative z-10 bg-[#070707] border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-4xl font-serif">Our Expertise</h2>
            <Link href="/solutions">
              <span className="text-primary hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-sm uppercase tracking-wider hidden md:flex">
                View All Solutions <ChevronRight size={16} />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "XAUUSD Proprietary Trading",
                desc: "Trading firm capital exclusively in the Gold market using advanced technical models, institutional analysis and strict risk parameters.",
              },
              {
                title: "Funded Account Management",
                desc: "We trade your brokerage account directly on XAUUSD. You retain full custody. Profits split 50/50 on a high-water mark basis.",
              },
              {
                title: "Institutional Capital Management",
                desc: "Bespoke Gold trading mandates for high-net-worth and institutional allocators. Custom risk parameters and drawdown limits.",
              },
              {
                title: "Gold Market Analysis",
                desc: "Deep technical and macroeconomic analysis focused exclusively on XAU/USD — liquidity, sentiment, and session structure.",
              },
              {
                title: "Gold Trading Education",
                desc: "Professional development for serious traders seeking mastery of XAUUSD price action, risk management and systematic execution.",
              },
              {
                title: "Investor Solutions",
                desc: "Bespoke structures aligned with your risk tolerance and return objectives — all exclusively executed in the Gold market.",
              },
            ].map((service, i) => (
              <div
                key={i}
                className="glass-card p-8 rounded-xl group hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-10 h-10 bg-primary/8 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-150 transition-transform" />
                </div>
                <h3 className="text-xl font-serif mb-3 text-white group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── Trading Desk ── */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-primary" />
            <span className="text-primary uppercase tracking-[0.2em] text-xs">
              Behind the Desk
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif mb-12">
            Inside Our Gold Trading Desk
          </h2>
          <div className="glass-card p-4 md:p-6 rounded-2xl max-w-5xl mx-auto gold-glow">
            <img
              src={deskPhoto}
              alt="RALF Trading Desk"
              className="w-full h-auto rounded-xl filter contrast-125 mb-8"
            />
            <p className="text-lg text-white/75 max-w-3xl mx-auto px-4 pb-4 leading-relaxed">
              Every XAUUSD trade executed by RALF Trading is supported by
              professional multi-monitor systems, real-time macroeconomic feeds,
              Gold-specific analysis tools and disciplined risk management
              procedures developed over 14 years of exclusive focus on the Gold
              market.
            </p>
          </div>
        </div>
      </section>
      {/* ── Testimonials ── */}
      <section className="py-20 relative z-10 bg-[#070707] border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-12 justify-center">
            <div className="h-px w-12 bg-primary" />
            <span className="text-primary uppercase tracking-widest text-sm">
              Investor Relations
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                initials: "A.R.",
                type: "Institutional Allocator",
                quote:
                  "The discipline of focusing solely on XAUUSD is what sets RALF Trading apart. There is no noise — only Gold, executed with precision.",
              },
              {
                initials: "M.K.",
                type: "Private Client",
                quote:
                  "Transparent, structured and consistently professional. The Gold-only mandate gave me confidence in their depth of expertise.",
              },
              {
                initials: "S.P.",
                type: "Funded Account Partner",
                quote:
                  "RALF's XAUUSD strategy delivered results that aligned with the objectives outlined during onboarding. The process is genuine.",
              },
              {
                initials: "F.H.",
                type: "Capital Allocator",
                quote:
                  "I appreciated the performance-based model and the exclusive focus on Gold. Alignment of incentives done correctly.",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="glass-card p-8 rounded-xl border border-white/5"
              >
                <p className="text-white/65 italic mb-8 leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-serif font-bold text-sm">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-white/80 text-sm">
                      {t.initials}
                    </div>
                    <div className="text-xs text-white/35">{t.type}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── Contact ── */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif mb-4">
                Partner in <span className="gold-gradient-text">Gold</span>
              </h2>
              <p className="text-white/55 mb-10 text-lg leading-relaxed">
                Connect with a firm whose entire operation — every analysis,
                every trade, every risk decision — is focused exclusively on
                XAUUSD.
              </p>

              <div className="space-y-5">
                <a
                  href="mailto:support@ralfstrading.com"
                  className="flex items-center gap-4 glass-card p-6 rounded-xl hover:border-primary transition-colors group"
                >
                  <div className="bg-primary/10 p-4 rounded-full group-hover:bg-primary/20 transition-colors">
                    <Mail className="text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 mb-1 uppercase tracking-wider">
                      Email
                    </div>
                    <div className="text-white group-hover:text-primary transition-colors">
                      support@ralfstrading.com
                    </div>
                  </div>
                </a>

                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 glass-card p-6 rounded-xl hover:border-[#25D366] transition-colors group"
                >
                  <div className="bg-[#25D366]/10 p-4 rounded-full group-hover:bg-[#25D366]/20 transition-colors">
                    <svg
                      className="w-6 h-6 text-[#25D366]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-white/40 mb-1 uppercase tracking-wider">
                      WhatsApp
                    </div>
                    <div className="text-white group-hover:text-[#25D366] transition-colors">
                      Direct Message
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="glass-card p-8 md:p-10 rounded-2xl border border-white/5">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs text-white/40 uppercase tracking-widest">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-black/50 border border-white/8 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/40 uppercase tracking-widest">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-black/50 border border-white/8 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-white/40 uppercase tracking-widest">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full bg-black/50 border border-white/8 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-white/40 uppercase tracking-widest">
                    Inquiry
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-black/50 border border-white/8 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-black font-semibold uppercase tracking-widest py-4 hover:bg-white transition-colors"
                >
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
