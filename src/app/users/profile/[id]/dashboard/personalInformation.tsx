'use client'

import Image from "next/image"
import { FormEvent, useState } from "react"

import { UserRequestDto, UserResponseDto } from "@/dto/UserDto"
import DynamicIcon from "@/components/utill/DynamicIcons";
import { UserUpdateData } from "@/types/user";
import { updateUserData } from "@/app/api-calls/users/update-user-data/route";
import Swal from "sweetalert2";

export default function PerosonalInformationForm({user}:{user:UserResponseDto}){

    const[isEditing,setIsEditing] = useState(false);

    function handleEditProfile(){
        setIsEditing(!isEditing);
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement> ){
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log(formData);

        const userData: UserUpdateData ={
            firstName : formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            contact: formData.get('contact') as string,
            username: formData.get('username') as string,
            address: formData.get('address') as string

        } 

        try{
            const response =await updateUserData(userData);
            Swal.fire({
                    title: "Updated Successfully!",
                    text: `data has beeen updated`,
                    icon: "success",
                })
            window.location.reload();

        }catch(err:unknown){
            if(err instanceof Error){
                Swal.fire({
                    title: "Error!",
                    text: `${err.message}`,
                    icon: "error",
                })
            }
        }




        setIsEditing(!isEditing);
    }

    return(
        <div className="bg-gray-300 rounded-2xl p-2 md:p-5 ">
            <form onSubmit={handleSubmit}>
                <header className="flex justify-between">
                    <div className="text-wrap">
                        <h1 className="md:text-xl">Perosonal Information</h1>
                        <h3 className="text-sm sm:text-md md:text-lg">update your personal information  and profile picture</h3>
                    </div>
                    
                    <div className="flex-1 ml-5 sm:ml-0 sm:flex-0">
                        {
                        !isEditing ? 
                            <button className="border  border-slate-950 bg-gray-950 text-white  
                                text-sm px-2 text-nowrap sm:px-8  rounded-md sm:h-8" type="button" onClick={handleEditProfile} >
                                    Edit profile
                            </button> : 
                            <div className="flex gap-2 sm:gap-5">
                                <button type="submit" 
                                className="border border-slate-950 bg-gray-950 text-white text-sm px-2 py-1 
                                sm:px-8 sm:py-1.5 rounded-md sm:h-8"
                                >
                                    Update
                                </button>
                                <button 
                                className="bg-white text-slate-950 text-sm px-2 py-1 
                                sm:px-8 sm:py-1.5 rounded-md  sm:h-8" onClick={handleEditProfile} type="button" >
                                    Cancel
                                </button>
                            </div>
                        }
                    </div>
                    
                </header>
                <div className="m-3 flex">
                    <div className="isolate">
                        <div className="relative z-0">
                            
                            <Image src="/user.jpg"
                                    width={100}
                                    height={100}
                                    alt="profile photo"
                                    className="rounded-full w-25 h-25"
                            ></Image> 
                            
                            {
                                isEditing ? 
                                <button className="absolute top-20 left-20"><DynamicIcon name="FaCamera" /></button> 
                                : ''
                            }
                        </div>  

                    </div>
                    <div className="grid content-center mx-5">
                        <h1 className="text-xl font-semibold capitalize">{user.username}</h1>
                        <h1>{user.email}</h1>
                    </div>
                </div>
                <div className="flex justify-center w-full">
                    <div className="h-0.5 bg-gray-600 w-[98%] rounded-sm"></div>
                </div>
                    <div className="m-3">
                    
                        <div className="grid gap-3">
                            <div className="grid mt-5 gap-3">
                                <h1 className="text-lg md:text-xl lg:text-2xl text-black/95 mb-3">Account Information</h1>
                                <div className="grid sm:flex  sm:justify-between sm:gap-8 gap-3">
                                    <div className="grid flex-1 gap-2">
                                        <label htmlFor="firstName" className="pl-0.5">First Name</label>
                                        <input type="text" 
                                            defaultValue={user.firstName}
                                            disabled={!isEditing} 
                                            name="firstName"
                                            className={`border-white border w-full h-8 rounded-md bg-white pl-3
                                                ${isEditing ? 'outline-2 outline-blue-500 focus:outline-0' : ''}`}
                                            
                                        />
                                    </div>
                                    <div className="grid flex-1 gap-2">
                                        <label htmlFor="lastName" className="pl-0.5">Last Name</label>
                                        <input type="text" 
                                            defaultValue={user.lastName}
                                            disabled={!isEditing}  
                                            name="lastName"
                                            className={`border-white border w-full h-8 rounded-md bg-white pl-3 
                                                ${isEditing ? 'outline-2 outline-blue-500 focus:outline-0' : ''}`} />
                                    </div>
                                </div>
                                <div className="grid flex-1 gap-2">
                                    <label htmlFor="username" className="pl-0.5">Username</label>
                                    <input type="text" 
                                            defaultValue={user.username} 
                                            disabled={!isEditing} 
                                            name="username"
                                            className={`border-white border w-full h-8 rounded-md bg-white pl-3
                                            ${isEditing ? 'outline-2 outline-blue-500 focus:outline-0 ' : ''}`} />
                                </div>
                            </div>
                            <div className="grid my-5 gap-3">
                                <h1 className="text-lg md:text-xl lg:text-2xl text-black/95 mb-3" >
                                Contact information
                                </h1>

                                <div className="grid sm:flex  sm:justify-between sm:gap-8 gap-3">
                                <div className="grid flex-1 gap-2">
                                        <label htmlFor="contact" className="pl-0.5">Phone Number</label>
                                        <input type="text" 
                                            defaultValue={user.contact} 
                                            disabled={!isEditing} 
                                            name="contact"
                                            className={`border-white border w-full h-8 rounded-md bg-white pl-3
                                            ${isEditing ? 'outline-2 outline-blue-500 focus:outline-0' : ''}`} />
                                    </div>

                                    <div className="grid flex-1 gap-2">
                                        <label htmlFor="address" className="pl-0.5">Address</label>
                                        <input type="text" 
                                                defaultValue={user.address} 
                                                disabled={!isEditing} 
                                                name="address"
                                                className={`border-white border w-full h-8 rounded-md bg-white pl-3
                                                ${isEditing ? 'outline-2 outline-blue-500 focus:outline-0 ' : ''}`} />
                                    </div>
                                
                                    
                                </div>
                            </div>
                            
                        </div> 
                    </div>
            </form>

        </div>
    )
}