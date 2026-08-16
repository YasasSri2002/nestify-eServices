'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query/keys';
import {
  getUserById,
  updateUserData,
  registerUser,
} from '@/services/user.service';
import { UserResponseDto } from '@/dto/UserDto';
import { UserData, UserUpdateData } from '@/types/user';

/**
 * Clean Architecture Query Hook: Fetch current authenticated user data
 */
export function useCurrentUser() {
  return useQuery<UserResponseDto, Error>({
    queryKey: queryKeys.users.current,
    queryFn: async () => {
      return await getUserById();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Clean Architecture Mutation Hook: Register a new client user
 */
export function useRegisterUser() {
  return useMutation({
    mutationFn: async (data: UserData) => {
      return await registerUser(data);
    },
  });
}

/**
 * Clean Architecture Mutation Hook: Update user profile data
 * Automatically invalidates current user query cache upon success.
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UserUpdateData) => {
      return await updateUserData(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.current });
      queryClient.invalidateQueries({ queryKey: queryKeys.users.byId('me') });
    },
  });
}
