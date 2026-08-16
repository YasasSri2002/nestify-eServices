'use client';

import OverviewCard from './overviewCards';
import { useActiveGigsCount } from '@/hooks/queries/useGigs';
import { useProvidersCount } from '@/hooks/queries/useProviders';

export default function AdminOverview() {
  const { data: gigData, isLoading: isGigsLoading } = useActiveGigsCount();
  const { data: providerData, isLoading: isProvidersLoading } = useProvidersCount();

  const gigCount = gigData?.['Count of active gigs'] ?? (isGigsLoading ? '…' : '0');
  const providerCount = providerData?.['Provider count'] ?? (isProvidersLoading ? '…' : '0');

  return (
    <div className="grid md:grid-cols-2 justify-items-center w-full mt-5 gap-5">
      <div className="md:col-1 w-full px-5 gap-5 grid">
        <OverviewCard
          title="provider count"
          data={providerCount}
          iconName="GoPeople"
          iconColor="text-black/90"
        />
      </div>
      <div className="md:col-2 w-full px-5">
        <OverviewCard
          title="Active Service Gigs Count"
          data={gigCount}
          iconName="PiClockClockwiseFill"
          iconColor="text-green-500"
        />
      </div>
    </div>
  );
}