'use client'
import DynamicIcon from "@/components/utill/DynamicIcons";
import { FormEvent } from "react";
import { date } from "zod";


export function RescheduleForm({onCancel, onSubmit}:
    {onCancel: ()=> void , onSubmit: (rescheduleDate: string, rescheduleTime: string)=> void}){
    
    function getCurrentTime(){
        const date = new Date();
        const currentTime = date.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit', hour12: false});
        return currentTime;
    }


    function handleFormSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        const formData= new FormData(event.currentTarget);

        const rescheduleDate  =formData.get("rescheduleDate") as string;
        const rescheduleTime =formData.get("rescheduleTime") as string;


        onSubmit(rescheduleDate,rescheduleTime)

        onCancel()

    }

    return(
        <div className="fixed w-full h-screen z-50  inset-0 flex justify-center items-center"
        onClick={onCancel}
        >
            {/* modal body */}
            <div className="grid max-w-5xl max-h-[90vh] bg-white rounded-xl border w-full p-5 gap-10 overflow-y-auto mx-4"
            onClick={(event)=> event.stopPropagation()}
            >

                <header className="flex justify-between items-center">
                    <h2 className="text-lg md:text-xl lg:text-2xl">
                        Give the new Date and time for reschedule
                    </h2>
                    <button onClick={onCancel}
                        className="text-lg md:text-xl lg:text-2xl"
                    >
                        <DynamicIcon name="IoClose"></DynamicIcon>
                    </button>
                </header>

                <form className="grid gap-4" onSubmit={handleFormSubmit}>
                    {/* name section */}
                    <div className="grid gap-4 sm:flex sm:justify-between sm:gap-5">
                        <div className="grid gap-2 w-full">
                            <label htmlFor="rescheduleDate">Date</label>
                            <input name="rescheduleDate" type="date" className="h-10 rounded-md bg-gray-200 w-full" 
                            defaultValue={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                         <div className="grid gap-2 w-full">
                            <label htmlFor="rescheduleTime">Time</label>
                            <input name="rescheduleTime" type="time" className="h-10 rounded-md bg-gray-200 w-full" 
                            defaultValue={getCurrentTime()}
                            />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button className="bg-black/95 text-white rounded-md h-10 w-[45%] active:scale-85">
                            Submit
                        </button>
                    </div>
                    
                </form>
            </div>

        </div>
    );
}