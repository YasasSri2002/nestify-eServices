import SearchBar from "@/components/ui/searchBar";
export default function HeroSection(){
    return(
        <>
            <div className="h-dvh w-dvw sm:w-full  grid content-center bg-gradient-to-r from-gray-100 to-gray-200 space-y-6">
        <div className="rounded text-center">
          <h1 className="grid text-4xl md:text-6xl font-bold text-primary">
            Find Trusted
            <span className="text-[rgba(3,2,18,0.80)]">Home Service Providers</span>
          </h1>
          <p className="sm:text-xl text-gray-600 mb-8">
            Connect with skilled professionals for all your household needs. From cleaning to repairs, we've got you covered.
          </p>
        </div>
        <div className="bg-white shadow-xl sm:mx-30 md:px-10 pt-10 sm:py-2 rounded-2xl">
            <SearchBar/>
        </div>
        <div className="mt-1 text-sm text-gray-500 text-center">
            Popular searches: House cleaning, Plumber, Electrician, Garden maintenance
          </div>
      </div>
        </>
    );
}