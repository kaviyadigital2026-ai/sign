import { useState, useEffect } from 'react';
import { SignatureStyle } from '../types';
import { Sparkles, RefreshCw, Layers, TrendingUp, Info, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface SignatureGeneratorProps {
  onStyleSelected?: (styleName: string) => void;
  onOrderClick?: (packageName: string) => void;
}

export const SIGNATURE_STYLES: SignatureStyle[] = [
  {
    id: 'sovereign',
    name: 'The Sovereign',
    fontClass: 'font-signature-monsieur text-5xl md:text-6xl',
    description: 'An aristocratic, high-flourish calligraphy style characterized by towering ascenders and intricate baseline loops.',
    vibes: ['Opulent', 'Traditional', 'Prestigious'],
    personality: 'Deep reverence for heritage, majestic executive authority, and elite artistry.',
    recommendedFor: 'CEOs, Authors, Luxury Founders, & Art Collectors'
  },
  {
    id: 'vanguard',
    name: 'The Vanguard',
    fontClass: 'font-signature-pinyon text-5xl md:text-6xl',
    description: 'A sleek, forward-slanting rapid cursive. Bold sweeping flourishes paired with clean, rhythmic capital entries.',
    vibes: ['Dynamic', 'Progressive', 'Assertive'],
    personality: 'Asserts high-velocity decision making, modern intelligence, and forward-thinking momentum.',
    recommendedFor: 'Tech Executives, Venture Capitalists, & Visionary Leaders'
  },
  {
    id: 'maestro',
    name: 'The Maestro',
    fontClass: 'font-signature-great text-5xl md:text-6xl',
    description: 'A highly balanced, rhythmic script. Features symmetrical flourishes and soft, elegant connection loops.',
    vibes: ['Harmonious', 'Artistic', 'Charismatic'],
    personality: 'Conveys warmth, high emotional intelligence, creative precision, and natural charisma.',
    recommendedFor: 'Physicians, Creative Directors, Consultants, & Designers'
  },
  {
    id: 'minimalist',
    name: 'The Minimalist',
    fontClass: 'font-signature-alex text-5xl md:text-6xl',
    description: 'A modern, understated signature. Focuses on strong, clean initial letters leading into a fast, low-profile body line.',
    vibes: ['Sophisticated', 'Understated', 'Modern'],
    personality: 'Understated self-assurance, extreme clarity of thought, and high efficiency.',
    recommendedFor: 'Architects, Legal Partners, Software Leaders, & Engineers'
  }
];

export default function SignatureGenerator({ onStyleSelected, onOrderClick }: SignatureGeneratorProps) {
  const [name, setName] = useState('Sarah Sterling');
  const [selectedStyle, setSelectedStyle] = useState<SignatureStyle>(SIGNATURE_STYLES[0]);
  const [color, setColor] = useState('text-amber-400');
  const [slant, setSlant] = useState<'forward' | 'straight' | 'backward'>('straight');
  const [triggerRedraw, setTriggerRedraw] = useState(0);

  // Trigger redraw animation whenever name, style or slant changes
  useEffect(() => {
    setTriggerRedraw(prev => prev + 1);
    if (onStyleSelected) {
      onStyleSelected(selectedStyle.name);
    }
  }, [name, selectedStyle, slant]);

  const colors = [
    { label: 'Royal Gold', class: 'text-amber-400', bg: 'bg-amber-400' },
    { label: 'Liquid Silver', class: 'text-zinc-300', bg: 'bg-zinc-300' },
    { label: 'Ethereal White', class: 'text-white', bg: 'bg-white' },
    { label: 'Cobalt Ink', class: 'text-blue-400', bg: 'bg-blue-400' },
  ];

  // Map slant to skew tailwind class
  const getSlantClass = () => {
    if (slant === 'forward') return 'skew-x-[-12deg]';
    if (slant === 'backward') return 'skew-x-[8deg]';
    return '';
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-zinc-950/80 rounded-2xl p-6 md:p-8 card-glow" id="signature-sandbox">
      <div className="flex justify-center">
        
        {/* Controls & Inputs */}
        <div className="w-full max-w-xl">
          <div className="p-6 bg-zinc-900/40 rounded-2xl shadow-xl">
            <h4 className="text-xs font-display font-bold text-zinc-200 flex items-center gap-1.5 mb-5 uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-amber-500" />
              What's Included?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {[
                { id: 1, label: 'Premium Digital Signature', badge: 'Best' },
                { id: 2, label: 'PNG (Transparent)', badge: 'Premium' },
                { id: 3, label: 'Black Version' },
                { id: 4, label: 'White Version' },
                { id: 5, label: 'High Resolution' },
                { id: 6, label: 'Ready to Use' }
              ].map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                  className="flex items-center justify-between gap-3 bg-zinc-900/60 p-3.5 rounded-xl hover:bg-zinc-900/90 group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                    <span className="text-[12px] font-semibold text-zinc-200 tracking-wide">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/25 px-1.5 py-0.5 rounded uppercase tracking-wider select-none">
                      {item.badge}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
