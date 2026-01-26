import Link from 'next/link'

export default function AboutHeroSction(){
    return (
      
        <div className="relative min-h-150 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div
              id="heroSection"
              className="h-dvh w-full bg-[url(https://images.unsplash.com/photo-1682973441491-6b41b7af1c6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwc2VydmljZSUyMHJlcGFpciUyMG1vZGVybnxlbnwxfHx8fDE3NTc1MTg0Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)] bg-center bg-no-repeat bg-cover flex justify-center items-center "
            >
              <div className="absolute inset-0 bg-black/50" />
            </div>      
          </div>
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Connecting Homes with Trusted Providers
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Find verified, local service professionals for all your home
                  needs. From repairs to renovations, we've got you covered.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button className="px-8 py-3 text-lg bg-white/80 rounded-lg hover:bg-white">
                      <Link href="/register">Get Started</Link>
                    </button>
                  <button className="px-8 py-3 text-lg bg-white/10 border-white/30 text-white hover:bg-white/20 
                  rounded-lg">
                    <Link href={'/service-gigs'}>Browse Services</Link> 
                  </button>
                </div>
              </div>
            </div>
        </div>
      
    );
}