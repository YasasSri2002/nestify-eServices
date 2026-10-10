'use client';

import { useSessionUser } from '@/hooks/queries/useAuth';
import { useProviderById } from '@/hooks/queries/useProviders';
import { useCurrentUser } from '@/hooks/queries/useUsers';
import { FullPageLoading } from '@/components/utill/loadingPage';
import ProviderPerosonalInformationForm from '@/app/providers/dashboard/providerPersonalInfomation';
import { ProviderPersonalInformation } from '@/types/provider';

export default function ProviderProfileSettingsPage() {
  const { data: session, isLoading: sessionLoading } = useSessionUser();
  const userId = session?.userId ?? '';

  const { data: providerDetails, isLoading: providerLoading } = useProviderById(userId);
  const { data: currentUser, isLoading: userLoading } = useCurrentUser();

  if (sessionLoading || (userId && providerLoading && userLoading)) {
    return <FullPageLoading />;
  }

  const pDto = providerDetails?.providerDto;

  const providerData: ProviderPersonalInformation = {
    userName: pDto?.userName || currentUser?.username || session?.userName || '',
    firstName: pDto?.firstName || currentUser?.firstName || '',
    lastName: pDto?.lastName || currentUser?.lastName || '',
    email: pDto?.email || currentUser?.email || session?.userEmail || '',
    contactNo: pDto?.contactNo || currentUser?.contact || '',
    expertise: pDto?.expertise || 'General',
    isVerified: pDto?.isVerified ?? false,
    address: pDto?.address || currentUser?.address || '',
    experience: pDto?.experience || '',
    shortDescription: pDto?.shortDescription || '',
  };

  return (
    <div className="max-w-4xl mx-auto py-2 sm:py-4">
      <ProviderPerosonalInformationForm provider={providerData} />
    </div>
  );
}
