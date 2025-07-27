import ProviderCard from "@/components/ui/providerCard";
export default function ProvidersList(){
    return(
        <>
           <div className="h-full">
             <h1 className="text-gray-900 text-4xl lg:text-6xl text-center my-10">Popluar Providers</h1>
            <div className="flex flex-row flex-wrap justify-center gap-5">
                <div>
                    <ProviderCard/>
                </div>
                <div>
                    <ProviderCard/>
                </div>
                <div>
                    <ProviderCard/>
                </div>
                <div>
                    <ProviderCard/>
                </div>
                <div>
                    <ProviderCard/>
                </div>
                <div>
                    <ProviderCard/>
                </div>
            </div>
           </div>
        </>
    );
}