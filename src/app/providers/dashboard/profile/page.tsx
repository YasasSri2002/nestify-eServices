'use client';

import { useSessionUser } from '@/hooks/queries/useAuth';
import { useProviderById } from '@/hooks/queries/useProviders';
import { useCurrentUser } from '@/hooks/queries/useUsers';
import { LoadingPage } from '@/components/utill/loadingPage';
import ProviderPerosonalInformationForm from '@/app/providers/dashboard/providerPersonalInfomation';
import { ProviderPersonalInformation } from '@/types/provider';

export default function ProviderProfileSettingsPage() {
  const { data: session, isLoading: sessionLoading } = useSessionUser();
  const userId = session?.userId ?? '';

  const { data: providerDetails, isLoading: providerLoading } = useProviderById(userId);
  const { data: currentUser, isLoading: userLoading } = useCurrentUser();

  const isInitialLoading = sessionLoading || (Boolean(userId) && providerLoading && userLoading);

  if (isInitialLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <LoadingPage />
        <p className="text-xs text-neutral-400 font-medium tracking-wide">
          Loading provider credentials…
        </p>
      </div>
    );
  }

  const pDto = providerDetails?.providerDto;

  const providerData: ProviderPersonalInformation = {
    userName: pDto?.userName || currentUser?.username || session?.userName || '',
    firstName: pDto?.firstName || currentUser?.firstName || '',
    lastName: pDto?.lastName || currentUser?.lastName || '',
    email: pDto?.email || currentUser?.email || session?.userEmail || '',
    contactNo: pDto?.contactNo || currentUser?.contact || '',
    expertise: pDto?.expertise || '',
    isVerified: pDto?.isVerified ?? false,
    address: pDto?.address || currentUser?.address || '',
    experience: pDto?.experience || '',
    shortDescription: pDto?.shortDescription || '',
  };

  return (
    <div className="max-w-6xl mx-auto py-2 sm:py-4">
      {/* ── Page Header ── */}
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1">
          Provider Dashboard
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-900 leading-tight">
          Profile &amp; Credentials
        </h1>
        <p className="text-neutral-500 text-sm mt-1">
          Manage your professional identity, contact details, and marketplace public preview.
        </p>
      </div>

      <ProviderPerosonalInformationForm
        provider={providerData}
        providerId={pDto?.id || userId}
        jobCount={pDto?.jobCount ?? 0}
        totalGigs={providerDetails?.gigs?.length ?? 0}
      />
    </div>
  );
}
