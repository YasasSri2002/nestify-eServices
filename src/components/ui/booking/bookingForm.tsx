"use client"
import { FormEvent } from "react";

async function onSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        console.log(formData);
    }

export default function BookingForm(){

    return(
        <div className="border-1 xl:w-200 rounded-2xl px-10">
            <h1 className="text-center" >Booking Information</h1>
            <form onSubmit={onSubmit} className="w-full gap-5 grid">
                <div className="grid">
                    <label htmlFor="name">Full name</label>
                    <input type="text" name="name" placeholder="Enter your name" className="border-[0.5px] h-8 rounded-sm outline-none pl-2"/>
                </div>
                <div className="flex justify-between">
                <div className="grid ">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name="email" placeholder="Enter your email" className="border-[0.5px] h-8 rounded-sm outline-none pl-2 w-[20em]"/>
                </div>
                <div className="grid">
                    <label htmlFor="contact">Contact number</label>
                    <input type="text" name="contact" placeholder="Enter your contact number" className="border-[0.5px] h-8 rounded-sm outline-none pl-2 w-[20em]"/>
                </div>
                </div>
                <div className="grid">
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" placeholder="Enter your address" className="border-[0.5px] h-8 rounded-sm outline-none pl-2"/>
                </div>
                <div className="flex justify-between">
                <div className="grid ">
                    <label htmlFor="booking-date">Date:</label>
                    <input type="date" defaultValue={"2026-07-22"} name="booking-date" className="w-[17em] h-8 rounded-sm text-center bg-gray-200"/>
                </div>
                <div className="grid">
                    <label htmlFor="starting-time">Starting time:</label>
                    <input type="time" defaultValue={"07:00"} name="starting-time" className="w-[17em] h-8 rounded-sm  text-center bg-gray-200"/>
                </div>
                </div>
                
                    <button type="submit" className="bg-gray-200  rounded-sm h-10">Submit</button>
            </form>
        </div>
    );
}