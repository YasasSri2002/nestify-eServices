import { Suspense } from "react";

import NavBar from "@/components/ui/navbar";
import ServiceGigReviewSection from "@/components/ui/reviews/service-gig-review-section/serviceGigReviewSection";
import FullServiceGigsDetails from "@/components/ui/service-gig/fullServiceDetails";
import { getGigsById } from "@/services/gig.service";

interface ServiceGigDetailsProps {
    readonly params: Promise<{ id: string }>;
}

async function ServiceGigDetailsContent({ params }: ServiceGigDetailsProps) {
    const { id: gigId } = await params;
    const gig = await getGigsById(gigId);

    return (
        <div className="bg-surface-ice-100">
            <FullServiceGigsDetails gig={gig} />
            <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                <ServiceGigReviewSection
                    serviceGigid={gigId}
                    providersId={gig.provider.id}
                />
            </div>
        </div>
    );
}

function ServiceGigDetailsLoading() {
    return (
        <main
            aria-busy="true"
            aria-label="Loading service details"
            className="min-h-[75vh] bg-surface-ice-100 px-4 py-12 sm:px-6 lg:px-8"
        >
            <div className="mx-auto grid max-w-7xl animate-pulse gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
                <div className="space-y-6">
                    <div className="h-[26rem] rounded-[2rem] bg-neutral-200" />
                    <div className="h-12 max-w-3xl rounded-2xl bg-neutral-200" />
                    <div className="h-6 max-w-2xl rounded-xl bg-neutral-200" />
                </div>
                <div className="h-[30rem] rounded-[2rem] bg-primary-900/10" />
            </div>
        </main>
    );
}

export default function ServiceGigDetails(props: ServiceGigDetailsProps) {
    return (
        <>
            <NavBar />
            <Suspense fallback={<ServiceGigDetailsLoading />}>
                <ServiceGigDetailsContent {...props} />
            </Suspense>
        </>
    );
}
