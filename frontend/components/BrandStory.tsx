import { ShieldCheck, Sparkles, HeartHandshake, Milk, Zap } from 'lucide-react';

export default function BrandStory() {
  const pillars = [
    {
      icon: Zap,
      title: '4.2 Vol Carbonation Index',
      description: 'Pressurized at calibrated effervescence volumes to ensure our Jeera Masala and Kachi Keri stay crisp and sharp from the first sip to the last drop.',
    },
    {
      icon: Milk,
      title: 'Authentic Slow-Churned Dahi',
      description: 'Our Desi Masala Chaas and Rajwadi Lassi are crafted from whole milk curd, infused with rock salt, roasted cumin, and natural cardamom with zero milk powders.',
    },
    {
      icon: HeartHandshake,
      title: 'Retailer-First Wholesale Terms',
      description: 'Fair crate deposit systems, rapid stock replenishment, and healthy margins for regional provision stores and cold drink centres.',
    },
    {
      icon: ShieldCheck,
      title: 'Monitored Cold-Chain Hygiene',
      description: 'Multi-stage RO water treatment, food-grade automated bottling, and insulated cold-chain logistics for perishable dairy freshness.',
    },
  ];

  return (
    <section id="story" className="py-20 lg:py-28 bg-[#090a0f] relative border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Narrative Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Gujarat Beverage Heritage</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Rooted In The Legendary <br />
              <span className="gradient-text">Cold Drink & Dairy Culture</span>
            </h2>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
              In Gujarat, a cold drink is more than just a beverage—it is a sacred post-meal digestive, an evening street companion at the neighbourhood corner, and essential relief from blistering 45°C summers.
            </p>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              We united two cherished traditions under one roof: the electrifying rush of spiced digestive sodas and the soothing comfort of Kathiyawadi buttermilk and sweet lassis. From Kutch rock salt to fresh whole-milk curd, every sip honours genuine regional taste.
            </p>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm italic text-zinc-300">
                &ldquo;Every crate dispatched to our retail stockists across Ahmedabad, Surat, Vadodara, and Rajkot carries our solemn commitment to purity, authentic spice ratios, and unbroken cold-chain supply.&rdquo;
              </p>
              <p className="mt-2 text-xs font-bold text-amber-400 tracking-wider uppercase">
                — Fizzora Master Bottlers
              </p>
            </div>
          </div>

          {/* Pillars Grid Column */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl glass-panel p-6 border border-white/10 glass-panel-hover flex flex-col items-start space-y-3"
                >
                  <div className="rounded-xl bg-amber-500/10 p-3 text-amber-400 border border-amber-500/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
