import { Sparkles, PenTool, Video, FileCheck, ArrowDown, ChevronRight } from 'lucide-react';

interface HeroProps {
  onScrollToSandbox: () => void;
  onScrollToPricing: () => void;
}

export default function Hero({ onScrollToSandbox, onScrollToPricing }: HeroProps) {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden bg-zinc-950">
      
      {/* Background Decorative Artworks */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none select-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-600/5 rounded-full blur-[140px] pointer-events-none select-none" />

      {/* Hero content container */}
      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8 px-4">
        
        {/* Top prestige pill */}
        <div className="inline-flex items-center gap-2 bg-zinc-900/80 border border-zinc-800/80 px-4 py-1.5 rounded-full shadow-lg shadow-black/40">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-[10px] md:text-xs font-mono font-medium text-zinc-300 tracking-wider uppercase">
            Sign with Style
          </span>
        </div>

        {/* High-End Typography Headline */}
        <div className="space-y-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-zinc-100 tracking-tight leading-none">
            Make Your Name Look Professional <br className="hidden md:inline" />
            <span className="text-gold font-serif italic font-semibold">Professional Signature</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-zinc-400 font-sans font-light leading-relaxed">
            Get a custom handwritten digital signature for business, official documents, email, social media, and personal branding.
          </p>
        </div>

        {/* Buttons / Calls to Action */}
        <div className="flex items-center justify-center pt-4 max-w-xs mx-auto">
          <button
            onClick={onScrollToPricing}
            className="w-full px-10 py-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-zinc-950 font-extrabold text-xs tracking-wider uppercase shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
          >
            Buy Now
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Key Features/Propositions badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 max-w-4xl mx-auto border-t border-zinc-900/60 mt-16">
          {/* Badge 1 */}
          <div className="flex items-start gap-4 text-left bg-zinc-900/20 p-4 rounded-xl border border-zinc-900/40">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 flex-shrink-0">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-zinc-200">100% Custom Design</h3>
              <p className="text-[10px] text-zinc-500 mt-1">Unique signature concepts custom handcrafted to reflect your professional personality.</p>
            </div>
          </div>

          {/* Badge 2 */}
          <div className="flex items-start gap-4 text-left bg-zinc-900/20 p-4 rounded-xl border border-zinc-900/40">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 flex-shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-zinc-200">High Quality PNG</h3>
              <p className="text-[10px] text-zinc-500 mt-1">High-definition rasterized files perfect for contracts, watermarks, and printing.</p>
            </div>
          </div>

          {/* Badge 3 */}
          <div className="flex items-start gap-4 text-left bg-zinc-900/20 p-4 rounded-xl border border-zinc-900/40">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 flex-shrink-0">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-zinc-200">Transparent Background</h3>
              <p className="text-[10px] text-zinc-500 mt-1">Pre-cropped alpha-transparent assets that place cleanly on emails and forms.</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="pt-8 flex justify-center text-zinc-600 hover:text-zinc-400 transition cursor-pointer" onClick={onScrollToSandbox}>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest uppercase">Try the Generator below</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-amber-500/80" />
          </div>
        </div>

      </div>
    </div>
  );
}
