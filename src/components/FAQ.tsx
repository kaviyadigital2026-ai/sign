import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: 'Is my newly designed signature legally binding?',
      answer: 'Yes, absolutely. In almost all legal jurisdictions globally (including the USA under the ESIGN Act and Europe under eIDAS), a signature is legally binding regardless of its style, handwriting, or level of complexity, as long as it represents your intent to sign. Updating your signature to a more professional, legible, or elegant custom layout has no negative impact on its legal validity.'
    },
    {
      question: 'How do I learn to reproduce my new handcrafted signature?',
      answer: 'We provide comprehensive training materials depending on your selected package. With our Premium and Elite suites, you receive a slow-motion High-Definition Stroke-Order Video showing the exact pen pathway, timing, and pressure points. We also deliver printable tracing sheets (with customized vertical grids and slant angles) so you can build muscle memory and master the movement in a single weekend.'
    },
    {
      question: 'Can I use this custom signature for digital documents and emails?',
      answer: 'Yes! We deliver your final approved signature concept in various high-resolution digital formats. You will receive transparent background PNGs cropped specifically to fit standard email clients (Outlook, Gmail, Apple Mail) and document signers (Adobe Acrobat, DocuSign, HelloSign) so you can apply them instantly with a single click.'
    },
    {
      question: 'What is the actual design process? Who designs my signature?',
      answer: 'Unlike automated font-generators, our process is entirely custom and human-driven. Once you submit your order, your name and style preferences are assigned to one of our professional Master Penmen or Calligraphers. They sketch several iterations on high-weight calligraphy paper, scanning and digitizing the top concepts into pristine mathematical vector assets (SVG/EPS/PDF) so they remain razor-sharp at any size.'
    },
    {
      question: 'What if I don\'t like the first batch of signature designs?',
      answer: 'We are committed to absolute design perfection. Our Premium package includes unlimited revisions for your chosen concept, and our Elite package has lifetime adjustments. We will work closely with you—tweaking slants, stroke weights, initial letters, or flourishes—until we have crafted a signature you are proud to sign for the rest of your life.'
    },
    {
      question: 'What files are included in the final delivery pack?',
      answer: 'You will receive an organized digital zip pack containing: Vector files (SVG, EPS, PDF) which can scale to billboard size without pixelation; transparent-background high-res PNGs in Royal Gold, Liquid Silver, Charcoal Black, and Arctic White; a high-res JPG; and your customized practice videos and PDF calligraphy practice templates.'
    }
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="py-16 bg-zinc-950 border-t border-zinc-900" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full">
            Inquiries
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-medium text-zinc-100 mt-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-zinc-400 mt-2">
            Have questions about digital usage, learning guides, or legalities? Explore our detailed breakdown.
          </p>
        </div>

        {/* Accordion Items */}
        <div className="space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div
                key={idx}
                className="bg-zinc-900/30 border border-zinc-900/80 rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-zinc-900/60 transition cursor-pointer"
                >
                  <span className="text-xs md:text-sm font-semibold text-zinc-200 flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-amber-500/70 flex-shrink-0" />
                    {item.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                  )}
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[500px] border-t border-zinc-900/60 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                  } overflow-hidden`}
                >
                  <div className="p-5 text-xs text-zinc-400 leading-relaxed bg-zinc-950/40">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-12 text-center p-6 bg-gradient-to-b from-zinc-900/50 to-zinc-950/50 border border-zinc-900 rounded-2xl">
          <p className="text-xs text-zinc-400">
            Have a bespoke request for corporate branding or bulk executive licensing?
          </p>
          <a
            href="mailto:concierge@signaturedesign.studio"
            className="inline-block text-xs text-amber-400 font-semibold hover:text-amber-300 mt-2 hover:underline"
          >
            Contact our Private Concierge Service →
          </a>
        </div>

      </div>
    </div>
  );
}
