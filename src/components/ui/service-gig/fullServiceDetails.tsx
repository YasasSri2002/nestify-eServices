'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import {
    ArrowRight,
    BadgeCheck,
    BriefcaseBusiness,
    CalendarCheck2,
    Check,
    MapPin,
    ShieldCheck,
    Sparkles,
    Wrench,
} from "lucide-react";

import ImageSlider from "@/components/imageSlider";
import BookingForm from "@/components/ui/booking/bookingForm";
import { BookingRequestDto } from "@/dto/BookingDto";
import { ServiceGigResponseDto } from "@/dto/response/ServiceGigResponseDto";
import { useAddBooking } from "@/hooks/queries/useBookings";
import { isTokenExsist } from "@/services/auth.service";
import { BookingData } from "@/types/booking";

interface FullServiceGigsDetailsProps {
    readonly gig: ServiceGigResponseDto;
}

export default function FullServiceGigsDetails({ gig }: FullServiceGigsDetailsProps) {
    const [showBookingForm, setShowBookingForm] = useState(false);
    const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL;
    const addBookingMutation = useAddBooking();
    const providerName =
        [gig.provider.firstName, gig.provider.lastName].filter(Boolean).join(" ") ||
        gig.provider.userName;
    const formattedPrice = new Intl.NumberFormat("en-LK").format(gig.basePrice ?? 0);

    const showForm = async () => {
        const tokenExists = await isTokenExsist(`/service-gigs/details/${gig.id}`);

        if (!tokenExists) {
            Swal.fire({
                title: "Sign in to book",
                html: '<p class="text-neutral-600">Sign in or create an account to reserve this service.</p>',
                showConfirmButton: true,
                confirmButtonText: "Sign in",
                footer: 'New to Nestify? <a href="/register" class="ml-2 text-accent-600">Create an account</a>',
                buttonsStyling: false,
                customClass: {
                    confirmButton:
                        "rounded-xl bg-accent-600 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-accent-500",
                },
            }).then((result) => {
                if (result.isConfirmed && loginUrl) {
                    window.location.replace(loginUrl);
                }
            });
            return;
        }

        setShowBookingForm(true);
    };

    async function handleSubmit(data: BookingData) {
        try {
            const bookingRequestDto: BookingRequestDto = {
                name: data.name,
                email: data.email,
                address: data.address,
                additionalInformation: data.additionalInformation,
                gigId: gig.id,
                providerId: gig.provider.id,
                status: "pending",
                startingDate: data.startingDate,
                startingTime: data.startingTime,
                contactNo: data.contactNo,
            };

            await addBookingMutation.mutateAsync(bookingRequestDto);
            Swal.fire({
                title: "Booking requested",
                text: "Your service request was sent successfully.",
                icon: "success",
            });
            setShowBookingForm(false);
        } catch (err: unknown) {
            console.error("Booking error:", err);
            Swal.fire({
                title: "Booking failed",
                text: err instanceof Error ? err.message : "The booking could not be created.",
                icon: "error",
            });
        }
    }

    return (
        <>
            <main className="relative overflow-hidden bg-surface-ice-100">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full border-[72px] border-accent-100/50"
                />

                <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                    <nav
                        aria-label="Breadcrumb"
                        className="mb-7 flex min-w-0 items-center gap-2 text-sm text-neutral-600"
                    >
                        <Link
                            href="/service-gigs"
                            className="shrink-0 rounded-sm font-medium transition-colors hover:text-accent-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-600"
                        >
                            Services
                        </Link>
                        <span aria-hidden="true" className="text-neutral-400">/</span>
                        <span className="shrink-0 capitalize text-neutral-600">
                            {gig.category?.name ?? "Household service"}
                        </span>
                        <span aria-hidden="true" className="text-neutral-400">/</span>
                        <span className="truncate text-neutral-800">{gig.title}</span>
                    </nav>

                    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] xl:gap-12">
                        <div className="min-w-0">
                            <div className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-surface-snow p-2 shadow-[0_20px_60px_rgba(10,25,47,0.10)] sm:p-3">
                                <ImageSlider images={["/cleaning-poster.jpg", "/user.jpg"]} />
                            </div>

                            <header className="border-b border-neutral-200 py-8 sm:py-10">
                                <div className="mb-5 flex flex-wrap items-center gap-3">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-100 px-3 py-1.5 text-xs font-semibold capitalize text-accent-600">
                                        <Wrench className="h-4 w-4" />
                                        {gig.category?.name ?? "Household service"}
                                    </span>
                                    {gig.serviceLocation && (
                                        <span className="inline-flex items-center gap-2 text-sm text-neutral-600">
                                            <MapPin className="h-4 w-4 text-neutral-400" />
                                            {gig.serviceLocation}
                                        </span>
                                    )}
                                    <span
                                        className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                                            gig.isActive ? "text-success" : "text-neutral-400"
                                        }`}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={`h-2 w-2 rounded-full ${
                                                gig.isActive ? "bg-success" : "bg-neutral-400"
                                            }`}
                                        />
                                        {gig.isActive ? "Available" : "Currently unavailable"}
                                    </span>
                                </div>

                                <h1 className="max-w-4xl font-display text-4xl font-semibold leading-[1.08] capitalize text-primary-900 sm:text-5xl lg:text-6xl">
                                    {gig.title}
                                </h1>
                                <p className="mt-5 max-w-3xl text-base leading-7 text-neutral-600 sm:text-lg">
                                    {gig.description ||
                                        "Professional household support, arranged around your home and schedule."}
                                </p>
                            </header>

                            <section className="py-8 sm:py-10" aria-labelledby="service-includes-heading">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-600">
                                    Service overview
                                </p>
                                <h2
                                    id="service-includes-heading"
                                    className="mt-2 font-display text-3xl font-semibold text-primary-900"
                                >
                                    What to expect
                                </h2>

                                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                                    <div className="rounded-2xl border border-neutral-200 bg-surface-snow p-5">
                                        <ShieldCheck className="h-5 w-5 text-accent-600" />
                                        <p className="mt-4 font-semibold text-neutral-800">Verified professional</p>
                                        <p className="mt-1 text-sm leading-6 text-neutral-600">
                                            Provider details and identity are visible before you book.
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-neutral-200 bg-surface-snow p-5">
                                        <CalendarCheck2 className="h-5 w-5 text-accent-600" />
                                        <p className="mt-4 font-semibold text-neutral-800">Choose your time</p>
                                        <p className="mt-1 text-sm leading-6 text-neutral-600">
                                            Request a date and starting time that works for your household.
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-neutral-200 bg-surface-snow p-5">
                                        <Sparkles className="h-5 w-5 text-accent-600" />
                                        <p className="mt-4 font-semibold text-neutral-800">Clear starting price</p>
                                        <p className="mt-1 text-sm leading-6 text-neutral-600">
                                            Review the base rate before sending your booking request.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section
                                aria-labelledby="provider-heading"
                                className="rounded-[2rem] border border-neutral-200 bg-surface-snow p-6 shadow-[0_4px_14px_rgba(10,25,47,0.05)] sm:p-8"
                            >
                                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                                    <div className="relative h-20 w-20 shrink-0">
                                        <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl bg-accent-400" />
                                        <Image
                                            src="/user.jpg"
                                            width={80}
                                            height={80}
                                            alt={`${providerName}'s profile picture`}
                                            className="relative h-20 w-20 rounded-2xl border-4 border-surface-snow object-cover"
                                        />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-600">
                                            Your service provider
                                        </p>
                                        <div className="mt-2 flex items-center gap-2">
                                            <h2
                                                id="provider-heading"
                                                className="font-display text-2xl font-semibold capitalize text-primary-900 sm:text-3xl"
                                            >
                                                {providerName}
                                            </h2>
                                            {gig.provider.isVerified && (
                                                <BadgeCheck
                                                    aria-label="Verified provider"
                                                    className="h-5 w-5 shrink-0 text-success"
                                                />
                                            )}
                                        </div>
                                        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">
                                            {gig.provider.shortDescription ||
                                                `${providerName} provides professional ${gig.category?.name?.toLowerCase() ?? "household"} services through Nestify.`}
                                        </p>

                                        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-neutral-600">
                                            {gig.provider.experience && (
                                                <span className="inline-flex items-center gap-2">
                                                    <BriefcaseBusiness className="h-4 w-4 text-neutral-400" />
                                                    <strong className="font-semibold text-neutral-800">Experience</strong>
                                                    <span aria-hidden="true">·</span>
                                                    {gig.provider.experience}
                                                </span>
                                            )}
                                            <span className="inline-flex items-center gap-2">
                                                <Check className="h-4 w-4 text-success" />
                                                {gig.provider.jobCount ?? 0} jobs completed
                                            </span>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/providers/details/${gig.provider.id}`}
                                        className="group inline-flex shrink-0 items-center gap-2 rounded-sm text-sm font-semibold text-primary-700 transition-colors hover:text-accent-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-600"
                                    >
                                        View profile
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
                                    </Link>
                                </div>
                            </section>
                        </div>

                        <aside className="overflow-hidden rounded-[2rem] bg-primary-900 text-white shadow-[0_24px_70px_rgba(10,25,47,0.18)] lg:sticky lg:top-8">
                            <div className="relative border-b border-white/10 px-7 pb-7 pt-8">
                                <div
                                    aria-hidden="true"
                                    className="absolute -right-12 -top-14 h-40 w-40 rounded-full border-[28px] border-accent-400/20"
                                />
                                <p className="relative text-xs font-semibold uppercase tracking-[0.18em] text-accent-400">
                                    Starting price
                                </p>
                                <p className="relative mt-3 flex flex-wrap items-baseline gap-x-2">
                                    <span className="text-sm font-semibold text-neutral-400">
                                        {gig.currency ?? "LKR"}
                                    </span>
                                    <span className="font-display text-5xl font-semibold tracking-tight">
                                        {formattedPrice}
                                    </span>
                                </p>
                                <p className="relative mt-2 text-sm text-neutral-400">
                                    per <span className="capitalize">{gig.priceType || "job"}</span>
                                </p>
                            </div>

                            <div className="space-y-4 px-7 py-7 text-sm">
                                <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                                    <span className="text-neutral-400">Provided by</span>
                                    <span className="text-right font-medium capitalize text-white">
                                        {providerName}
                                    </span>
                                </div>
                                <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                                    <span className="text-neutral-400">Service area</span>
                                    <span className="text-right font-medium text-white">
                                        {gig.serviceLocation || "Ask provider"}
                                    </span>
                                </div>
                                <div className="flex items-start justify-between gap-4">
                                    <span className="text-neutral-400">Bookings</span>
                                    <span className="font-medium text-white">
                                        {gig.totalBookingCount ?? 0} total
                                    </span>
                                </div>
                            </div>

                            <div className="px-7 pb-8">
                                <button
                                    type="button"
                                    onClick={showForm}
                                    disabled={!gig.isActive || addBookingMutation.isPending}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 px-5 py-3.5 text-sm font-semibold text-white transition-all hover:bg-accent-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-primary-700 disabled:text-neutral-400 motion-reduce:transform-none"
                                >
                                    {addBookingMutation.isPending
                                        ? "Sending request…"
                                        : gig.isActive
                                          ? "Request this service"
                                          : "Currently unavailable"}
                                    {gig.isActive && !addBookingMutation.isPending && (
                                        <ArrowRight className="h-4 w-4" />
                                    )}
                                </button>
                                <p className="mt-3 text-center text-xs leading-5 text-neutral-400">
                                    Choose your preferred date and time in the next step.
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            {showBookingForm && (
                <BookingForm
                    onClose={() => setShowBookingForm(false)}
                    onSubmit={handleSubmit}
                />
            )}
        </>
    );
}
