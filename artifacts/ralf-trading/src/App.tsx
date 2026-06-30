import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { MusicProvider, useMusic } from '@/context/MusicContext';

// Components
import ThreeBackground from '@/components/ThreeBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

// Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Solutions from '@/pages/Solutions';
import FundedAccounts from '@/pages/FundedAccounts';
import Performance from '@/pages/Performance';
import Education from '@/pages/Education';
import FAQ from '@/pages/FAQ';
import Contact from '@/pages/Contact';
import Auth from '@/pages/Auth';
import RiskDisclosure from '@/pages/RiskDisclosure';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 pt-24 min-h-[calc(100vh-400px)]">
      {children}
    </div>
  );
}

function MainLayout() {
  const { hasEntered } = useMusic();

  return (
    <div className="min-h-screen text-white font-sans selection:bg-primary selection:text-black">
      {!hasEntered && <LoadingScreen />}

      {/* Only mount Three.js after entering — keeps loading screen buttery smooth */}
      {hasEntered && <ThreeBackground />}
      
      {hasEntered && (
        <>
          <Navbar />
          <Switch>
            <Route path="/" component={() => <PageWrapper><Home /></PageWrapper>} />
            <Route path="/about" component={() => <PageWrapper><About /></PageWrapper>} />
            <Route path="/solutions" component={() => <PageWrapper><Solutions /></PageWrapper>} />
            <Route path="/funded-accounts" component={() => <PageWrapper><FundedAccounts /></PageWrapper>} />
            <Route path="/performance" component={() => <PageWrapper><Performance /></PageWrapper>} />
            <Route path="/education" component={() => <PageWrapper><Education /></PageWrapper>} />
            <Route path="/faq" component={() => <PageWrapper><FAQ /></PageWrapper>} />
            <Route path="/contact" component={() => <PageWrapper><Contact /></PageWrapper>} />
            <Route path="/auth" component={() => <PageWrapper><Auth /></PageWrapper>} />
            <Route path="/risk-disclosure" component={() => <PageWrapper><RiskDisclosure /></PageWrapper>} />
            <Route path="/privacy" component={() => <PageWrapper><Privacy /></PageWrapper>} />
            <Route path="/terms" component={() => <PageWrapper><Terms /></PageWrapper>} />
            <Route component={() => <PageWrapper><NotFound /></PageWrapper>} />
          </Switch>
          <Footer />
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MusicProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <MainLayout />
        </WouterRouter>
      </MusicProvider>
    </QueryClientProvider>
  );
}

export default App;