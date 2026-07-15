import { useState, FormEvent, useEffect, useRef } from 'react';
import { X, ShieldCheck, CreditCard, CheckCircle2, ShoppingBag, Sparkles, Sliders, ArrowRight, ArrowLeft } from 'lucide-react';
import { OrderDetails } from '../types';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
  price: number;
}

export default function OrderModal({ isOpen, onClose, packageName, price }: OrderModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Form states
  const [selectedPackage, setSelectedPackage] = useState(packageName);
  const [currentPrice, setCurrentPrice] = useState(price);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [intendedUse, setIntendedUse] = useState('PDF Contracts');
  const [slant, setSlant] = useState<'forward' | 'straight' | 'backward'>('straight');
  const [flair, setFlair] = useState<'minimal' | 'moderate' | 'dramatic'>('moderate');
  const [emphasis, setEmphasis] = useState('stylized');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Payment states
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // Auto update price when package name shifts in options
  useEffect(() => {
    if (selectedPackage === 'Single Signature') {
      setCurrentPrice(99);
    } else if (selectedPackage === '3 in one bundle') {
      setCurrentPrice(150);
    }
  }, [selectedPackage]);

  useEffect(() => {
    setSelectedPackage(packageName);
    setCurrentPrice(price);
    setStep(1);
  }, [packageName, price, isOpen]);

  // GOLD CONFETTI EFFECT FOR SUCCESS PAGE
  useEffect(() => {
    if (step === 4 && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = canvas.parentElement?.clientWidth || 400;
      canvas.height = canvas.parentElement?.clientHeight || 400;

      const particles: Array<{
        x: number;
        y: number;
        size: number;
        color: string;
        speedX: number;
        speedY: number;
        rotation: number;
        rotationSpeed: number;
      }> = [];

      // Create gold and amber particles
      const colors = ['#f59e0b', '#fbbf24', '#fef08a', '#d97706', '#ffffff'];
      for (let i = 0; i < 65; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * -canvas.height, // start off-screen top
          size: Math.random() * 5 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 3 + 2,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 4 - 2,
        });
      }

      let animationFrameId: number;
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let active = false;
        particles.forEach((p) => {
          p.y += p.speedY;
          p.x += p.speedX;
          p.rotation += p.rotationSpeed;

          if (p.y < canvas.height) {
            active = true;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();

          // Reset if it goes off bottom
          if (p.y > canvas.height) {
            p.y = -10;
            p.x = Math.random() * canvas.width;
          }
        });

        if (active) {
          animationFrameId = requestAnimationFrame(animate);
        }
      };

      animate();
      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [step]);

  if (!isOpen) return null;

  // Handle step updates with light validation
  const nextStep = () => {
    if (step === 1) {
      if (!fullName.trim()) {
        alert('Please provide the full name for the signature design.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const prevStep = () => {
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !cardNumber || !expiry || !cvv) {
      alert('Please fill out all billing and card parameters.');
      return;
    }
    setLoading(true);

    // Simulate luxury credit card gateway authentication
    setTimeout(() => {
      setLoading(false);
      setStep(4);
    }, 2200);
  };

  const formattedCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formattedExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col my-8">
        
        {/* Confetti canvas overlay for success */}
        {step === 4 && (
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10 w-full h-full" />
        )}

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-900/80 z-20">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-display font-semibold text-zinc-100 uppercase tracking-wider">
              Signature Order Concierge
            </span>
          </div>
          {step !== 4 && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Step Indicator */}
        {step !== 4 && (
          <div className="px-6 py-3 bg-zinc-900/30 border-b border-zinc-900/50 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <div className="flex items-center gap-4">
              <span className={step === 1 ? 'text-amber-500 font-bold' : ''}>1. Configuration</span>
              <span>&rarr;</span>
              <span className={step === 2 ? 'text-amber-500 font-bold' : ''}>2. Calligraphy Aesthetics</span>
              <span>&rarr;</span>
              <span className={step === 3 ? 'text-amber-500 font-bold' : ''}>3. Secure Checkout</span>
            </div>
            <span className="text-zinc-400">Step {step} of 3</span>
          </div>
        )}

        {/* Modal Core Content */}
        <div className="p-6 md:p-8 overflow-y-auto max-h-[75vh] flex-1 z-20">
          
          {/* STEP 1: CONFIGURATION */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-display text-zinc-100 font-semibold mb-1">
                  Configure Your Signature Specifications
                </h3>
                <p className="text-xs text-zinc-400">
                  Tell us who this signature is for and select your package structure.
                </p>
              </div>

              {/* Package Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Selected Styling Package
                </label>
                <select
                  value={selectedPackage}
                  onChange={(e) => setSelectedPackage(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-4 py-3 text-zinc-100 text-xs focus:outline-none transition"
                >
                  <option value="Single Signature">Single Signature (₹99)</option>
                  <option value="3 in one bundle">3 in one bundle (₹150)</option>
                </select>
              </div>

              {/* Signature Name Input */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Exact Name to design
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah J. Sterling"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-4 py-3 text-zinc-100 text-xs focus:outline-none transition font-medium"
                />
                <span className="text-[10px] text-zinc-500 block">
                  Ensure capitalization, middle initials, and spelling are correct. This acts as the blueprints for our Penman.
                </span>
              </div>

              {/* Intended Primary Use */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Primary Usage Objective
                </label>
                <select
                  value={intendedUse}
                  onChange={(e) => setIntendedUse(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-4 py-3 text-zinc-100 text-xs focus:outline-none transition"
                >
                  <option value="PDF Contracts">PDF Contracts & Executive Signatures</option>
                  <option value="Email Signature Footer">Professional Email Signature Footer</option>
                  <option value="Creative Branding / Artwork">Creative Brand Logos, Merchandise & Art</option>
                  <option value="Signing Memorabilia / Books">Signing physical books, memorabilia, or art prints</option>
                  <option value="Personal Identity Update">Personal Identity Refinement (All-rounder)</option>
                </select>
              </div>

              {/* Action */}
              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-1.5 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold text-xs tracking-wider uppercase transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  Continue to Aesthetics
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CALLIGRAPHY AESTHETICS */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-display text-zinc-100 font-semibold mb-1">
                  Customize Stylistic Aesthetics
                </h3>
                <p className="text-xs text-zinc-400">
                  Provide guidance on how our calligraphers should structure your signature's curves and curves.
                </p>
              </div>

              {/* Slant & Flourish preference */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    Slant Tendency
                  </label>
                  <div className="grid grid-cols-3 bg-zinc-900 border border-zinc-800 rounded-xl p-1">
                    {(['straight', 'forward', 'backward'] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSlant(s)}
                        className={`py-2 rounded-lg text-xs font-medium capitalize transition ${
                          slant === s ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    Flourish & Flair
                  </label>
                  <div className="grid grid-cols-3 bg-zinc-900 border border-zinc-800 rounded-xl p-1">
                    {(['minimal', 'moderate', 'dramatic'] as const).map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setFlair(f)}
                        className={`py-2 rounded-lg text-xs font-medium capitalize transition ${
                          flair === f ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Capital Letter emphasis */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Initial Letter Focus
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: 'oversized', label: 'Oversized & Bold', desc: 'Large, commanding capital initials' },
                    { value: 'stylized', label: 'Highly Stylized', desc: 'Looping, creative artistic strokes' },
                    { value: 'standard', label: 'Balanced & Subtle', desc: 'Kept in proportion with other letters' }
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setEmphasis(opt.value)}
                      className={`p-3 rounded-xl border text-left transition ${
                        emphasis === opt.value
                          ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-300'
                      }`}
                    >
                      <div className="text-xs font-bold">{opt.label}</div>
                      <div className="text-[10px] text-zinc-500 mt-0.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional notes */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Aesthetic Notes or Constraints (Optional)
                </label>
                <textarea
                  rows={2}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="e.g. Please make the end sweep fast and sharp, or ensure the T crossbar represents leadership..."
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-4 py-3 text-zinc-100 text-xs focus:outline-none transition resize-none placeholder:text-zinc-600 font-medium"
                />
              </div>

              {/* Action buttons */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-1.5 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold text-xs tracking-wider uppercase transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  Continue to Payment
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT & EMAIL */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h3 className="text-lg font-display text-zinc-100 font-semibold mb-1">
                  Complete Secure Acquisition
                </h3>
                <p className="text-xs text-zinc-400">
                  Provide your delivery coordinates and billing particulars to commission our master penmen.
                </p>
              </div>

              {/* Contact Email */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Delivery Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. executive@sterling.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 rounded-xl px-4 py-3 text-zinc-100 text-xs focus:outline-none transition font-medium"
                />
                <span className="text-[10px] text-zinc-500 block">
                  All draft concepts, high-res vectors, and HD stroke-order learning videos will be dispatched to this address.
                </span>
              </div>

              {/* Simulated Card Block */}
              <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 md:p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-2">
                  <span className="text-xs font-mono text-zinc-300 font-bold flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-amber-500" />
                    Secure Card Processing
                  </span>
                  <div className="flex gap-1">
                    <span className="text-[8px] font-mono border border-zinc-700 text-zinc-400 px-1 rounded">VISA</span>
                    <span className="text-[8px] font-mono border border-zinc-700 text-zinc-400 px-1 rounded">MC</span>
                    <span className="text-[8px] font-mono border border-zinc-700 text-zinc-400 px-1 rounded">AMEX</span>
                  </div>
                </div>

                {/* Card Number */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                    Credit Card Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="4000 1234 5678 9010"
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formattedCardNumber(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-zinc-100 text-xs font-mono focus:outline-none transition"
                  />
                </div>

                {/* Expiry & CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      maxLength={5}
                      value={expiry}
                      onChange={(e) => setExpiry(formattedExpiry(e.target.value))}
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-zinc-100 text-xs font-mono focus:outline-none transition"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                      Secure CVV
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="•••"
                      maxLength={4}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ''))}
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-zinc-100 text-xs font-mono focus:outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 border-t border-zinc-900 pt-4">
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Custom Handcrafted Service: {selectedPackage}</span>
                  <span className="font-mono">₹{currentPrice}</span>
                </div>
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Secure Digital Delivery & Packaging</span>
                  <span className="font-mono text-emerald-400">FREE</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-zinc-200 border-t border-zinc-900 pt-2">
                  <span>Total Due Today</span>
                  <span className="font-mono text-amber-400">₹{currentPrice}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:bg-amber-600 text-zinc-950 font-bold text-xs tracking-wider uppercase transition transform hover:-translate-y-0.5 active:translate-y-0 w-1/2 cursor-pointer shadow-lg shadow-amber-500/15"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      Place Secure Order
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: SUCCESS RECEIPT */}
          {step === 4 && (
            <div className="text-center space-y-6 py-6 z-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-display text-zinc-100 font-bold">
                  Signature Commission Confirmed
                </h3>
                <p className="text-xs text-zinc-400 mt-2 max-w-md mx-auto">
                  Thank you, <span className="text-zinc-200 font-semibold">{fullName}</span>. Your styling commission has been securely transmitted to our calligraphy desk.
                </p>
              </div>

              {/* Beautiful Formal Executive Receipt */}
              <div className="w-full max-w-md mx-auto bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 text-left space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">Commission No.</span>
                  <span className="text-[10px] font-mono text-amber-400 font-bold">#SIG-2026-{(Math.floor(Math.random() * 8999) + 1000)}</span>
                </div>

                <div className="space-y-2 text-xs leading-normal">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Signee Name:</span>
                    <span className="text-zinc-100 font-medium">{fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Styling Package:</span>
                    <span className="text-zinc-100 font-medium">{selectedPackage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Primary Objective:</span>
                    <span className="text-zinc-100 font-medium">{intendedUse}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Requested Slant:</span>
                    <span className="text-zinc-100 font-medium capitalize">{slant}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Flourish Styling:</span>
                    <span className="text-zinc-100 font-medium capitalize">{flair}</span>
                  </div>
                  <div className="flex justify-between border-t border-zinc-800/80 pt-2.5 mt-2 font-semibold">
                    <span className="text-zinc-300">Total Charged:</span>
                    <span className="text-amber-400 font-mono">₹{currentPrice} Only</span>
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-zinc-500 text-center border-t border-zinc-900 font-mono">
                  Receipt sent to {email}
                </div>
              </div>

              {/* Process timeline guide */}
              <div className="p-4 bg-zinc-900/20 border border-zinc-900 rounded-xl text-xs max-w-md mx-auto text-left space-y-2">
                <h4 className="font-semibold text-zinc-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  What Happens Next?
                </h4>
                <ul className="space-y-1.5 text-zinc-400 leading-normal pl-5 list-decimal text-[11px]">
                  <li>Our Master Penman will study your name structure, slant, and aesthetic instructions.</li>
                  <li>Initial high-res hand-drawn drafts will be delivered to your email in 2 business days.</li>
                  <li>Once you choose your favorite concept, we deliver the custom video tutorials and full high-resolution vector assets package.</li>
                </ul>
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold transition"
                >
                  Return to Studio
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
