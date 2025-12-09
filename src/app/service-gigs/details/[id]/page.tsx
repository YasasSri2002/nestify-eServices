
import { getGigsById } from "@/app/api-calls/gig/route";
import NavBar from "@/components/ui/navbar";
import FullServiceGigsDetails from "@/components/ui/service-gig/fullServiceDetails";


 

export default async  function ServiceGigDetails({params}:{readonly params:Promise<{id:string}> }){
    
    const gigId = (await params).id;
    const gig =  await getGigsById(gigId);


    return(

        <>
        <NavBar/>
        <FullServiceGigsDetails gig={gig} />
        </>
        
    );
}