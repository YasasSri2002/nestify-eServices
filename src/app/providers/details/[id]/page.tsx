import { getProviderById } from "@/app/api-calls/provider/with-id/route";
import FullDetailsOfAProvider from "@/components/ui/provider-section/fullDetailsOfAProvider";
import NavBar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";


export default async function ProviderDetailsPage({
    params,
}: {
    readonly params: Promise<{ id: string }>;
}) {

    const id =  (await params).id;
    const provider = await getProviderById(id);

    return (
        <div>
            <NavBar/>
            <FullDetailsOfAProvider providerDetails={provider}/>
            <Footer/>
        </div>
    );
}