import SearchBar from "@/components/ui/searchBar";
export default function HeroSection(){
    return(
        <>
          
            <div className="min-h-screen xl:h-dvh w-dvw sm:w-screen md:w-full  grid content-center bg-gradient-to-r from-gray-100 to-gray-200 space-y-6">
        <div className="text-center space-y-4 md:space-y-6">
          <h1 className="grid text-4xl md:text-6xl font-bold text-primary">
            Find Trusted
            <span className="text-[rgba(3,2,18,0.80)]">Home Service Providers</span>
          </h1>
          <p className="sm:text-xl text-gray-600 mb-4 md:mb-8">
            Connect with skilled professionals for all your household needs. From cleaning to repairs, we've got you covered.
          </p>
        </div>
        <div className="bg-white shadow-xl my-4 xl:mx-30 md:px-10 pt-2 sm:py-2 rounded-2xl">
            <SearchBar/>
        </div>
        <div className="mt-1 text-sm text-gray-500 text-center">
            Popular searches: House cleaning, Plumber, Electrician, Garden maintenance
          </div>
      </div>
        </>
    );
}