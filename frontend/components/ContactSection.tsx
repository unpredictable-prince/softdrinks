import { Phone, Mail, MessageCircle, MapPin, Clock } from 'lucide-react';

export default function ContactSection() {
  const phone = process.env.NEXT_PUBLIC_PHONE || '+91 98765 43210';
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || '+919876543210';
  const email = process.env.NEXT_PUBLIC_EMAIL || 'contact@fizzora.in';
  const instagram = process.env.NEXT_PUBLIC_INSTAGRAM || 'https://instagram.com/fizzora_drinks';

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#090a0f] relative border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-400 mb-3">
            <Phone className="h-3.5 w-3.5" />
            <span>Regional Headquarters</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Connect With The <span className="gradient-text">Fizzora Team</span>
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base">
            Reach out directly for wholesale crate bookings, dealership inquiries, or corporate banquet supply in Gujarat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Fizzora,%20I%20am%20inquiring%20about%20cold%20drinks%20distribution%20in%20Gujarat.`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl glass-panel p-6 border border-emerald-500/20 glass-panel-hover flex flex-col items-start space-y-3 group"
          >
            <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-white">WhatsApp Direct</h3>
            <p className="text-xs text-zinc-400">Fastest channel for crate price inquiries & quick orders.</p>
            <span className="text-xs font-bold text-emerald-400 mt-auto pt-2">Click to Chat &rarr;</span>
          </a>

          {/* Business Calling Line */}
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="rounded-2xl glass-panel p-6 border border-white/10 glass-panel-hover flex flex-col items-start space-y-3 group"
          >
            <div className="rounded-xl bg-amber-500/10 p-3 text-amber-400 border border-amber-500/20 group-hover:scale-110 transition-transform">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-white">Calling Line</h3>
            <p className="text-xs text-zinc-400">{phone}</p>
            <span className="text-xs font-bold text-amber-400 mt-auto pt-2">Call Office &rarr;</span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${email}`}
            className="rounded-2xl glass-panel p-6 border border-white/10 glass-panel-hover flex flex-col items-start space-y-3 group"
          >
            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-white">Email Desk</h3>
            <p className="text-xs text-zinc-400">{email}</p>
            <span className="text-xs font-bold text-blue-400 mt-auto pt-2">Send Message &rarr;</span>
          </a>

          {/* Instagram / Social */}
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl glass-panel p-6 border border-pink-500/20 glass-panel-hover flex flex-col items-start space-y-3 group"
          >
            <div className="rounded-xl bg-pink-500/10 p-3 text-pink-400 border border-pink-500/20 group-hover:scale-110 transition-transform">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
            <h3 className="text-base font-bold text-white">Official Instagram</h3>
            <p className="text-xs text-zinc-400">@fizzora_drinks — campaigns, retail alerts & summer drops.</p>
            <span className="text-xs font-bold text-pink-400 mt-auto pt-2">View Profile &rarr;</span>
          </a>
        </div>

        {/* Operating Hours & Hub */}
        <div className="mt-12 rounded-2xl glass-panel p-6 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/5 p-2.5 text-amber-400 border border-white/10">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Central Operations & Bottling Depot</p>
              <p className="text-xs text-zinc-400">Plot 42, GIDC Industrial Estate, Naroda, Ahmedabad - 382330, Gujarat</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Clock className="h-4 w-4 text-emerald-400" />
            <span>Dispatches: Monday – Saturday (8:00 AM – 7:30 PM)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
