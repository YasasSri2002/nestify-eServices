'use client'

import Image from "next/image"
import { FormEvent, useState } from "react"

import DynamicIcon from "@/components/utill/DynamicIcons";
import { UserUpdateData } from "@/types/user";
import { updateUserData } from "@/app/api-calls/users/update-user-data/route";
import Swal from "sweetalert2";
import { ProviderPersonalInformation } from "@/types/provider";
import { useCategories } from "@/context/categoryContext";

export default function ProviderPerosonalInformationForm({provider}:{provider:ProviderPersonalInformation}){

    const[isEditing,setIsEditing] = useState(false);
    const { categories, loading } = useCategories();

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
        <div className=" rounded-2xl p-2 md:p-5 ">
            <form onSubmit={handleSubmit}>
                <header className="flex justify-between items-center">
                    <div className="text-wrap">
                        <h1 className="md:text-xl">Profile Settings</h1>
                        <h3 className="text-sm sm:text-md md:text-lg">Manage your account information</h3>
                    </div>
                    
                    <div className="flex-1 ml-5 sm:ml-0 sm:flex-0">
                        {
                        !isEditing ? 
                            <button className="border  border-slate-950 bg-gray-950 text-white  
                                text-sm px-2 text-nowrap sm:px-8  rounded-md sm:h-8" type="button" 
                                onClick={handleEditProfile} >
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
                <div className="my-3 flex bg-white p-5 rounded-xl shadow-lg">
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
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-semibold capitalize text-black/80">
                                {provider.firstName} {provider.lastName}
                            </h1>
                            {
                                provider.isVerified === true ? 
                                <div className=" flex items-center gap-1 border-green-600 bg-green-100 border rounded-lg py-1 px-4">
                                    <DynamicIcon name="GoVerified" className="text-green-700"/>
                                    <span>Verified</span>
                                </div>
                                
                                : ''
                            }
                        </div>
                        <h1 className="text-[#9CA3AF]">@{provider.userName} · {provider.expertise}</h1>
                    </div>
                </div>
                {/* <div className="flex justify-center w-full">
                    <div className="h-0.5 bg-gray-600 w-[98%] rounded-sm"></div>
                </div> */}
                    <div className=" bg-white rounded-2xl shadow-2xl ">
                        <div className="grid gap-3 pb-5">
                            <div className="grid gap-3">
                                <header className="bg-gray-100 p-5 rounded-t-2xl">
                                    <h1 className="text-lg md:text-xl lg:text-xl text-black/95 mb-3">
                                        Personal Information
                                    </h1>
                                    <h1 className="text-sm md:text-md lg:text-lg text-gray-400">
                                        Update your name and contact details
                                    </h1>
                                </header>
                                <div className="grid sm:flex  sm:justify-between sm:gap-8 gap-3 px-5">
                                    <div className="grid flex-1 gap-2">
                                        <label htmlFor="firstName" className="pl-0.5">First Name</label>
                                        <input type="text" 
                                            defaultValue={provider.firstName}
                                            disabled={!isEditing} 
                                            name="firstName"
                                            className={`border-gray-100 border w-full h-8 rounded-md bg-gray-100 pl-3
                                                ${isEditing ? 'outline-2 outline-blue-500 focus:outline-0' : ''}`}
                                            
                                        />
                                    </div>
                                    <div className="grid flex-1 gap-2">
                                        <label htmlFor="lastName" className="pl-0.5">Last Name</label>
                                        <input type="text" 
                                            defaultValue={provider.lastName}
                                            disabled={!isEditing}  
                                            name="lastName"
                                            className={`border-gray-100 border w-full h-8 rounded-md bg-gray-100 pl-3 
                                                ${isEditing ? 'outline-2 outline-blue-500 focus:outline-0' : ''}`} />
                                    </div>
                                </div>
                                <div className="grid flex-1 gap-2 px-5">
                                    <label htmlFor="username" className="pl-0.5">Username</label>
                                    <input type="text" 
                                            defaultValue={provider.userName} 
                                            disabled={!isEditing} 
                                            name="username"
                                            className={`border-gray-100 border w-full h-8 rounded-md bg-gray-100 pl-3
                                            ${isEditing ? 'outline-2 outline-blue-500 focus:outline-0 ' : ''}`} />
                                </div>
                                <div className="grid sm:flex  sm:justify-between sm:gap-8 gap-3 px-5">
                                    <div className="grid flex-1 gap-2">
                                        <label htmlFor="contact" className="pl-0.5">Phone Number</label>
                                        <input type="text" 
                                            defaultValue={provider.contactNo} 
                                            disabled={!isEditing} 
                                            name="contact"
                                            className={`border-gray-100 border w-full h-8 rounded-md bg-gray-100 pl-3
                                            ${isEditing ? 'outline-2 outline-blue-500 focus:outline-0' : ''}`} />
                                    </div>

                                    <div className="grid flex-1 gap-2">
                                        <label htmlFor="address" className="pl-0.5">Address</label>
                                        <input type="text" 
                                                 defaultValue={provider.address} 
                                                disabled={!isEditing} 
                                                name="address"
                                                className={`border-gray-100 border w-full h-8 rounded-md bg-gray-100 pl-3
                                                ${isEditing ? 'outline-2 outline-blue-500 focus:outline-0 ' : ''}`} />
                                    </div>
                            
                                </div>

                            </div>
            
                        </div> 
                    </div>
                    <div className="bg-white rounded-2xl">
                        <div className="grid my-5 gap-3">
                                <header className="bg-gray-100 p-5 rounded-t-2xl">
                                    <h1 className="text-lg md:text-xl lg:text-xl text-black/95 mb-3">
                                        Professional Details
                                    </h1>
                                    <h1 className="text-sm md:text-md lg:text-lg text-gray-400">
                                        Showcase your skills and experience
                                    </h1>
                                </header>
                                
                                <div className="grid sm:flex  sm:justify-between sm:gap-8 gap-3 px-5">
                                    <div className="grid flex-1 gap-2">
                                        <label htmlFor="expertise" className="pl-0.5">Expertise</label>
                                        <select name="expertise"
                                            disabled ={!isEditing}
                                            defaultValue={provider.expertise}
                                            className={`border-gray-100 border w-full h-8 rounded-md bg-gray-100 pl-3
                                            ${isEditing ? 'outline-2 outline-blue-500 focus:outline-0' : ''}`}
                                        >
                                            <option value="">Categories</option>
                                            {
                                                categories.map(category => 
                                                    <option key={category.id} value={category.name}>{category.name}</option> )
                                            }
                                        </select>
                                    </div>
                                    <div className="grid flex-1 gap-2">
                                        <label htmlFor="experience" className="pl-0.5">Years of Experience</label>
                                        <input type="text" 
                                            defaultValue={`${provider.experience} years`}
                                            disabled={!isEditing} 
                                            name="experience"
                                            className={`border-gray-100 border w-full h-8 rounded-md bg-gray-100 pl-3
                                            ${isEditing ? 'outline-2 outline-blue-500 focus:outline-0 ' : ''}`} /> 
                                    </div>
                                </div>

                                <div className="grid flex-1 gap-2 p-5">
                                    <label htmlFor="description" className="pl-0.5">Description</label>
                                    <textarea name="description" id="" defaultValue={provider.shortDescription} 
                                    disabled= {!isEditing} 
                                    className={`border-gray-100 border w-full  rounded-md bg-gray-100 p-3 resize-none
                                                ${isEditing ? 'outline-2 outline-blue-500 focus:outline-0 ' : ''}`}
                                    rows={5}
                                    cols={5}
                                    ></textarea>
                                </div>
                            </div>
                    </div>
            </form>

        </div>
    )
}