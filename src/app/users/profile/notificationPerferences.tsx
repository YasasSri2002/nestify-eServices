'use client'
import { useState } from "react";
import ToggleButton from "@/components/toggleBtn";
import DynamicIcon from "@/components/utill/DynamicIcons";


export function NotificationPerferences(){
    
    const[emailTogglebBtn,setEmailTogglebBtn] = useState(true);
    const[bookingConfirmationTogglebBtn,setBookingConfirmationTogglebBtn] = useState(true);
    const[providerUpdatesTogglebBtn,setProviderUpdatesTogglebBtn] = useState(false);
    const[marketingEmailTogglebBtn,setMarketingEmailTogglebBtn] = useState(true);

    return(
        <div className="m-5 lg:m-10 p-5 rounded-2xl shadow-2xl bg-white/80 grid gap-4">
            <div>
                <h1 className="lg:text-2xl">Notification perferences</h1>
                <h1 className="lg:text-xl text-gray-600">choose how you want to recive updates </h1>
            </div>

            <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <div>
                        <div className="flex gap-1 sm:gap-2 items-center text-md lg:text-lg">
                            <DynamicIcon name="MdOutlineEmail"></DynamicIcon>
                            <h1>Email Notifications</h1>
                        </div>
                        <h1 className="text-sm lg:text-md text-gray-600">Recieve booking confirmations and updates via email </h1>
                    </div>
                    <div>
                        <ToggleButton checked={emailTogglebBtn} onChange={setEmailTogglebBtn} size="sm"  />
                    </div>
                </div>  
                <div className="flex justify-between items-center">
                    <div>
                        <div className="flex gap-1 sm:gap-2 items-center text-md lg:text-lg">
                            <DynamicIcon name="CiBellOn"></DynamicIcon>
                            <h1>Booking Reminders</h1>
                        </div>
                        <h1 className="lg:text-md text-gray-600">Get reminded before your scheduled booking </h1>
                    </div>
                    <div>
                        <ToggleButton checked={bookingConfirmationTogglebBtn} onChange={setBookingConfirmationTogglebBtn} 
                            size="sm"/>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <div className="flex gap-1 sm:gap-2 items-center text-md lg:text-lg">
                            <DynamicIcon name="CiBellOn"></DynamicIcon>
                            <h1>Provider Updates</h1>
                        </div>
                        <h1 className="lg:text-md text-gray-600">Recive updates from your service provider </h1>
                    </div>
                    <div>
                        <ToggleButton checked={providerUpdatesTogglebBtn} onChange={setProviderUpdatesTogglebBtn} size="sm"/>
                    </div>
                </div>

                 <div className="flex justify-between items-center">
                  <div>
                        <div className="flex gap-2 items-center lg:text-lg">
                            <DynamicIcon name="MdOutlineEmail"></DynamicIcon>
                            <h1>Marketing Emails</h1>
                        </div>
                        <h1 className="lg:text-md text-gray-600">Recieve Promotional offers and service recommendations </h1>
                    </div>
                    <div>
                        <ToggleButton checked={marketingEmailTogglebBtn} onChange={setMarketingEmailTogglebBtn} size="sm"/>
                    </div>
                </div> 

            </div>

        </div>
    )

}