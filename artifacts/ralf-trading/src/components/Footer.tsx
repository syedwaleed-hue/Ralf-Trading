import React from 'react';
import { Link } from 'wouter';
import { FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import logo from '@assets/Logo_1782745341412.webp';

export const Footer = () => {
  return (
    <footer className="relative z-10 bg-[#0a0a0a] border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <img src={logo} alt="RALF Trading" className="w-40 mb-6" />
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Proprietary Trading & Capital Management. <br/>Founded 2011.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/60 hover:text-primary transition-colors"><FaLinkedin size={20} /></a>
              <a href="#" className="text-white/60 hover:text-primary transition-colors"><FaTwitter size={20} /></a>
              <a href="#" className="text-white/60 hover:text-primary transition-colors"><FaInstagram size={20} /></a>
              <a href="#" className="text-white/60 hover:text-primary transition-colors"><FaYoutube size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif text-xl text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/about"><span className="text-white/60 hover:text-primary transition-colors cursor-pointer text-sm">About Us</span></Link></li>
              <li><Link href="/solutions"><span className="text-white/60 hover:text-primary transition-colors cursor-pointer text-sm">Investment Solutions</span></Link></li>
              <li><Link href="/funded-accounts"><span className="text-white/60 hover:text-primary transition-colors cursor-pointer text-sm">Funded Accounts</span></Link></li>
              <li><Link href="/performance"><span className="text-white/60 hover:text-primary transition-colors cursor-pointer text-sm">Performance</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl text-white mb-6">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/risk-disclosure"><span className="text-white/60 hover:text-primary transition-colors cursor-pointer text-sm">Risk Disclosure</span></Link></li>
              <li><Link href="/privacy"><span className="text-white/60 hover:text-primary transition-colors cursor-pointer text-sm">Privacy Policy</span></Link></li>
              <li><Link href="/terms"><span className="text-white/60 hover:text-primary transition-colors cursor-pointer text-sm">Terms & Conditions</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl text-white mb-6">Contact</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>Email: <a href="mailto:support@ralfstrading.com" className="hover:text-primary transition-colors">support@ralfstrading.com</a></li>
            </ul>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-8"></div>
        
        <div className="text-center">
          <p className="text-xs text-white/40 leading-relaxed max-w-4xl mx-auto mb-6">
            <strong>RISK DISCLAIMER:</strong> Trading and investing involve significant risk. Past performance is not indicative of future results. Any return targets stated on this website represent objectives and are not guarantees of future performance. Investors should carefully assess the risks before participating.
          </p>
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} RALF Trading. All rights reserved.
          </p>
        </div>
      </div>
      
      {/* Floating WhatsApp */}
      <a 
        href="https://wa.me/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform"
      >
        <FaWhatsapp size={28} />
      </a>
    </footer>
  );
};

export default Footer;