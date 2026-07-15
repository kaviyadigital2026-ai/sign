import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import Hero from './components/Hero';
import SignatureComparisons from './components/SignatureComparisons';
import SignatureGenerator from './components/SignatureGenerator';
import Packages from './components/Packages';
import FAQ from './components/FAQ';
import OrderModal from './components/OrderModal';

export default function App() {
  // Order Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [packageName, setPackageName] = useState('3 in one bundle');
  const [packagePrice, setPackagePrice] = useState(150);

  // Scroll Helpers
  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOrderInitiated = (name: string, price: number) => {
    setPackageName(name);
    setPackagePrice(price);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-500/20 selection:text-amber-400">
      
      {/* Hero Section */}
      <Hero 
        onScrollToSandbox={() => scrollToId('signature-sandbox')}
        onScrollToPricing={() => scrollToId('pricing-packages')}
      />

      {/* Signature Sandbox Section */}
      <section className="py-16 md:py-24 bg-zinc-950 border-t border-zinc-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="max-w-3xl mx-auto space-y-6 text-center border border-zinc-800/80 bg-zinc-900/10 p-8 rounded-2xl shadow-lg relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500/10 border border-amber-500/20 px-4 py-1 rounded-full text-[10px] font-mono text-amber-500 uppercase tracking-widest">
              Versatile Applications
            </div>
            
            <h2 className="text-2xl md:text-3xl font-display font-medium text-zinc-100 tracking-tight">
              Perfect For
            </h2>
            
            <div className="grid grid-cols-2 gap-x-6 sm:gap-x-12 gap-y-4 text-left max-w-xl mx-auto pt-4">
              {/* Row 1 */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-zinc-200">Official Documents</span>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-zinc-200">Email Signature</span>
              </div>
              
              {/* Row 2 */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-zinc-200">Resume / CV</span>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-zinc-200">Business Cards</span>
              </div>
              
              {/* Row 3 */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-zinc-200">Social Media</span>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-zinc-200">Personal Branding</span>
              </div>
            </div>

            {/* Premium CTA Buy Now button */}
            <div className="pt-6 border-t border-zinc-900/60 flex flex-col items-center gap-6">
              <button
                onClick={() => handleOrderInitiated('3 in one bundle', 150)}
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 font-display font-extrabold text-[11px] uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-lg shadow-amber-500/5 hover:shadow-amber-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-zinc-950" />
                Buy Now
              </button>

              {/* Beautiful, High-Fidelity Interactive Comparisons Rendered One-by-One */}
              <div className="w-full pt-4">
                <SignatureComparisons />
              </div>
            </div>
          </div>

          <SignatureGenerator 
            onOrderClick={(packageName) => handleOrderInitiated(packageName, packageName === '3 in one bundle' ? 150 : 99)} 
          />

        </div>
      </section>

      {/* Pricing / Packages Section */}
      <Packages onSelectPackage={handleOrderInitiated} />

      {/* Frequently Asked Questions */}
      <FAQ />

      {/* Interactive Step-by-Step Order Modal */}
      <OrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        packageName={packageName}
        price={packagePrice}
      />

    </div>
  );
}
