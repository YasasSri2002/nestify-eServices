'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import BookingProvidersCard from '@/components/ui/provider-section/bookingProvidersCard';
import DynamicIcon from '@/components/utill/DynamicIcons';
import PaginationControls from '@/components/utill/paginationControls';
import { useAllProviders } from '@/hooks/queries/useProviders';
import { useCategories } from '@/context/categoryContext';
import { FullPageLoading } from '@/components/utill/loadingPage';

export default function AllProvidersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get('page') ?? '1';
  const categoryParam = searchParams.get('category') ?? '';
  const searchParam = searchParams.get('search') ?? '';

  const [searchInput, setSearchInput] = useState(searchParam);

  // Sync local search input ONLY with URL searchParam (never with category clicks)
  useEffect(() => {
    setSearchInput(searchParam);
  }, [searchParam]);

  const pageIndex = Math.max(0, Number(page) - 1);
  const pageSize = 12;

  // The keyword sent to the backend API: typed search text takes precedence, otherwise selected category
  const activeKeyword = searchParam.trim() || (categoryParam && categoryParam !== 'all' ? categoryParam : '');

  // Fetch directly from the backend API with pageNumber, pageSize, and activeKeyword
  const { data, isLoading, isError, error } = useAllProviders(pageIndex, pageSize, activeKeyword);
  const { categories } = useCategories();

  const providers = data?.content ?? [];
  const totalElements = data?.totalElements ?? 0;
  const totalPages = data?.totalPages ?? 1;
  const isLastPage = data?.isLastPage ?? true;

  const hasActiveFilters = Boolean(searchParam.trim() || (categoryParam && categoryParam !== 'all'));

  // Category pill click handler: updates category query param without touching searchInput
  const handleCategoryClick = (categoryName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categoryName && categoryName !== 'all') {
      params.set('category', categoryName);
    } else {
      params.delete('category');
    }
    params.set('page', '1'); // Reset to page 1 on filter change
    router.push(`/providers?${params.toString()}`);
  };

  // Search submit handler: updates search query param
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchInput.trim()) {
      params.set('search', searchInput.trim());
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    router.push(`/providers?${params.toString()}`);
  };

  // Clear search button handler
  const handleClearSearch = () => {
    setSearchInput('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    params.set('page', '1');
    router.push(`/providers?${params.toString()}`);
  };

  const resetFilters = () => {
    setSearchInput('');
    router.push('/providers?page=1');
  };

  if (isLoading) return <FullPageLoading />;

  if (isError) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
          <DynamicIcon name="FiAlertCircle" className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-800">Unable to load providers</h3>
        <p className="text-slate-500 max-w-md text-sm">
          {error?.message ?? 'A connection issue occurred while fetching the providers list.'}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      {/* Hero & Search Header */}
      <section className="relative overflow-hidden bg-primary-900 px-4 pb-16 pt-14 text-white sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border-[48px] border-accent-400/20"
        />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Find Trusted Local Experts
          </h1>

          {/* Search Input Box */}
          <div className="max-w-2xl mx-auto pt-2">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.24)] p-1.5 border border-white/20"
            >
              <div className="pl-4 text-slate-400 flex items-center pointer-events-none">
                <DynamicIcon name="CiSearch" className="w-5 h-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by provider name, specialty, or city..."
                className="w-full px-3 py-3 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none font-medium"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="p-2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <DynamicIcon name="IoClose" className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-all shadow-sm cursor-pointer"
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
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10'
              }`}
            >
              All Specialties
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.name)}
                className={`px-4 py-2 rounded-xl text-xs font-medium capitalize transition-all duration-200 cursor-pointer ${
                  categoryParam.toLowerCase() === cat.name.toLowerCase()
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Results Bar / Filters Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {searchParam
                ? `Search Results for "${searchParam}"`
                : categoryParam && categoryParam !== 'all'
                ? `Specialty: ${categoryParam}`
                : 'All Available Providers'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Showing <span className="font-semibold text-slate-800">{providers.length}</span>{' '}
              {providers.length === 1 ? 'specialist' : 'specialists'}
              {totalElements > 0 && ` (Total: ${totalElements} on server)`}
            </p>
          </div>

          {/* Reset button */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
            >
              <DynamicIcon name="IoClose" className="w-3.5 h-3.5" />
              <span>Reset filter</span>
            </button>
          )}
        </div>

        {/* Provider Cards Grid */}
        {providers.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-md mx-auto my-12 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <DynamicIcon name="CiSearch" className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No matching providers</h3>
            <p className="text-slate-500 text-sm mt-1 mb-6">
              We couldn&apos;t find any service provider matching your current search criteria.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {providers.map((provider) => (
              <BookingProvidersCard
                key={provider.id || provider.email}
                providers={provider}
              />
            ))}
          </div>
        )}

        {/* Server-side Pagination Section */}
        {totalElements > 0 && (
          <div className="flex justify-center mt-12 pt-6 border-t border-slate-200">
            <PaginationControls
              hasNextPage={!isLastPage && Number(page) < totalPages}
              hasPrevPage={Number(page) > 1}
              endPage={totalElements}
              perPageNumber={String(pageSize)}
              routerPath="providers"
            />
          </div>
        )}
      </main>
    </div>
  );
}
