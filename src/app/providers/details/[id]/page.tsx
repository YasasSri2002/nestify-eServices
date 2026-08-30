import { Suspense } from "react";

import { getProviderById } from "@/services/provider.service";
import FullDetailsOfAProvider from "@/components/ui/provider-section/fullDetailsOfAProvider";
import NavBar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

interface ProviderDetailsPageProps {
    readonly params: Promise<{ id: string }>;
}

async function ProviderDetailsContent({
    params,
}: ProviderDetailsPageProps) {
    const { id } = await params;
    const provider = await getProviderById(id);

    return <FullDetailsOfAProvider providerDetails={provider}/>;
}

function ProviderDetailsLoading() {
    return (
        <main
            aria-busy="true"
            aria-label="Loading provider details"
            className="min-h-[70vh] bg-surface-ice-100 px-4 py-12 sm:px-6 lg:px-8"
        >
            <div className="mx-auto grid max-w-7xl animate-pulse gap-8 lg:grid-cols-[22rem_minmax(0,1fr)]">
                <div className="h-[34rem] rounded-[2rem] bg-primary-900/10" />
                <div className="space-y-5 pt-4">
                    <div className="h-5 w-32 rounded-full bg-accent-100" />
                    <div className="h-12 max-w-2xl rounded-2xl bg-neutral-200" />
                    <div className="h-6 max-w-xl rounded-xl bg-neutral-200" />
                    <div className="grid gap-4 pt-10 sm:grid-cols-2">
                        <div className="h-56 rounded-3xl bg-surface-snow" />
                        <div className="h-56 rounded-3xl bg-surface-snow" />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function ProviderDetailsPage(props: ProviderDetailsPageProps) {
    return (
        <div>
            <NavBar/>
            <Suspense fallback={<ProviderDetailsLoading />}>
                <ProviderDetailsContent {...props} />
            </Suspense>
            <Footer/>
        </div>
    );
}
