import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { storeData } from '../data/storeData';

export default function BrandAccordion() {
  const [openSectionId, setOpenSectionId] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleSection = (id) => {
    setOpenSectionId(openSectionId === id ? null : id);
  };

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section className="w-full py-14 md:py-20 px-4 md:px-8 bg-[#efefef] border-t border-neutral-300">
      <div className="max-w-[1280px] mx-auto">
        {/* Editorial Heading */}
        <div className="text-center mb-12">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 block mb-2">
            BRAND MANIFESTO & PHILOSOPHY
          </span>
          <h2 className="font-anton text-2xl md:text-4xl lg:text-5xl tracking-wide uppercase text-black max-w-4xl mx-auto leading-tight">
            Feel the Luxury of Premium Streetwear with ASHISH – Best Unisex Clothing Brand in India
          </h2>
          <p className="mt-4 text-xs md:text-sm text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Streetwear has transitioned from underground subculture into global high fashion. Explore how our heavyweight custom knits and fluid silhouettes shape the Indian luxury movement.
          </p>
        </div>

        {/* 1. Brand Philosophy Collapsible Accordions */}
        <div className="space-y-3 mb-14">
          {storeData.brandEditorialSections.map((sec) => {
            const isOpen = openSectionId === sec.id;
            return (
              <div
                key={sec.id}
                className="bg-white rounded-sm border border-neutral-200/90 overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => toggleSection(sec.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-neutral-50 transition-colors"
                >
                  <span className="font-semibold text-xs md:text-sm uppercase tracking-wide text-neutral-900">
                    {sec.title}
                  </span>
                  <span className="p-1 rounded-full bg-neutral-100 text-neutral-800 shrink-0">
                    {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 whitespace-pre-line">
                    {sec.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 2. FAQs Section */}
        <div className="pt-8 border-t border-neutral-300">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle size={18} className="text-black" />
            <h3 className="font-anton text-xl md:text-2xl tracking-wider uppercase text-black">
              Frequently Asked Questions (FAQS)
            </h3>
          </div>

          <div className="space-y-3">
            {storeData.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-sm border border-neutral-200/90 overflow-hidden shadow-2xs"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 md:p-5 text-left flex items-center justify-between gap-4 hover:bg-neutral-50 transition-colors"
                  >
                    <span className="font-medium text-xs md:text-sm text-neutral-900">
                      {faq.question}
                    </span>
                    <span className="p-1 rounded-full bg-neutral-100 text-neutral-800 shrink-0">
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
