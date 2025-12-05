
import { getGigsById } from "@/app/api-calls/gig/route";
import NavBar from "@/components/ui/navbar";

export default async  function ServiceGigDetails({params}:{readonly params:Promise<{id:string}> }){
    
    const gigId = (await params).id;
    const gig =  await getGigsById(gigId);

    return(

        <>
        <NavBar/>

        <div className="grid grid-cols-6">
           <div className="col-span-2 border-2 border-red-300">
                <div className="w-30 h-30 rounded-full">
                    <img src="https://avatar.iran.liara.run/public/boy"/>
                </div>
                <div>
                    <h1>{gig.provider.userName}</h1>
                </div>
           </div>
           <div className="col-span-4 border-2 border-blue-300">
                <div>
                    <h1>about this gig</h1>
                    <p>{gig.shortDescription}</p>
                </div>
                <div className="flex justify-between w-full">
                    <h1>main type</h1>
                </div>
                
                <div>
                    <h1>reviews</h1>
                </div>
                <h2>full details</h2>
           </div>
        </div>
        </>
        
    );
}