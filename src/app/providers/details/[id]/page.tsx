import { getProviderById } from "@/app/api-calls/provider/route";

export default async function ProviderDetailsPage({
    params,
}: {
    readonly params: Promise<{ id: string }>;
}) {

    const id =  (await params).id;
    const provider = await getProviderById(id);

    return (
        <div>
            <div className="grid md:grid-cols-6">
                <div className="col-span-2 border-2 border-red-400 w-full bg-gray-200">
                    <div className="flex space-x-5">
                        <h1>Provider name:</h1>
                        <h1>{provider?.providerDto?.userName}</h1>
                    </div>
                </div>

                <div className="col-span-4 border-2 border-blue-800">
                    <h1>All services this provider offers</h1>
                </div>
            </div>
        </div>
    );
}