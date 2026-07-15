import { Check, Flame, Award, Sparkles } from 'lucide-react';

interface PackagesProps {
  onSelectPackage: (packageName: string, price: number) => void;
}

export const PACKAGES = [
  {
    id: 'single',
    name: 'Single Signature',
    icon: '🖊️',
    price: 99,
    description: 'Get a clean, custom-crafted digital signature tailored perfectly to your style.',
    tagline: 'INDIVIDUAL LICENSE',
    features: [
      '1 Custom Signature Design',
      'Transparent PNG',
      'High Quality',
      'Fast Delivery'
    ],
    popular: false
  },
  {
    id: 'bundle',
    name: '3 in one bundle',
    icon: '✨',
    price: 150,
    description: 'The ultimate signature suite offering 3 distinct styles to fit all your branding needs.',
    tagline: 'PREMIUM EXECUTIVE BUNDLE',
    features: [
      '3 Custom Signature Designs',
      'Transparent PNG Files',
      'High Quality',
      'Fast Delivery',
      'Best Value'
    ],
    popular: true
  }
];

export default function Packages({ onSelectPackage }: PackagesProps) {
  return (
    <div className="py-20 bg-zinc-950/40 relative border-t border-zinc-900" id="pricing-packages">
      {/* Subtle backdrop glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full">
            Pricing & Packages
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-medium text-zinc-100 mt-4 tracking-tight">
            Choose Your Signature Suite
          </h2>
          <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
            Every signature is custom designed by professional penmen and digitized into high-resolution transparent assets.
          </p>
        </div>

        {/* Pricing Cards Grid (Two Column Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-3xl mx-auto">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col h-full bg-zinc-900/20 backdrop-blur-sm border rounded-2xl p-6 md:p-8 transition-all duration-300 card-glow ${
                pkg.popular
                  ? 'border-amber-500/70 ring-1 ring-amber-500/20 shadow-xl shadow-amber-500/5'
                  : 'border-zinc-800'
              }`}
            >
              {/* Popular / Best Value Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-zinc-950 text-[11px] font-bold uppercase tracking-wider px-4 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-amber-500/20">
                  <Flame className="w-3.5 h-3.5 fill-zinc-950" />
                  Best Value Bundle
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{pkg.icon}</span>
                  <span className="text-[10px] font-mono text-amber-500 uppercase tracking-wider">
                    {pkg.tagline}
                  </span>
                </div>
                <h3 className="text-xl font-display font-bold text-zinc-100 mt-2">
                  {pkg.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 min-h-[40px] leading-relaxed">
                  {pkg.description}
                </p>

                {/* Price */}
                <div className="mt-5 flex items-baseline gap-1 bg-zinc-950/40 p-3 rounded-xl border border-zinc-900">
                  <span className="text-3xl font-display font-bold text-zinc-100">
                    ₹{pkg.price}
                  </span>
                  <span className="text-xs font-mono text-amber-500 font-semibold ml-1.5">
                    Only
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 ml-auto">
                    One-time payment
                  </span>
                </div>
              </div>

              {/* Call to Action Button */}
              <button
                onClick={() => onSelectPackage(pkg.name, pkg.price)}
                className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-xs tracking-wider uppercase transition-all duration-300 mb-8 cursor-pointer ${
                  pkg.popular
                    ? 'bg-amber-500 hover:bg-amber-600 text-zinc-950 shadow-lg shadow-amber-500/10'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700'
                } transform hover:-translate-y-0.5 active:translate-y-0`}
              >
                Order Now
              </button>

              {/* Features List */}
              <div className="flex-1">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-4 border-b border-zinc-800/80 pb-2">
                  What is Included
                </span>
                <ul className="space-y-3">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs text-zinc-300 leading-normal">
                      <Check className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Security Guarantee */}
              <div className="mt-8 pt-4 border-t border-zinc-800/60 flex items-center justify-center gap-1.5 text-[10px] text-zinc-500">
                <Award className="w-3.5 h-3.5 text-zinc-500/60" />
                100% Customer Satisfaction Guarantee
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
