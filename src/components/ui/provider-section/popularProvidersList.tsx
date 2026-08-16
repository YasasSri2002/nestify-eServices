"use client";

import PopularProviderCard from "@/components/ui/provider-section/popularProviderCard";
import { usePopularProviders } from "@/hooks/queries/useProviders";
import { LoadingPage } from "@/components/utill/loadingPage";

export default function PopularProvidersList() {
  const { data: providers = [], isLoading, isError, error } = usePopularProviders();

  if (isLoading) {
    return (
      <>
        <h1 className="text-[#0A192F] text-4xl lg:text-6xl text-center my-10 font-display font-bold">
          Popular Providers
        </h1>
        <LoadingPage />
      </>
    );
  }

  if (isError) {
    return (
      <div className="text-center my-10 text-neutral-500">
        <p>Could not load popular providers at this time.</p>
      </div>
    );
  }

  return (
    <div className="h-full">
      <h1 className="text-[#0A192F] text-4xl lg:text-6xl text-center my-10 font-display font-bold">
        Popular Providers
      </h1>

      <div className="flex flex-row flex-wrap justify-center gap-5 my-10">
        {providers.map((provider) => (
          <PopularProviderCard
            key={provider.providerDto.email}
            provider={provider}
          />
        ))}
      </div>
    </div>
  );
}
