'use client';

import ProfileDashboard from './dashboard/dashboard';
import { useCurrentUser } from '@/hooks/queries/useUsers';
import { UserResponseDto } from '@/dto/UserDto';
import { FullPageLoading } from '@/components/utill/loadingPage';

export default function UserProfile() {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading || !user) {
    return <FullPageLoading />;
  }

  return <ProfileDashboard user={user} />;
}