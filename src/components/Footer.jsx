import React, { useState } from 'react';
import { ArrowRight, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { storeData } from '../data/storeData';

export default function Footer({ onSelectCategory }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#111111] text-white pt-16 pb-24 md:pb-16 px-4 md:px-8 border-t border-neutral-800 relative overflow-hidden">
      <div className="max-w-[1720px] mx-auto">
        {/* Massive Stylized Watermark Branding */}
        <div className="border-b border-neutral-800 pb-12 mb-12 select-none overflow-hidden">
          <div className="text-center font-anton text-6xl sm:text-8xl md:text-[140px] lg:text-[180px] leading-none tracking-[0.12em] text-neutral-800/60 uppercase">
            ASHISH
          </div>
          <p className="text-center font-mono text-[11px] md:text-xs text-neutral-400 tracking-[0.3em] uppercase mt-2">
            HIGH-END CONTEMPORARY STREETWEAR • EST. 2020
          </p>
        </div>

        {/* Newsletter & Club Signup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 pb-12 border-b border-neutral-800">
          <div className="lg:col-span-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-orange-500 block mb-2">
              EXCLUSIVE ACCESS
            </span>
            <h3 className="font-anton text-2xl md:text-3xl tracking-wide uppercase mb-2">
              Join the ASHISH Club
            </h3>
            <p className="text-xs md:text-sm text-neutral-400 max-w-md">
              Receive private invitations to confidential drops, editorial lookbooks, and VIP access to our flagship events.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider bg-emerald-950/40 border border-emerald-800/60 p-4 rounded-sm">
                <CheckCircle2 size={16} />
                <span>You're on the list. Welcome to the ASHISH inner circle.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-lg">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="flex-1 bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 px-4 py-3 rounded-sm text-xs font-mono focus:outline-hidden focus:border-white transition-colors"
                />
                <button
                  type="submit"
                  className="bg-white hover:bg-neutral-200 text-black font-semibold px-6 py-3 rounded-sm text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Subscribe</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-xs">
          {/* Column 1: Popular Searches */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-4 pb-1 border-b border-neutral-800">
              Popular searches
            </h4>
            <ul className="space-y-2.5">
              {storeData.footerLinks.popularSearches.map((term, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onSelectCategory(term)}
                    className="text-neutral-400 hover:text-white transition-colors text-left"
                  >
                    {term}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Connect with us */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-4 pb-1 border-b border-neutral-800">
              Connect with us
            </h4>
            <ul className="space-y-2.5">
              {storeData.footerLinks.connectWithUs.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Order Support */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-4 pb-1 border-b border-neutral-800">
              Order Support
            </h4>
            <ul className="space-y-2.5">
              {storeData.footerLinks.orderSupport.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: We are ASHISH */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-4 pb-1 border-b border-neutral-800">
              We are ASHISH
            </h4>
            <ul className="space-y-2.5">
              {storeData.footerLinks.weAreAshish.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Country Selector */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-neutral-500 font-mono text-[11px]">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} ASHISH. ALL RIGHTS RESERVED.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">HIGH FIDELITY FRONTEND IMPLEMENTATION</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-sm text-neutral-300">
              🇮🇳 INDIA (INR ₹)
            </span>
            <span className="bg-neutral-900 border border-neutral-800 px-2 py-1 rounded-sm text-neutral-400">
              UPI / CARDS / NETBANKING
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
