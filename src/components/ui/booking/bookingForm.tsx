"use client"

import { FormEvent } from "react";
import DynamicIcon from "@/components/utill/DynamicIcons";



export default function BookingForm(
    {onClose,onSubmit}: {onClose: () => void , onSubmit: (bookingRequestDto: any) => void }){

    async function onFormSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        console.log(formData);

        onSubmit(formData);
    }

    return(
        <div className="fixed inset-0 flex items-center justify-center w-full z-50"
            onClick={onClose}
        >
            <main className="max-h-[90vh] max-w-5xl grid bg-white rounded-xl shadow-xl overflow-y-auto mx-4 p-5
             gap-10"
             onClick={(event)=> event.stopPropagation()}
             >
                <div className="flex justify-end">
                    <button onClick={onClose} >
                        <DynamicIcon name="IoClose" className="w-5 h-5"/>
                    </button>
                </div>
                <header className="grid gap-5">
                    <div className="flex item-center justify-center w-full">
                        <DynamicIcon name="FaCalendarCheck" className="w-10 h-10"></DynamicIcon>
                    </div>
                    <h1 className="text-center text-lg md:text-xl lg:text-2xl" >Booking Information</h1>
                </header>
                <form onSubmit={onFormSubmit} className="w-full gap-5 grid">
                    <div className="flex justify-between gap-10">
                        <div className="grid flex-1">
                            <label htmlFor="firstName">First name</label>
                            <input type="text" name="firstName" placeholder="Enter your name" className="border-[0.5px] h-8 rounded-sm outline-none pl-2"/>
                        </div>
                        <div className="grid flex-1">
                            <label htmlFor="lastName">Last name</label>
                            <input type="text" name="lastName" placeholder="Enter your name" className="border-[0.5px] h-8 rounded-sm outline-none pl-2"/>
                        </div>
                    </div>
                    <div className="flex justify-between gap-10">
                    <div className="grid flex-1 ">
                        <label htmlFor="email">Email address</label>
                        <input type="email" name="email" placeholder="Enter your email" 
                            className="border-[0.5px] h-8 rounded-sm outline-none pl-2 "/>
                    </div>
                    <div className="grid flex-1">
                        <label htmlFor="contact">Contact number</label>
                        <input type="text" name="contact" placeholder="Enter your contact number" 
                        className="border-[0.5px] h-8 rounded-sm outline-none pl-2 "/>
                    </div>
                    </div>
                    <div className="grid">
                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" placeholder="Enter your address" className="border-[0.5px] h-8 rounded-sm outline-none pl-2"/>
                    </div>
                    <div className="flex justify-between gap-10">
                    <div className="grid ">
                        <label htmlFor="booking-date">Starting Date</label>
                        <input type="date" defaultValue={"2026-07-22"} name="booking-date" 
                        className="w-[17em] h-8 rounded-sm text-center bg-gray-200"/>
                    </div>
                    <div className="grid">
                        <label htmlFor="starting-time">Starting time</label>
                        <input type="time" defaultValue={"07:00"} name="starting-time" 
                        className="w-[17em] h-8 rounded-sm  text-center bg-gray-200"/>
                    </div>
                    </div>
                    
                        <button type="submit" className="bg-gray-200  rounded-sm h-10">Submit</button>
                </form>
            </main>
        </div>
    );
}