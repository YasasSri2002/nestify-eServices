'use client'

import Image from "next/image"
import { FormEvent, useState } from "react"

import { UserResponseDto } from "@/dto/UserDto"

export default function PerosonalInformationForm({user}:{user:UserResponseDto}){

    const[isEditing,setIsEditing] = useState(false);

    function handleEditProfile(){
        setIsEditing(!isEditing);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement> ){
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log(formData);
        setIsEditing(!isEditing);
    }

    return(
        <div className="bg-gray-300 rounded-2xl p-2 md:p-5 ">
            <form onSubmit={handleSubmit}>
            <div className="flex justify-between">
                <div className="text-wrap">
                    <h1 className="md:text-xl">Perosonal Information</h1>
                    <h3 className="text-sm sm:text-md md:text-lg">update your personal information  and profile picture</h3>
                </div>
                
                {
                    !isEditing ? 
                    <button className="border border-slate-950 bg-gray-950 text-white text-sm px-2 py-2 
                        sm:px-8 sm:py-2 rounded-md" type="button" onClick={handleEditProfile} >
                            Edit profile
                    </button> : 
                    <div className="flex gap-5">
                        <button type="submit" 
                        className="border border-slate-950 bg-gray-950 text-white text-sm px-2 py-2 
                        sm:px-8 sm:py-2 rounded-md"
                        >
                            save
                        </button>
                        <button 
                        className="bg-white text-slate-950 text-sm px-2 py-2 
                        sm:px-8 sm:py-2 rounded-md" onClick={handleEditProfile} type="button" >
                            cancel
                        </button>
                    </div>
                }
                
            </div>
            <div className="m-3 flex">
                <Image src="/user.jpg"
                    width={100}
                    height={100}
                    alt="profile photo"
                    className="rounded-full w-25 h-25"
                ></Image>   
                <div className="grid content-center mx-5">
                    <h1 className="text-xl font-semibold capitalize">{user.firstName} {user.lastName}</h1>
                    <h1>{user.email}</h1>
                </div>
            </div>
            <div className="flex justify-center w-full">
                <div className="h-0.5 bg-gray-600 w-[98%] rounded-sm"></div>
            </div>
                <div className="m-3">
                
                    <div className="grid gap-3">
                        <div className="flex justify-between gap-8 ">
                            <div className="grid flex-1 gap-2">
                                <label htmlFor="firstName" className="pl-0.5">First Name</label>
                                <input type="text" 
                                    defaultValue={user.firstName}
                                    disabled={!isEditing} 
                                    name="firstName"
                                    className="border-white border w-full h-8 rounded-md bg-white pl-3"
                                    
                                />
                            </div>
                            <div className="grid flex-1 gap-2">
                                <label htmlFor="lastName" className="pl-0.5">Last Name</label>
                                <input type="text" 
                                    defaultValue={user.lastName}
                                    disabled={!isEditing}  
                                    name="lastName"
                                    className="border-white border w-full h-8 rounded-md bg-white pl-3" />
                            </div>
                        </div>
                        <div className="flex justify-between gap-8 ">
                            <div className="grid flex-1 gap-2">
                                <label htmlFor="email" className="pl-0.5">Email Address</label>
                                <input type="text" 
                                    defaultValue={user.email} 
                                    disabled={!isEditing} 
                                    name="email"
                                    className="border-white border w-full h-8 rounded-md bg-white pl-3" />
                            </div>
                            <div className="grid flex-1 gap-2">
                                    <label htmlFor="contact" className="pl-0.5">Contact No</label>
                                    <input type="text" 
                                        defaultValue={user.contact} 
                                        disabled={!isEditing} 
                                        name="contact"
                                        className="border-white border w-full h-8 rounded-md bg-white pl-3" />
                            </div>
                            
                        </div>
                       <div className="flex justify-between gap-8">
                            <div className="grid flex-1 gap-2">
                                <label htmlFor="paymentMethod" className="pl-0.5">Payment method</label>
                                <select name="paymentMethod" 
                                    className="w-full bg-white px-5 py-1 rounded-sm" 
                                    value={user.paymentMethod}
                                    disabled={!isEditing} >
                                    <option value="cash">cash</option>
                                    <option value="online">online</option>
                                    
                                </select>
                            </div>
                            <div className="grid flex-1 gap-2">
                                    <label htmlFor="address" className="pl-0.5">Address</label>
                                    <input type="text" 
                                        defaultValue={user.address} 
                                        disabled={!isEditing} 
                                        name="address"
                                        className="border-white border w-full h-8 rounded-md bg-white pl-3" />
                            </div>
                       </div>
                        
                    </div> 
                </div>
            </form>

        </div>
    )
}