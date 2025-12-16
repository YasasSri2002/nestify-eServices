'use client'

import { useState } from "react";

import DynamicIcon from "@/components/utill/DynamicIcons";
import { FormEvent } from "react"

 function submitForm(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        console.log(formData);
    }



export default function ReviewForm(){
   
    return(
            <div className="grid gap-15 justify-items-center content-center lg:h-dvh">
                <h1 className="md:text-2xl">Tell us how was your experience with Provider</h1>
                <form onSubmit={submitForm} className="grid content-center gap-4">
                    <div className="flex space-x-5 justify-center">
                        {
                            [...Array(5)].map((number,i)=>
                                <button  key={i}>
                                    <DynamicIcon name="FaStar" className={`text-4xl`}/>
                                </button>
                            )
                            
                        }
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="message">Leave your thoughts</label>
                        <textarea name="message" id="client-message" 
                            className="w-120 h-50 rounded-2xl px-2 pt-2 border-1 focus:outline-0 resize-none bg-gray-100"></textarea>

                    </div>
                    
                </form>
                <div className="flex justify-center items-center">
                    <button type="submit" className="rounded-xl bg-blue-600 px-5 py-1 text-white/85 hover:scale-105" >Submit</button>
                </div>
            </div>
    )
}