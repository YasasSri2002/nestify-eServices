"use client"
import { FormEvent } from "react";

async function onSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        console.log(formData);
    }

export default function BookingForm(){

    return(
        <>
            
            <h1>Please kindly fill the data</h1>
            <form onSubmit={onSubmit}>
                <div className="flex">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name"/>
                </div>
                <div className="flex">
                    <label htmlFor="booking-date">Date:</label>
                    <input type="date" name="booking-date"/>
                </div>
                <div className="flex space-x-5">
                    <div>
                        <label htmlFor="starting-time">Starting time:</label>
                        <input type="time" name="starting-time"/>
                    </div>
                    <div>
                        <label htmlFor="ending-time">ending time:</label>
                        <input type="time" name="ending-time"/>
                    </div>
                </div>
                <div className="flex">
                    <label htmlFor="payment">payment:</label>
                    <input type="number" name="payment"/>
                </div>
                
                    <button type="submit">submit</button>
            </form>
        </>
    );
}