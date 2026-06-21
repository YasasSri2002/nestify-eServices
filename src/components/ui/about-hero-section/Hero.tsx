import SearchBar from "@/components/ui/searchBar";

export default function HeroSection(){
    return (
      <div className="min-h-screen xl:h-dvh w-dvw sm:w-screen md:w-full  grid content-center bg-gradient-to-br from-[#FAFBFC] to-[#EAF2F1] space-y-6">
        <div className="text-center space-y-4 md:space-y-6">
          <h1 className="grid text-4xl md:text-6xl font-bold text-[#0A192F] font-display">
            Find Trusted<span className="text-[#1E293B]">Home Service Providers</span>
          </h1>
          <p className="sm:text-xl text-[#475569] mb-4 md:mb-8">
            Connect with skilled professionals for all your household needs.
            From cleaning to repairs, we've got you covered.
          </p>
        </div>
        <div className="bg-white shadow-[0_12px_32px_rgba(10,25,47,0.12)] my-4 xl:mx-30 rounded-2xl border border-[#EAF2F1]">
          <div className="xl:relative xl:left-13">
            <SearchBar />
          </div>
        </div>
        <div className="mt-1 text-sm text-[#94A3B8] text-center">
          Popular searches: House cleaning, Plumber, Electrician, Garden
          maintenance
        </div>
      </div>
    );
}