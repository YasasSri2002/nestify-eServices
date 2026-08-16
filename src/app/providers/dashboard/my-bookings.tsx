'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ProviderBookingResponseDto } from '@/dto/ProviderBookingDto';
import { LoadingPage } from '@/components/utill/loadingPage';
import DynamicIcon from '@/components/utill/DynamicIcons';
import Swal from 'sweetalert2';
import {
  useProviderBookings,
  useCancelBooking,
  useCompleteBooking,
} from '@/hooks/queries/useBookings';

/* ─────────────────────────── helpers ─────────────────────────── */

type BookingStatus = 'pending' | 'completed' | 'cancelled';

const STATUS_META: Record<
  BookingStatus,
  { label: string; rail: string; badge: string; icon: string }
> = {
  pending: {
    label: 'Upcoming',
    rail: 'bg-accent-500',
    badge: 'bg-accent-100 text-accent-600 border-accent-400',
    icon: 'FaRegClock',
  },
  completed: {
    label: 'Completed',
    rail: 'bg-success',
    badge: 'bg-success-bg text-success border-success',
    icon: 'IoCheckmarkDoneOutline',
  },
  cancelled: {
    label: 'Cancelled',
    rail: 'bg-error',
    badge: 'bg-error-bg text-error border-error',
    icon: 'MdClose',
  },
};

function getStatusMeta(status: string) {
  return STATUS_META[status as BookingStatus] ?? STATUS_META.pending;
}

/* ─────────────────────────── BookingRow ─────────────────────────── */

function BookingRow({ booking }: { booking: ProviderBookingResponseDto }) {
  const [localStatus, setLocalStatus] = useState<string>(booking.status);
  const meta = getStatusMeta(localStatus);

  const cancelMutation = useCancelBooking();
  const completeMutation = useCompleteBooking();

  async function handleCancel() {
    const result = await Swal.fire({
      title: 'Cancel this booking?',
      text: `${booking.name}'s booking will be cancelled.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, cancel it',
      cancelButtonText: 'Keep it',
    });

    if (!result.isConfirmed) return;

    try {
      await cancelMutation.mutateAsync(booking.id);
      setLocalStatus('cancelled');
      await Swal.fire({
        title: 'Cancelled',
        text: `${booking.name}'s booking has been cancelled.`,
        icon: 'success',
        timer: 2500,
        showConfirmButton: false,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.';
      await Swal.fire({ title: 'Error', text: msg, icon: 'error', timer: 3000 });
    }
  }

  async function handleComplete() {
    const result = await Swal.fire({
      title: 'Mark as completed?',
      text: `Confirm that ${booking.serviceGigResponseDto?.title ?? 'this service'} has been delivered.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#059669',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, mark complete',
    });

    if (!result.isConfirmed) return;

    try {
      await completeMutation.mutateAsync(booking.id);
      setLocalStatus('completed');
      await Swal.fire({
        title: 'Done!',
        text: 'Booking marked as completed.',
        icon: 'success',
        timer: 2500,
        showConfirmButton: false,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.';
      await Swal.fire({ title: 'Error', text: msg, icon: 'error', timer: 3000 });
    }
  }

  const isPending = localStatus === 'pending';

  return (
    <article className="group relative flex rounded-xl overflow-hidden bg-surface-snow shadow-[0_2px_12px_rgba(10,25,47,0.07)] hover:shadow-[0_6px_24px_rgba(10,25,47,0.13)] transition-shadow duration-300">
      {/* Status rail */}
      <span
        className={`w-1.5 shrink-0 ${meta.rail} transition-colors duration-300`}
        aria-hidden="true"
      />

      {/* Card body */}
      <div className="flex flex-col sm:flex-row flex-1 gap-4 p-5 sm:p-6">
        {/* ── Left: service + client ── */}
        <div className="flex-1 min-w-0 space-y-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-0.5">
              Service
            </p>
            <h2 className="text-base sm:text-lg font-semibold text-primary-900 leading-snug truncate">
              {booking.serviceGigResponseDto?.title ?? '—'}
            </h2>
          </div>

          <div className="flex items-start gap-3">
            {/* Client avatar placeholder */}
            <div className="w-9 h-9 rounded-full bg-surface-ice-200 flex items-center justify-center shrink-0 text-primary-700 font-bold text-sm select-none">
              {booking.name?.charAt(0)?.toUpperCase() ?? '?'}
            </div>
            <div className="min-w-0">
              <p className="font-medium text-neutral-800 truncate">{booking.name}</p>
              <p className="text-sm text-neutral-400 truncate">{booking.email}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-neutral-600">
            <span className="flex items-center gap-1.5">
              <DynamicIcon name="FiPhone" />
              {booking.contactNo}
            </span>
            <span className="flex items-center gap-1.5 max-w-[220px] truncate">
              <DynamicIcon name="CiLocationOn" />
              {booking.address}
            </span>
          </div>

          {booking.additionalInformation && (
            <p className="text-sm text-neutral-400 italic border-l-2 border-neutral-200 pl-3 leading-relaxed">
              &ldquo;{booking.additionalInformation}&rdquo;
            </p>
          )}
        </div>

        {/* ── Right: schedule + status + actions ── */}
        <div className="flex flex-col justify-between gap-4 sm:items-end sm:min-w-[180px]">
          {/* Date / Time */}
          <div className="flex sm:flex-col gap-4 sm:gap-1.5 sm:items-end">
            <div className="flex items-center gap-2 text-sm text-neutral-600 font-medium">
              <DynamicIcon name="CiCalendar" />
              <span>{booking.startingDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-600 font-medium">
              <DynamicIcon name="FaRegClock" />
              <span>{booking.startingTime}</span>
            </div>
          </div>

          {/* Status badge */}
          <span
            className={`inline-flex items-center gap-1.5 self-start sm:self-end px-3 py-1 rounded-full text-xs font-semibold border ${meta.badge}`}
          >
            <DynamicIcon name={meta.icon} />
            {meta.label}
          </span>

          {/* Actions — only for pending bookings */}
          {isPending && (
            <div className="flex gap-2 flex-wrap sm:justify-end">
              <button
                id={`complete-booking-${booking.id}`}
                disabled={completeMutation.isPending}
                onClick={handleComplete}
                title="Mark as completed"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-success border border-success
                  hover:bg-success hover:text-white active:scale-95 disabled:opacity-50 transition-all duration-150"
              >
                <DynamicIcon name="IoCheckmarkDoneOutline" />
                {completeMutation.isPending ? 'Saving…' : 'Complete'}
              </button>
              <button
                id={`cancel-booking-${booking.id}`}
                disabled={cancelMutation.isPending}
                onClick={handleCancel}
                title="Cancel booking"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-error border border-error
                  hover:bg-error hover:text-white active:scale-95 disabled:opacity-50 transition-all duration-150"
              >
                <DynamicIcon name="MdClose" />
                {cancelMutation.isPending ? 'Cancelling…' : 'Cancel'}
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────── StatusFilter ─────────────────────────── */

const FILTER_OPTIONS: { label: string; value: string }[] = [
  { label: 'All', value: '' },
  { label: 'Upcoming', value: 'pending' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
];

function StatusFilter({
  current,
  onChange,
}: {
  current: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Filter bookings by status"
      className="flex gap-2 flex-wrap"
    >
      {FILTER_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          id={`filter-${opt.value || 'all'}`}
          onClick={() => onChange(opt.value)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 active:scale-95
            ${current === opt.value
              ? 'bg-primary-900 text-white border-primary-900'
              : 'bg-surface-snow text-neutral-600 border-neutral-200 hover:border-primary-700 hover:text-primary-900'
            }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────── Pagination ─────────────────────────── */

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Booking pages"
      className="flex items-center gap-3 justify-center mt-8"
    >
      <button
        id="prev-page"
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
        className="w-9 h-9 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-600
          hover:border-primary-700 hover:text-primary-900 disabled:opacity-30 disabled:cursor-not-allowed
          transition-all duration-150 active:scale-90"
        aria-label="Previous page"
      >
        <DynamicIcon name="FaChevronLeft" />
      </button>

      <span className="text-sm text-neutral-600 font-medium tabular-nums">
        {currentPage + 1}
        <span className="mx-1.5 text-neutral-300">/</span>
        {totalPages}
      </span>

      <button
        id="next-page"
        disabled={currentPage >= totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
        className="w-9 h-9 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-600
          hover:border-primary-700 hover:text-primary-900 disabled:opacity-30 disabled:cursor-not-allowed
          transition-all duration-150 active:scale-90"
        aria-label="Next page"
      >
        <DynamicIcon name="FaChevronRight" />
      </button>
    </nav>
  );
}

/* ─────────────────────────── Empty State ─────────────────────────── */

function EmptyState({ filtered }: { filtered: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <span className="text-5xl text-neutral-200">
        <DynamicIcon name="FiCalendar" />
      </span>
      <p className="text-lg font-medium text-neutral-600">
        {filtered ? 'No bookings match this filter' : 'No bookings yet'}
      </p>
      <p className="text-sm text-neutral-400 text-center max-w-xs">
        {filtered
          ? 'Try a different status filter to see your bookings.'
          : 'When clients book your services, their requests will appear here.'}
      </p>
    </div>
  );
}

/* ─────────────────────────── Page ─────────────────────────── */

const PAGE_SIZE = 10;

export default function MyBookingPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageParam = Math.max(0, Number(searchParams.get('page') ?? '0'));
  const statusParam = searchParams.get('status') ?? '';

  // Clean Architecture: TanStack Query Hook
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useProviderBookings(pageParam, PAGE_SIZE);

  const bookings = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;
  const totalElements = data?.totalElements ?? 0;

  // Client-side status filter over current page results
  const filtered = statusParam
    ? bookings.filter((b) => b.status === statusParam)
    : bookings;

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v) params.set(k, v);
      else params.delete(k);
    });
    router.replace(`${pathname}?${params.toString()}`);
  }

  function handlePageChange(p: number) {
    updateParams({ page: String(p) });
  }

  function handleStatusChange(v: string) {
    updateParams({ status: v, page: '0' });
  }

  return (
    <main className="min-h-[80vh] p-5 md:p-8 lg:p-10">
      {/* ── Page header ── */}
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1">
          Provider Dashboard
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-900 leading-tight">
          My Bookings
        </h1>
        <p className="text-neutral-600 mt-1">
          {isLoading
            ? 'Loading…'
            : `${totalElements} booking${totalElements !== 1 ? 's' : ''} in total`}
        </p>
      </header>

      {/* ── Filters row ── */}
      <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
        <StatusFilter current={statusParam} onChange={handleStatusChange} />

        {/* Page size info */}
        {!isLoading && filtered.length > 0 && (
          <p className="text-xs text-neutral-400 tabular-nums">
            Showing {filtered.length} on this page
          </p>
        )}
      </div>

      {/* ── Content ── */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <LoadingPage />
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <span className="text-4xl text-error">
            <DynamicIcon name="MdErrorOutline" />
          </span>
          <p className="text-neutral-600 font-medium">
            {error?.message || 'Failed to load bookings.'}
          </p>
          <button
            id="retry-bookings"
            onClick={() => refetch()}
            className="mt-2 px-5 py-2 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 active:scale-95 transition-all"
          >
            Try again
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState filtered={!!statusParam} />
      ) : (
        <>
          <section aria-label="Booking list" className="grid gap-4">
            {filtered.map((booking) => (
              <BookingRow key={booking.id} booking={booking} />
            ))}
          </section>

          <Pagination
            currentPage={pageParam}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </main>
  );
}