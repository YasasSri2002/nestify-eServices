import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarCheck2,
  Clock3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";

import { ProviderWithAllDetails } from "@/dto/ProviderDto";

interface FullDetailsOfAProviderProps {
  readonly providerDetails: ProviderWithAllDetails;
}

export default function FullDetailsOfAProvider({
  providerDetails,
}: FullDetailsOfAProviderProps) {
  const {
    providerDto: provider,
    reviewDto = [],
    categoryDto = [],
    gigs = [],
  } = providerDetails;
  const activeGigs = gigs.filter((gig) => gig.isActive);
  const displayName =
    [provider.firstName, provider.lastName].filter(Boolean).join(" ") ||
    provider.userName;
  const validRatings = reviewDto
    .map((review) => Number(review.rating))
    .filter((rating) => Number.isFinite(rating) && rating >= 1 && rating <= 5);
  const averageRating = validRatings.length
    ? validRatings.reduce((total, rating) => total + rating, 0) /
      validRatings.length
    : 0;

  return (
    <main className="relative overflow-hidden bg-surface-ice-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-16 h-96 w-96 rounded-full border-[72px] border-accent-100/50"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <nav aria-label="Breadcrumb" className="mb-7 flex items-center gap-2 text-sm text-neutral-600">
          <Link
            href="/providers"
            className="rounded-sm font-medium transition-colors hover:text-accent-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-600"
          >
            Providers
          </Link>
          <span aria-hidden="true" className="text-neutral-400">/</span>
          <span className="truncate text-neutral-800">{displayName}</span>
        </nav>

        <div className="grid items-start gap-8 lg:grid-cols-[22rem_minmax(0,1fr)] xl:gap-12">
          <aside className="overflow-hidden rounded-[2rem] bg-primary-900 text-white shadow-[0_24px_70px_rgba(10,25,47,0.18)] lg:sticky lg:top-8">
            <div className="relative border-b border-white/10 px-7 pb-8 pt-9">
              <div
                aria-hidden="true"
                className="absolute -right-12 -top-14 h-40 w-40 rounded-full border-[28px] border-accent-400/20"
              />

              <div className="relative mb-6 h-24 w-24">
                <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-[1.75rem] bg-accent-400" />
                <Image
                  src="/user.jpg"
                  width={96}
                  height={96}
                  priority
                  alt={`${displayName}'s profile picture`}
                  className="relative h-24 w-24 rounded-[1.75rem] border-4 border-primary-900 object-cover"
                />
              </div>

              <div className="relative flex items-start gap-2">
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent-400">
                    Local professional
                  </p>
                  <h1 className="font-display text-3xl font-semibold leading-tight capitalize sm:text-4xl">
                    {displayName}
                  </h1>
                  <p className="mt-2 text-sm text-neutral-400">@{provider.userName}</p>
                </div>
                {provider.isVerified && (
                  <BadgeCheck
                    aria-label="Verified provider"
                    className="mt-7 h-6 w-6 shrink-0 text-accent-400"
                  />
                )}
              </div>

              {provider.expertise && (
                <p className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white">
                  <Wrench className="h-4 w-4 text-accent-400" />
                  {provider.expertise}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 border-b border-white/10">
              <div className="border-r border-white/10 px-6 py-5">
                <p className="text-2xl font-semibold">{provider.jobCount ?? 0}</p>
                <p className="mt-1 text-xs text-neutral-400">Jobs completed</p>
              </div>
              <div className="px-6 py-5">
                <p className="flex items-center gap-1.5 text-2xl font-semibold">
                  {averageRating ? averageRating.toFixed(1) : "New"}
                  {averageRating > 0 && <Star className="h-4 w-4 fill-rating text-rating" />}
                </p>
                <p className="mt-1 text-xs text-neutral-400">
                  {validRatings.length} {validRatings.length === 1 ? "review" : "reviews"}
                </p>
              </div>
            </div>

            <div className="space-y-4 px-7 py-7 text-sm">
              {provider.address && (
                <div className="flex items-start gap-3 text-neutral-200">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                  <span>{provider.address}</span>
                </div>
              )}
              {provider.email && (
                <a
                  href={`mailto:${provider.email}`}
                  className="flex items-center gap-3 text-neutral-200 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-400"
                >
                  <Mail className="h-4 w-4 shrink-0 text-accent-400" />
                  <span className="truncate">{provider.email}</span>
                </a>
              )}
              {provider.contactNo && (
                <a
                  href={`tel:${provider.contactNo}`}
                  className="flex items-center gap-3 text-neutral-200 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-400"
                >
                  <Phone className="h-4 w-4 shrink-0 text-accent-400" />
                  <span>{provider.contactNo}</span>
                </a>
              )}
            </div>
          </aside>

          <section className="min-w-0">
            <div className="border-b border-neutral-200 pb-8 sm:pb-10">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                {provider.isVerified && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-success-bg px-3 py-1.5 text-xs font-semibold text-success">
                    <ShieldCheck className="h-4 w-4" />
                    Identity verified
                  </span>
                )}
                {provider.experience && (
                  <span className="inline-flex items-center gap-2 text-sm text-neutral-600">
                    <BriefcaseBusiness className="h-4 w-4 text-neutral-400" />
                    <span>
                      <span className="font-semibold text-neutral-800">Experience</span>
                      <span aria-hidden="true"> · </span>
                      {provider.experience}
                    </span>
                  </span>
                )}
              </div>

              <h1 className="max-w-3xl font-display text-3xl font-bold leading-tight text-primary-900 sm:text-4xl lg:text-5xl">
                {provider.expertise
                  ? `Expert ${provider.expertise.toLowerCase()} services${provider.address ? ` in ${provider.address}` : ""}`
                  : `Trusted household services by ${displayName}`}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
                {provider.shortDescription ||
                  `${displayName} offers practical, professional household services through Nestify.`}
              </p>

              {categoryDto.length > 0 && (
                <div className="mt-7 flex flex-wrap gap-2" aria-label="Service categories">
                  {categoryDto.map((category) => (
                    <span
                      key={category.id}
                      className="rounded-lg border border-surface-aqua-pale bg-surface-snow px-3 py-2 text-sm font-medium capitalize text-primary-700"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-8 sm:pt-10">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-600">
                    Available to book
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-semibold text-primary-900">
                    Services by {provider.firstName || provider.userName}
                  </h2>
                </div>
                <span className="hidden text-sm text-neutral-600 sm:block">
                  {activeGigs.length} {activeGigs.length === 1 ? "service" : "services"}
                </span>
              </div>

              {activeGigs.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-neutral-200 bg-surface-snow px-6 py-14 text-center">
                  <CalendarCheck2 className="mx-auto h-9 w-9 text-neutral-400" />
                  <h3 className="mt-4 text-lg font-semibold text-primary-900">
                    No services are available right now
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-600">
                    Browse other trusted providers to find a service that fits your needs.
                  </p>
                  <Link
                    href="/providers"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-600"
                  >
                    Browse providers <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {activeGigs.map((gig) => (
                    <Link
                      href={`/service-gigs/details/${gig.id}`}
                      key={gig.id}
                      className="group flex min-h-56 flex-col rounded-3xl border border-neutral-200 bg-surface-snow p-6 shadow-[0_4px_12px_rgba(10,25,47,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-accent-400 hover:shadow-[0_16px_38px_rgba(10,25,47,0.11)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-600 motion-reduce:transform-none motion-reduce:transition-none"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-100 text-accent-600">
                          <Wrench className="h-5 w-5" />
                        </span>
                        <p className="text-right">
                          <span className="block text-lg font-bold text-primary-900">
                            {gig.currency ?? "LKR"} {gig.basePrice ?? 0}
                          </span>
                          <span className="text-xs text-neutral-400">per {gig.priceType || "job"}</span>
                        </p>
                      </div>

                      <h3 className="mt-5 text-lg font-bold leading-snug text-neutral-800 transition-colors group-hover:text-accent-600">
                        {gig.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-600">
                        {gig.shortDescription || "View this service for full details and booking options."}
                      </p>

                      <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                        <span className="inline-flex items-center gap-1.5 text-xs text-neutral-600">
                          <Clock3 className="h-4 w-4 text-neutral-400" />
                          {gig.durationByHours
                            ? `${gig.durationByHours} ${gig.durationByHours === 1 ? "hour" : "hours"}`
                            : "Flexible duration"}
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent-600">
                          View service
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
