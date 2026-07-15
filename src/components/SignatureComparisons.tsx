import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Award, ShieldCheck, Zap } from 'lucide-react';

interface ComparisonItem {
  id: number;
  name: string;
  beforeFont: string;
  afterFont: string;
  afterColor: string;
  badgeColor: string;
}

export default function SignatureComparisons() {
  const comparisons: ComparisonItem[] = [
    {
      id: 1,
      name: 'Ramesh Kumar',
      beforeFont: 'font-sans font-light tracking-wide',
      afterFont: 'font-signature-great text-sky-300',
      afterColor: 'text-sky-300',
      badgeColor: 'border-sky-500/20 text-sky-400 bg-sky-500/5',
    },
    {
      id: 2,
      name: 'Priya Sharma',
      beforeFont: 'font-serif italic tracking-wider',
      afterFont: 'font-signature-monsieur text-fuchsia-300 text-5xl',
      afterColor: 'text-fuchsia-300',
      badgeColor: 'border-fuchsia-500/20 text-fuchsia-400 bg-fuchsia-500/5',
    },
    {
      id: 3,
      name: 'Arun Prakash',
      beforeFont: 'font-mono tracking-normal',
      afterFont: 'font-signature-alex text-emerald-300',
      afterColor: 'text-emerald-300',
      badgeColor: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5',
    },
    {
      id: 4,
      name: 'Kaviya',
      beforeFont: 'font-sans font-light tracking-widest',
      afterFont: 'font-signature-pinyon text-amber-300',
      afterColor: 'text-amber-300',
      badgeColor: 'border-amber-500/20 text-amber-400 bg-amber-500/5',
    },
    {
      id: 5,
      name: 'Coursezy',
      beforeFont: 'font-sans font-normal',
      afterFont: 'font-signature-great text-violet-300',
      afterColor: 'text-violet-300',
      badgeColor: 'border-violet-500/20 text-violet-400 bg-violet-500/5',
    },
    {
      id: 6,
      name: 'Meta Minds',
      beforeFont: 'font-sans font-semibold tracking-tight',
      afterFont: 'font-signature-alex text-rose-300',
      afterColor: 'text-rose-300',
      badgeColor: 'border-rose-500/20 text-rose-400 bg-rose-500/5',
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8" id="signature-comparisons">
      <div className="text-center space-y-2">
        <h4 className="font-display font-extrabold text-[11px] sm:text-xs uppercase tracking-widest text-amber-500 flex items-center justify-center gap-1.5">
          ✨ See the Difference
        </h4>
        <p className="text-xs text-zinc-400">
          From a Simple Name to a Premium Signature
        </p>
      </div>

      {/* Grid of comparisons rendered one-by-one */}
      <div className="space-y-4">
        {comparisons.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="group relative rounded-2xl overflow-hidden border border-zinc-900 bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-zinc-800 transition-all duration-300 p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-xl"
          >
            {/* Before Column */}
            <div className="flex-1 w-full text-center sm:text-left space-y-1 sm:space-y-2 p-2 sm:p-3 rounded-xl bg-zinc-950/40 border border-zinc-900/50">
              <div className="flex items-center justify-center sm:justify-start gap-1.5">
                <span className="text-[9px] font-mono font-medium text-zinc-500 bg-zinc-800/40 border border-zinc-800/50 px-2 py-0.5 rounded uppercase tracking-wider">
                  Before
                </span>
              </div>
              <div className="py-2 min-h-[50px] flex items-center justify-center sm:justify-start">
                <span className={`text-zinc-400 text-lg sm:text-xl ${item.beforeFont}`}>
                  {item.name}
                </span>
              </div>
              <span className="block text-[9px] text-zinc-600 font-mono tracking-wider uppercase">
                Plain Text
              </span>
            </div>

            {/* Transition Arrow */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-900/80 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-amber-500 group-hover:border-amber-500/30 group-hover:scale-110 transition-all duration-300 shadow-md">
              <ArrowRight className="w-4 h-4" />
            </div>

            {/* After Column */}
            <div className="flex-1 w-full text-center sm:text-left space-y-1 sm:space-y-2 p-2 sm:p-3 rounded-xl bg-zinc-950/60 border border-zinc-900/30">
              <div className="flex items-center justify-center sm:justify-start gap-1.5">
                <span className={`text-[9px] font-mono font-bold border px-2 py-0.5 rounded uppercase tracking-wider ${item.badgeColor}`}>
                  After
                </span>
              </div>
              <div className="py-2 min-h-[50px] flex items-center justify-center sm:justify-start overflow-hidden">
                <span className={`text-3xl sm:text-4xl leading-none block select-none group-hover:scale-105 transition-transform duration-500 origin-center sm:origin-left ${item.afterFont}`}>
                  {item.name}
                </span>
              </div>
              <span className="block text-[9px] text-amber-500/50 font-mono tracking-wider uppercase">
                Premium Signature
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Feature stats footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-zinc-900/80">
        {[
          { icon: Sparkles, label: '100% Custom Design' },
          { icon: Award, label: 'Premium Quality' },
          { icon: ShieldCheck, label: 'High Resolution PNG' },
          { icon: Zap, label: 'Fast Delivery' },
        ].map((feature, i) => (
          <div key={i} className="flex flex-col items-center text-center p-3 rounded-xl bg-zinc-900/20 border border-zinc-900/40">
            <div className="w-8 h-8 rounded-full bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-400/90 mb-2">
              <feature.icon className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold text-zinc-300 tracking-wide">
              {feature.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
