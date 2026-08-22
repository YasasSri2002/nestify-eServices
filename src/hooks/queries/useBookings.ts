'use client';

import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import { queryKeys } from '@/lib/query/keys';
import {
  getBookingsByProviderId,
  cancelBooking,
  markBookingComplete,
  getBookingDataByClientId,
  rescheduleTheBooking,
  addBooking,
} from '@/services/booking.service';
import { getBookingCountWithUserId } from '@/services/user.service';
import { BookingResponseDto, BookingRequestDto } from '@/dto/BookingDto';
import { BookingData } from '@/types/booking';

/**
 * Clean Architecture Query Hook: Fetch paginated provider bookings (Default: 10 per page)
 */
export function useProviderBookings(page: number = 0, size: number = 10) {
  return useQuery<any, Error>({
    queryKey: queryKeys.bookings.byProvider(page, size),
    queryFn: async () => {
      return await getBookingsByProviderId(page, size);
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

/**
 * Clean Architecture Query Hook: Fetch paginated client bookings (Default: 10 per page)
 */
export function useClientBookings(page: number = 0, size: number = 10) {
  return useQuery<any, Error>({
    queryKey: queryKeys.bookings.byClient(page, size),
    queryFn: async () => {
      return await getBookingDataByClientId(page, size);
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 2,
  });
}

/**
 * Clean Architecture Query Hook: Fetch user booking count
 */
export function useUserBookingCount(userId?: string) {
  return useQuery<{ 'Booking Count': string; [key: string]: string }, Error>({
    queryKey: queryKeys.bookings.userCount(userId || 'me'),
    queryFn: async () => {
      return await getBookingCountWithUserId(userId);
    },
    staleTime: 1000 * 60 * 2,
  });
}

/**
 * Clean Architecture Mutation Hook: Create a new booking
 */
export function useAddBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingData: BookingRequestDto) => {
      return await addBooking(bookingData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

/**
 * Clean Architecture Mutation Hook: Cancel a booking
 */
export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: string) => {
      return await cancelBooking(taskId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

/**
 * Clean Architecture Mutation Hook: Mark booking as completed
 */
export function useCompleteBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return await markBookingComplete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

/**
 * Clean Architecture Mutation Hook: Reschedule a booking
 */
export function useRescheduleBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      taskId,
      rescheduleDate,
      rescheduleTime,
    }: {
      taskId: string;
      rescheduleDate: string;
      rescheduleTime: string;
    }) => {
      return await rescheduleTheBooking(taskId, rescheduleDate, rescheduleTime);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}
