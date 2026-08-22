'use client';

import { useSearchParams } from 'next/navigation';
import { useActiveGigs } from '@/hooks/queries/useGigs';
import { FullPageLoading } from '@/components/utill/loadingPage';
import PaginationControls from '@/components/utill/paginationControls';
import ServiceGigCard from '@/components/ui/service-gig/serviceGigCard';

export default function ProviderGigsPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const pageIndex = Math.max(0, Number(page) - 1);
  const pageSize = 10;

  const { data, isLoading } = useActiveGigs(pageIndex, pageSize);

  const gigs = data?.content ?? [];
  const totalElements = data?.totalElements ?? 0;
  const totalPages = data?.totalPages ?? 1;
  const isLastPage = data?.isLastPage ?? true;

  if (isLoading) {
    return <FullPageLoading />;
  }

  return (
    <div>
      {gigs.length === 0 ? (
        <div className="text-center py-16 text-neutral-500">
          <p className="text-xl">No active gigs found.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-5 my-10 lg:m-5">
          {gigs.map((gig) => (
            <div key={gig.id}>
              <ServiceGigCard serviceGig={gig} isEdit={true} />
            </div>
          ))}
        </div>
      )}

      {totalElements > 0 && (
        <div className="grid justify-items-center my-6">
          <PaginationControls
            hasNextPage={!isLastPage && Number(page) < totalPages}
            hasPrevPage={Number(page) > 1}
            endPage={totalElements}
            perPageNumber="10"
            routerPath="providers/dashboard/my-gigs"
          />
        </div>
      )}
    </div>
  );
}