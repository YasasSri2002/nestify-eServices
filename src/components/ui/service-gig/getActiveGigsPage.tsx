'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useActiveGigs } from '@/hooks/queries/useGigs';
import { useCategories } from '@/context/categoryContext';
import { FullPageLoading } from '@/components/utill/loadingPage';
import PaginationControls from '@/components/utill/paginationControls';
import DynamicIcon from '@/components/utill/DynamicIcons';
import ServiceGigCard from './serviceGigCard';

export default function AllActiveGigsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get('page') ?? '1';
  const perPage = searchParams.get('per_page') ?? '12';
  const searchParam = searchParams.get('search') ?? '';
  const categoryParam = searchParams.get('category') ?? '';

  const [searchInput, setSearchInput] = useState(searchParam);

  // Sync search bar text only with explicit search param changes
  useEffect(() => {
    setSearchInput(searchParam);
  }, [searchParam]);

  const pageIndex = Math.max(0, Number(page) - 1);
  const pageSize = Number(perPage) || 12;

  const { data, isLoading, isError, error } = useActiveGigs(pageIndex, pageSize);
  const { categories } = useCategories();

  const gigs = Array.isArray(data) ? data : (data?.content ?? []);
  const totalElements = Array.isArray(data) ? data.length : (data?.totalElements ?? gigs.length);
  const totalPages = data?.totalPages ?? Math.max(1, Math.ceil(totalElements / pageSize));
  const isLastPage = data?.isLastPage ?? (Number(page) >= totalPages);

  const hasActiveFilters = Boolean(searchParam.trim() || (categoryParam && categoryParam !== 'all'));

  // Category pill click handler
  const handleCategoryClick = (categoryName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categoryName && categoryName !== 'all') {
      params.set('category', categoryName);
    } else {
      params.delete('category');
    }
    params.set('page', '1');
    router.push(`/service-gigs?${params.toString()}`);
  };

  // Search submit handler
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchInput.trim()) {
      params.set('search', searchInput.trim());
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    router.push(`/service-gigs?${params.toString()}`);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchInput('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    params.set('page', '1');
    router.push(`/service-gigs?${params.toString()}`);
  };

  const resetFilters = () => {
    setSearchInput('');
    router.push('/service-gigs?page=1');
  };

  if (isLoading) return <FullPageLoading />;

  if (isError) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="w-16 h-16 rounded-full bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center">
          <DynamicIcon name="FiAlertCircle" className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-[#1E293B]">Unable to load services</h3>
        <p className="text-[#475569] max-w-md text-sm">
          {error?.message ?? 'Failed to load gigs. Please check your connection or try again later.'}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      {/* ── Hero & Search Header ── */}
      <section className="relative overflow-hidden bg-primary-900 px-4 pb-16 pt-14 text-white sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border-[48px] border-accent-400/20"
        />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Browse Services
          </h1>
          <p className="text-[#94A3B8] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Explore household services posted by verified local professionals.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto pt-2">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.24)] p-1.5"
            >
              <div className="pl-4 flex items-center pointer-events-none">
                <DynamicIcon name="CiSearch" className="w-5 h-5 text-[#94A3B8]" />
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by service name, location, or category..."
                className="w-full px-3 py-3 text-sm text-[#1E293B] placeholder-[#94A3B8] bg-transparent outline-none font-medium"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="p-2 text-[#94A3B8] hover:text-[#475569] transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <DynamicIcon name="IoClose" className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-[#2563EB] text-white font-medium text-xs transition-all shadow-sm cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>

          {/* Category Filter Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            <button
              onClick={() => handleCategoryClick('')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                !categoryParam || categoryParam === 'all'
                  ? 'bg-[#1D4ED8] text-white shadow-md shadow-[#1D4ED8]/30'
                  : 'bg-white/10 hover:bg-white/20 text-[#E2E8F0] border border-white/10'
              }`}
            >
              All Services
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.name)}
                className={`px-4 py-2 rounded-xl text-xs font-medium capitalize transition-all duration-200 cursor-pointer ${
                  categoryParam.toLowerCase() === cat.name.toLowerCase()
                    ? 'bg-[#1D4ED8] text-white shadow-md shadow-[#1D4ED8]/30'
                    : 'bg-white/10 hover:bg-white/20 text-[#E2E8F0] border border-white/10'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Results summary bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0] mb-8">
          <div>
            <h2 className="text-xl font-bold text-[#1E293B]">
              {searchParam
                ? `Results for "${searchParam}"`
                : categoryParam && categoryParam !== 'all'
                ? `Category: ${categoryParam}`
                : 'All Active Services'}
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-0.5">
              Showing{' '}
              <span className="font-semibold text-[#1E293B]">{gigs.length}</span>{' '}
              {gigs.length === 1 ? 'service' : 'services'}
              {totalElements > 0 && ` — Page ${page} of ${totalPages}`}
            </p>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-[#1D4ED8] bg-[#DBEAFE] hover:bg-[#BFDBFE] transition-colors cursor-pointer"
            >
              <DynamicIcon name="IoClose" className="w-3.5 h-3.5" />
              <span>Reset filter</span>
            </button>
          )}
        </div>

        {/* Gig Cards Grid */}
        {gigs.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#E2E8F0] p-12 text-center max-w-md mx-auto my-12 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#F4F7F7] text-[#94A3B8] flex items-center justify-center mx-auto mb-4">
              <DynamicIcon name="CiSearch" className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#1E293B]">No services found</h3>
            <p className="text-[#475569] text-sm mt-1 mb-6">
              No active service gigs match your criteria right now.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#1D4ED8] text-white font-medium text-sm hover:bg-[#2563EB] active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {gigs.map((gig) => (
              <ServiceGigCard key={gig.id} serviceGig={gig} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalElements > 0 && (
          <div className="flex justify-center mt-12 pt-6 border-t border-[#E2E8F0]">
            <PaginationControls
              hasNextPage={!isLastPage && Number(page) < totalPages}
              hasPrevPage={Number(page) > 1}
              endPage={totalElements}
              perPageNumber={String(pageSize)}
              routerPath="service-gigs"
            />
          </div>
        )}
      </main>
    </div>
  );
}
