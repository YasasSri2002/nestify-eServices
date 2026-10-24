import Link from 'next/link';
import DynamicIcon from '@/components/utill/DynamicIcons';

export default function AboutHeroSction() {
  return (
    <section className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center justify-center overflow-hidden bg-primary-900">
      {/* Background Image with Deep Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          id="heroSection"
          className="h-full w-full bg-[url(https://images.unsplash.com/photo-1682973441491-6b41b7af1c6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwc2VydmljZSUyMHJlcGFpciUyMG1vZGVybnxlbnwxfHx8fDE3NTc1MTg0Mzd8MA&ixlib=rb-4.1.0&q=80&w=1440)] bg-center bg-no-repeat bg-cover"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/85 via-primary-900/75 to-primary-900/95" />
        </div>
      </div>

      {/* Decorative ambient subtle glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-500/15 blur-3xl pointer-events-none rounded-full" />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Eyebrow badge */}


          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
            Connecting Homes with{' '}
            <span className="bg-gradient-to-r from-accent-400 via-accent-100 to-white bg-clip-text text-transparent">
              Trusted Craftsmanship
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-200/90 mb-10 leading-relaxed max-w-2xl mx-auto">
            Find vetted, skilled local service professionals for every corner of your home.
            From urgent repairs to thoughtful improvements, we make home care seamless and reliable.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center items-stretch sm:items-center max-w-md mx-auto sm:max-w-none">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold bg-accent-600 text-white rounded-xl shadow-lg shadow-accent-600/30 hover:bg-accent-500 hover:shadow-accent-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Get Started
            </Link>
            <Link
              href="/service-gigs"
              className="inline-flex items-center justify-center px-7 py-3.5 text-base font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl backdrop-blur-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Browse Services
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-neutral-300 text-xs sm:text-sm">
            <div className="flex items-center justify-center gap-2">
              <DynamicIcon name="FiShield" className="text-accent-400 text-base shrink-0" />
              <span>100% Verified Providers</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <DynamicIcon name="FiClock" className="text-accent-400 text-base shrink-0" />
              <span>Instant & Scheduled Booking</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <DynamicIcon name="CiStar" className="text-accent-400 text-lg shrink-0" />
              <span>Transparent Reviews & Ratings</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
