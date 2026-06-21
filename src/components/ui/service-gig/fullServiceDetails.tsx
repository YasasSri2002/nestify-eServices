'use client'

import Image from "next/image";

import DynamicIcon from "@/components/utill/DynamicIcons";
import { ServiceGigResponseDto } from "@/dto/response/ServiceGigResponseDto";
import { useState } from "react";
import BookingForm from "../booking/bookingForm";
import Swal from "sweetalert2";
import { isTokenExsist } from "@/app/api-calls/auth/token-functions/check-if-exsist/route";
import { BookingData } from "@/types/booking";
import { addBooking } from "@/app/api-calls/booking/persist/route";
import { BookingRequestDto } from "@/dto/BookingDto";
import { Star } from "lucide-react";
import ImageSlider from "@/components/imageSlider";


function showProviderDetails() {
    const providerDetailsPanel = document.getElementById(`providerDetails`);
    providerDetailsPanel?.classList.toggle('sr-only')
}

export default function FullServiceGigsDetails({ gig }: { readonly gig: ServiceGigResponseDto }) {


    const [showBookingForm, setShowBookingForm] = useState(false);
    const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL;


    const showForm = async () => {

        const tokenExsist = await isTokenExsist(`/service-gigs/details/${gig.id}`);

        if (!tokenExsist) {
            Swal.fire({
                title: "Login Required",
                html: " <p class=\"text-gray-600\"> You need to log in or create an account to book this service.</p>",
                showConfirmButton: true,
                confirmButtonText: "Sign in",
                footer: "Don't have an account?<a href=\"/register\" class=\"text-blue-600 ml-2\" autofocus>Sign up</a>",
                reverseButtons: true,
                buttonsStyling: false,
                customClass: {
                    confirmButton: "bg-black rounded-md px-4 py-2 text-white active:scale-95 transition-all duration-300 hover:bg-gray-600/10 hover:backdrop-blur-md hover:border hover:border-white/20 hover:shadow-lg hover:text-black",

                }
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.replace(loginUrl!);
                }
            });
            return null
        }
        setShowBookingForm(!showBookingForm);
    }

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
                contactNo: data.contactNo
            }
            const response = await addBooking(bookingRequestDto);
            if (response.ok) {
                Swal.fire({
                    title: "Booking Completed",
                    text: "Successfully booked",
                    icon: "success"
                })
            }
            setShowBookingForm(!showBookingForm);
        } catch (err: any) {
            console.log(err)


            Swal.fire({
                title: "Error",
                text: err.message,
                icon: "error"
            });
        }
    }

    return (
        <>
            <main className="py-5 px-5">
                {/* <div id="breadcrumb">
                    <ul className="flex gap-2">
                        <li><a href="">Home</a></li>
                        <li>&gt;</li>
                        <li><a href="/service-gigs">service gigs</a>
                        </li>
                        <li>&gt;</li>
                        <li><a href={`/service-gigs/details/${gig.id}`}>{gig.title}</a></li>

                    </ul>
                </div> */}
                <div className="grid grid-cols-6 grid gap-10">
                    {/* mobile-menue */}
                    <div className="h-full sm:hidden bg-gray-300 grid justify-items-center content-between py-2">
                        <button onClick={showProviderDetails}>
                            <DynamicIcon name="BiMenu" className="text-3xl" />
                        </button>
                        <div className="w-10 h-10 rounded-full">
                            <Image src={"https://avatar.iran.liara.run/public/boy"}
                                width={100}
                                height={100}
                                alt="provider's profile picture" />
                        </div>
                    </div>

                    {/* left-side */}

                    <div className="w-full min-h-screen h-full col-span-2 grid  relative order-2">
                        <div id="providerDetails" className="grid justify-items-center
                            absolute z-50 sr-only sm:not-sr-only gap-5 sm:p-4 
                            bg-[#F4F7F7] shadow-2xl sm:mt-6  rounded-2xl h-full sm:h-fit 
                            ">
                            <div className="w-full flex justify-end sm:sr-only ">
                                <button onClick={showProviderDetails}>
                                    <DynamicIcon name="IoMdClose" className="text-xl" />
                                </button>
                            </div>
                            <div className="w-30 h-30 rounded-full">
                                <Image src={"/user.jpg"}
                                    width={100}
                                    height={100}
                                    alt="provider's profile picture" className="rounded-full w-full h-full" />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex space-x-4 justify-center">
                                    <h1 className="md:text-xl">
                                        Get to know<span className="capitalize"> {gig.provider.userName}</span>
                                    </h1>
                                    {
                                        gig.provider.isVerified ?
                                            <DynamicIcon name="BiBadgeCheck" className="text-green-400 text-2xl" /> : ""
                                    }
                                </div>
                                <div className="grid justify-items-center mb-5">
                                    <div className="flex space-x-2 items-center">
                                        <Star fill="#F59E0B" stroke="#F59E0B" width={16} />
                                        <h2 className="font-bold text-[0.8em] text-[#1E293B]">{0}</h2>
                                        <h6 className="text-[0.8em] text-[#94A3B8]">({0} reviews)</h6>
                                    </div>
                                    <h1>Member since {gig.provider.expertise}</h1>
                                </div>

                                <p>{gig.provider.shortDescription}</p>
                            </div>
                            <div className="grid xl:grid-cols-2 ">
                                <div className="xl:col-1">
                                    <h1>Experience:{gig.provider.experience}</h1>
                                    <h1>Main Category: {gig.provider.expertise}</h1>
                                    <h1>Other Categories: </h1>
                                </div>
                                <div className="xl:col-2 gap-2 grid">
                                    <h1>Up to date {gig.provider.jobCount} jobs has successfully compeleted</h1>

                                    <div className="grid justify-items-center w-fit gap-2">
                                        <h1>Contacts</h1>
                                        <div className="flex justify-between w-full lg:">
                                            <h1>Phone:</h1> <h1>{gig.provider.contactNo}</h1>
                                        </div>
                                        <div className="flex justify-between w-full lg:">
                                            <h1>Email:</h1> <h1>{gig.provider.email}</h1>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div>
                                <button className="px-4 border-accent-400 border-2 bg-surface-ice-100 text-accent-600
                                     hover:bg-accent-500 hover:text-white active:bg-accent-500 active:scale-95 rounded-md py-2 ">
                                    Message <span className="capitalize">{gig.provider.firstName}</span>
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* right-side */}
                    <div className="col-span-5 sm:col-span-4 py-5 ">

                        <div>
                            <ImageSlider images={["/cleaning-poster.jpg", "/user.jpg"]} />
                        </div>

                        <h1 className="md:text-2xl capitalize my-3 ">{gig.title}</h1>
                        <div className="flex space-x-5 w-full items-center">
                            <h1 className="bg-blue-200 text-blue-950 border-blue-600 border
                             rounded-xl px-4 py-1">{gig.category.name}</h1>
                            <div className="flex space-x-5 items-center">
                                <div className="flex gap-1  items-center">
                                    {[1, 2, 3, 4, 5].map((number, i) => (
                                        <span key={number}>
                                            <DynamicIcon name="FaStar"
                                                className={`text-lg ${i < 1 ?
                                                    'text-yellow-400' : 'text-gray-300'}`} />
                                        </span>
                                    ))}
                                </div>
                                <div className="flex space-x-1">
                                    <h1>{1}</h1>
                                    <h2>(1 reviews)</h2>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-5 my-10">
                            <div className=" grid gap-4 ">
                                <div className="grid gap-2">
                                    <h1 className="lg:text-2xl ">About this gig</h1>
                                    <p className="text-gray-600 md:text-lg">{gig.description}</p>
                                </div>

                            </div>

                        </div>

                        <div className="grid">
                            <div className="bg-white p-5 rounded-2xl my-10">
                                <h1 className="lg:text-2xl">Abour Prices</h1>
                                <div className="ml-3">
                                    <h1>The base price: {gig.basePrice} {gig.currency}</h1>
                                    <h1>per: <span className="capitalize"> {gig.priceType} </span></h1>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end w-full">
                            <button className=" bg-[#1D4ED8] py-2 px-5 hover:bg-[#F4F7F7] w-25 
                                active:scale-95 text-white hover:text-black border-1 border-[#2563EB]
                                 active:text-black transition-all duration-200 rounded-lg"
                                onClick={showForm}
                            >
                                Book
                            </button>
                        </div>
                    </div>
                </div>

            </main>
            {
                showBookingForm &&
                <BookingForm onClose={() => setShowBookingForm(!showBookingForm)}
                    onSubmit={handleSubmit}
                />
            }


        </>


    )
}