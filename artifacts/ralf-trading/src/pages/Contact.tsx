import React, { useEffect } from 'react';
import { Mail, MapPin, Globe } from 'lucide-react';

export default function Contact() {
  useEffect(() => {
    document.title = "Contact | RALF Trading";
  }, []);

  return (
    <div className="pb-20 page-fade-in">
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <h1 className="text-5xl md:text-6xl font-serif mb-6 text-center">Contact Us</h1>
        <div className="w-20 h-1 bg-primary mx-auto mb-16"></div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Info Side */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl font-serif mb-4">Let's Discuss Your Capital</h2>
              <p className="text-white/60 leading-relaxed mb-8 text-sm">
                Whether you are seeking funded account management, institutional portfolio solutions, or trading education, our team is ready to assist.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full mt-1">
                  <Mail className="text-primary w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg mb-1">Email</h4>
                  <a href="mailto:support@ralfstrading.com" className="text-white/60 hover:text-primary transition-colors text-sm">
                    support@ralfstrading.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full mt-1">
                  <Globe className="text-primary w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg mb-1">Global Operation</h4>
                  <p className="text-white/60 text-sm">
                    Executing trades across global market sessions.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <p className="text-xs text-white/40 leading-relaxed">
                Response times typically range from 24-48 business hours. For urgent matters regarding existing funded accounts, please use the direct WhatsApp line provided during onboarding.
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-3 glass-card p-8 md:p-10 rounded-2xl border-t-4 border-t-primary">
            <h3 className="text-2xl font-serif mb-8 text-white">Send an Inquiry</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-white/50 uppercase tracking-widest">First Name *</label>
                  <input required type="text" className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-white/50 uppercase tracking-widest">Last Name *</label>
                  <input required type="text" className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-white/50 uppercase tracking-widest">Email Address *</label>
                  <input required type="email" className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-white/50 uppercase tracking-widest">Subject</label>
                  <select className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none">
                    <option>Funded Account Management</option>
                    <option>Institutional Capital</option>
                    <option>Trading Education</option>
                    <option>General Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-white/50 uppercase tracking-widest">Message *</label>
                <textarea required rows={5} className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
              </div>

              <button type="submit" className="w-full bg-primary text-black font-semibold uppercase tracking-widest py-4 hover:bg-white transition-colors">
                Submit Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}