import { ShieldCheck, Sparkles, HeartHandshake, Award } from 'lucide-react';

export default function BrandStory() {
  const pillars = [
    {
      icon: Sparkles,
      title: 'High Carbonation Index',
      description: 'Pressurized at optimal effervescence volumes to ensure the fizz stays crisp and sharp from the first sip to the last drop.',
    },
    {
      icon: Award,
      title: 'Authentic Local Recipes',
      description: 'Slow-roasted cumin seeds, rock salt crystals from Kutch, and zesty Saurashtra lemons blended for authentic regional taste.',
    },
    {
      icon: HeartHandshake,
      title: 'Retailer First Partnership',
      description: 'Fair crate deposit terms, consistent supply schedules, and healthy profit margins for local kirana and cold drink corners.',
    },
    {
      icon: ShieldCheck,
      title: 'Strict Quality Hygiene',
      description: 'Multi-stage RO water purification, automated bottle washing, and vacuum-sealed capping under controlled environments.',
    },
  ];

  return (
    <section id="story" className="py-20 lg:py-28 bg-[#090a0f] relative border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Narrative Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-400">
              <span>The Gujarati Heritage</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Rooted In The Legendary <br />
              <span className="gradient-text">Cold Drink Culture</span>
            </h2>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
              In Gujarat, a cold drink is more than just a beverage—it is a timeless post-meal ritual, an evening street companion with friends, and the ultimate rescue from blistering 45°C dry summers.
            </p>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              We started with a simple belief: regional tastes deserve world-class beverage engineering. Instead of generic sweet colas, we craft robust digestive jeera sodas and raw mango coolers packed with genuine aroma, bold effervescence, and unmatched satisfaction.
            </p>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm italic text-zinc-300">
                &ldquo;Every crate delivered to a local corner shop in Ahmedabad, Surat, or Rajkot carries our commitment to authentic taste and dependable supply.&rdquo;
              </p>
              <p className="mt-2 text-xs font-bold text-amber-400 tracking-wider uppercase">
                — Fizzora Founding Philosophy
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
