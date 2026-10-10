'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useActiveGigs } from '@/hooks/queries/useGigs';
import { FullPageLoading } from '@/components/utill/loadingPage';
import PaginationControls from '@/components/utill/paginationControls';
import ServiceGigCard from '@/components/ui/service-gig/serviceGigCard';
import CreateGigModal from '@/components/ui/service-gig/CreateGigModal';

export default function ProviderGigsPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const pageIndex = Math.max(0, Number(page) - 1);
  const pageSize = 10;

  const { data, isLoading, refetch } = useActiveGigs(pageIndex, pageSize);

  const gigs = data?.content ?? [];
  const totalElements = data?.totalElements ?? 0;
  const totalPages = data?.totalPages ?? 1;
  const isLastPage = data?.isLastPage ?? true;

  const [modalOpen, setModalOpen] = useState(false);

  if (isLoading) {
    return <FullPageLoading />;
  }

  return (
    <div>
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1">
            Provider Dashboard
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary-900 leading-tight">
            My Gigs
          </h1>
          <p className="text-neutral-600 mt-1">
            {totalElements} active service {totalElements === 1 ? 'listing' : 'listings'}
          </p>
        </div>

        <button
          id="open-create-gig-modal"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent-600 hover:bg-accent-500 text-white font-semibold text-sm transition-all shadow-xs active:scale-95"
        >
          <span>+ Create New Gig</span>
        </button>
      </div>

      {gigs.length === 0 ? (
        <div className="text-center py-16 text-neutral-500 bg-white rounded-2xl border border-neutral-200">
          <p className="text-xl font-medium text-neutral-700">No active gigs found.</p>
          <p className="text-sm text-neutral-400 mt-1 mb-5">Start by publishing your first household service listing.</p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-600 text-white text-sm font-semibold hover:bg-accent-500 transition-all active:scale-95"
          >
            Create a Gig
          </button>
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

      {/* ── Create Gig Modal ── */}
      <CreateGigModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => refetch()}
      />
    </div>
  );
}