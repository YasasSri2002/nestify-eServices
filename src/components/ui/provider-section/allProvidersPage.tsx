'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import BookingProvidersCard from '@/components/ui/provider-section/bookingProvidersCard';
import DynamicIcon from '@/components/utill/DynamicIcons';
import PaginationControls from '@/components/utill/paginationControls';
import { useAllProviders } from '@/hooks/queries/useProviders';
import { FullPageLoading } from '@/components/utill/loadingPage';

export default function AllProvidersPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const pageIndex = Math.max(0, Number(page) - 1);
  const pageSize = 10;

  const { data, isLoading } = useAllProviders(pageIndex, pageSize);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const providers = data?.content ?? [];
  const totalElements = data?.totalElements ?? 0;
  const totalPages = data?.totalPages ?? 1;
  const isLastPage = data?.isLastPage ?? true;

  if (isLoading) return <FullPageLoading />;

  return (
    <div className="grid justify-items-center sm:justify-items-normal">
      <div>
        <div className="bg-gray-600 flex items-center justify-between p-5 gap-4">
          {/* Search */}
          <div className="flex items-center space-x-2 w-full md:w-auto ">
            <DynamicIcon name="CiSearch" className="relative left-10 text-gray-900" />
            <input
              type="text"
              placeholder="Search providers..."
              className="bg-white rounded-lg px-10 py-2 w-full md:w-64 lg:w-150"
            />
          </div>

          {/* Desktop filters */}
          <div className="gap-5 hidden md:flex">
            <button className="px-5 py-2 rounded-xl border text-white hover:bg-white hover:text-black transition">
              Service Category
            </button>
            <button className="px-5 py-2 rounded-xl border text-white hover:bg-white hover:text-black transition">
              Job Count
            </button>
            <button className="px-5 py-2 rounded-xl border text-white hover:bg-white hover:text-black transition">
              Experience
            </button>
          </div>

          {/* Mobile filter button */}
          <div className="md:hidden flex justify-end">
            <button onClick={() => setMobileFilterOpen(!mobileFilterOpen)}>
              <DynamicIcon name="HiOutlineAdjustmentsHorizontal" className="text-2xl text-white" />
            </button>
          </div>

          {/* Mobile filters */}
          {mobileFilterOpen && (
            <div className="grid gap-3 md:hidden">
              <button className="filter-btn">Service Category</button>
              <button className="filter-btn">Job Count</button>
              <button className="filter-btn">Experience</button>
            </div>
          )}
        </div>

        <div className="bg-white w-dvw sm:w-full p-10">
          {providers.length === 0 ? (
            <div className="text-center py-10 text-neutral-500">
              <p className="text-xl">No providers found.</p>
            </div>
          ) : (
            <div className="grid justify-items-center md:flex md:justify-between md:flex-wrap w-full gap-5">
              {providers.map((provider) => (
                <BookingProvidersCard key={provider.email} providers={provider} />
              ))}
            </div>
          )}
        </div>

        {/* Server-side Pagination controls with page size 10 */}
        <div className="grid col-span-4 justify-items-center my-6">
          <PaginationControls
            hasNextPage={!isLastPage && Number(page) < totalPages}
            hasPrevPage={Number(page) > 1}
            endPage={totalElements}
            perPageNumber="10"
            routerPath="providers"
          />
        </div>
      </div>
    </div>
  );
}