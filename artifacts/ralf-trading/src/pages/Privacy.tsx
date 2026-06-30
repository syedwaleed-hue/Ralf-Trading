import React, { useEffect } from 'react';

export default function Privacy() {
  useEffect(() => {
    document.title = "Privacy Policy | RALF Trading";
  }, []);

  return (
    <div className="pb-20 page-fade-in">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-serif mb-6">Privacy Policy</h1>
        <div className="w-20 h-1 bg-primary mb-12"></div>
        
        <div className="glass-card p-8 md:p-12 rounded-2xl prose prose-invert max-w-none text-white/70">
          <p>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          
          <h3 className="text-primary font-serif text-2xl mt-8 mb-4">1. Information We Collect</h3>
          <p>
            We collect information you provide directly to us when you fill out a form, request a funded account partnership, or communicate with us. This may include:
          </p>
          <ul>
            <li>Identity Data (Name, contact details)</li>
            <li>Financial Data (Trading experience, account sizes for qualification purposes)</li>
            <li>Technical Data (IP address, browser type, cookies)</li>
          </ul>

          <h3 className="text-primary font-serif text-2xl mt-8 mb-4">2. Use of Information</h3>
          <p>
            The information we collect is used strictly for internal purposes to:
          </p>
          <ul>
            <li>Evaluate eligibility for our trading programs</li>
            <li>Communicate regarding performance and account management</li>
            <li>Provide customer support</li>
            <li>Improve our website and services</li>
          </ul>

          <h3 className="text-primary font-serif text-2xl mt-8 mb-4">3. Data Protection</h3>
          <p>
            We implement high-grade security measures to maintain the safety of your personal information. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website or conducting our business, so long as those parties agree to keep this information confidential.
          </p>

          <h3 className="text-primary font-serif text-2xl mt-8 mb-4">4. Broker Integration</h3>
          <p>
            For funded account management, we only require trading credentials (MT4/MT5 login, password, and server). We do NOT request or store your brokerage portal login or withdrawal credentials.
          </p>
        </div>
      </div>
    </div>
  );
}