'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query/keys';
import { ResetPassword, LogoutUser } from '@/services/auth.service';

export interface SessionUserData {
  userId?: string;
  userName?: string;
  userEmail?: string;
  roles?: string;
}

/**
 * Clean Architecture Query Hook: Fetch current session user from cookies / auth state
 */
export function useSessionUser() {
  return useQuery<SessionUserData, Error>({
    queryKey: queryKeys.users.current,
    queryFn: async () => {
      const response = await fetch('/api-calls/users/data');
      if (!response.ok) {
        return { roles: '["notLogin"]' };
      }
      return await response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

/**
 * Clean Architecture Mutation Hook: Reset user password
 */
export function useResetPassword() {
  return useMutation({
    mutationFn: async ({
      id,
      password,
    }: {
      id: string;
      password: string;
    }) => {
      return await ResetPassword(id, password);
    },
  });
}

/**
 * Clean Architecture Mutation Hook: Logout current user and clear cache
 */
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId?: string) => {
      return await LogoutUser(userId);
    },
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.users.current, { roles: '["notLogin"]' });
      queryClient.invalidateQueries({ queryKey: queryKeys.users.current });
    },
  });
}
