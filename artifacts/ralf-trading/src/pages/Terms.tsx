import React, { useEffect } from 'react';

export default function Terms() {
  useEffect(() => {
    document.title = "Terms & Conditions | RALF Trading";
  }, []);

  return (
    <div className="pb-20 page-fade-in">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-serif mb-6">Terms & Conditions</h1>
        <div className="w-20 h-1 bg-primary mb-12"></div>
        
        <div className="glass-card p-8 md:p-12 rounded-2xl prose prose-invert max-w-none text-white/70">
          <p>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          
          <h3 className="text-primary font-serif text-2xl mt-8 mb-4">1. Agreement to Terms</h3>
          <p>
            By accessing or using the RALF Trading website and our services, you agree to be bound by these Terms & Conditions. If you disagree with any part of the terms, you may not access our services.
          </p>

          <h3 className="text-primary font-serif text-2xl mt-8 mb-4">2. Service Provision</h3>
          <p>
            RALF Trading provides proprietary trading execution and capital management services. We do not act as a broker, clearinghouse, or custodian of funds. All client capital must reside with regulated third-party brokerages.
          </p>

          <h3 className="text-primary font-serif text-2xl mt-8 mb-4">3. Power of Attorney</h3>
          <p>
            Clients participating in the Funded Account program must sign a Limited Power of Attorney (LPOA) or equivalent document provided by their broker, granting RALF Trading trade execution rights only.
          </p>

          <h3 className="text-primary font-serif text-2xl mt-8 mb-4">4. Profit Sharing and Invoicing</h3>
          <p>
            The 50/50 profit-sharing arrangement is based on net realized profits calculated at agreed intervals (weekly or monthly). The client agrees to remit the performance fee within 3 business days of receiving the invoice. Failure to do so will result in immediate suspension of trading activities.
          </p>

          <h3 className="text-primary font-serif text-2xl mt-8 mb-4">5. Intellectual Property</h3>
          <p>
            The trading strategies, algorithms, educational materials, and website content are the exclusive intellectual property of RALF Trading. They may not be reproduced, distributed, or reverse-engineered without explicit written consent.
          </p>
        </div>
      </div>
    </div>
  );
}