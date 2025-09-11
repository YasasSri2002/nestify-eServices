export default function JourneySection(){
    return(
        <>
        <div className="h-dvh">
            <div className="grid justify-items-center gap-5 p-10 ">
                <h1 className="text-2xl">Our Journey</h1>
                <p className="text-xl text-center text-gray-800/90">From a small startup to a trusted national platform, here's how we've grown to serve millions of homeowners and thousands of service providers.</p>
            </div>
            <div className="grid sm:grid sm:grid-cols-2">
                <div className="col-1">
                    <div className="grid justify-items-center content-center p-10 gap-4">
                        <div className="flex">
                            <div className="rounded-full w-[10px] h-[10px] bg-black/90 flex justify-center items-center mb-5 p-5">
                            <h1 className="text-white">25</h1>
                        </div>
                        <div className="grid ml-5">
                            <h1 className="text-gray-600/80">2025 <span className="font-bold text-black/80">Founded</span></h1>
                            <p className="text-wrap text-gray-600/80">Started with a simple idea: connecting homeowners with trusted local professionals.</p>
                        </div>
                        
                        </div>
                        <div className="flex">
                            <div className="rounded-full w-[10px] h-[10px] bg-black/90 flex justify-center items-center mb-5 p-5">
                            <h1 className="text-white">26</h1>
                        </div>
                        <div className="grid ml-5">
                            <h1 className="text-gray-600/80">2026 <span className="font-bold text-black/80">First 1000 visiters expected</span></h1>
                            <p className="text-wrap text-gray-600/80">Reached our first milestone of verified service providers across major cities.</p>
                        </div>
                        
                        </div>
                    </div>
                    
                </div>
                <div className="col-2 p-10">
                   
                     <img src="https://images.unsplash.com/photo-1585406666850-82f7532fdae3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5keW1hbiUyMHRvb2xzJTIwc2VydmljZXxlbnwxfHx8fDE3NTc1MTg0Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="" className="rounded-3xl"/>
                   
                </div>
            </div>
        </div>
        </>
    )
}
