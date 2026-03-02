'use client';

import { FormEvent, useState } from "react";

import DynamicIcon from "@/components/utill/DynamicIcons"
import { PasswordSchemaFormErrors } from "@/app/lib/schema/PasswordSchema";
import { passwordSchema } from "@/app/lib/schema/PasswordSchema";

export default function PasswordUpdateFrom(){

    const[errors,setErrors] = useState<PasswordSchemaFormErrors>();

    async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const formValues = {
            newPassword: formData.get("newPassword") as string,
            confirmPassword: formData.get("confirmPassword") as string
        }

        const safeData = passwordSchema.safeParse(formValues);

         if (!safeData.success) {
            setErrors(safeData.error.flatten().fieldErrors);
            return; 
        }

        setErrors({})

    }

    return(
         <div className="p-4 bg-white rounded-2xl shadow-2xl">
                <h1 className="xl:text-2xl text-gray-900">Change your password</h1>
                <h3 className="xl:text-xl text-gray-600">Update your password to keep your account secure</h3>
                <div className="xl:w-6xl py-4">
                    <form className="px-2 grid gap-3" onSubmit={handleSubmit} >
                        <div className="grid gap-2">
                            <div className="flex gap-1 items-center">
                                <DynamicIcon name="FaLock"></DynamicIcon>
                                <label htmlFor="newPassword">New password</label>
                            </div>
                            <input type="text"  
                                    className="border border-black bg-white/50 p-1 rounded-sm lg:outline-none"
                                    name="newPassword"/>
                            {errors?.newPassword && <p className="text-red-500 text-sm pl-1">{errors.newPassword[0]}</p> }
                        </div>
                        <div className="grid gap-2">
                            <div className="flex gap-1 items-center">
                                <DynamicIcon name="FaLock"></DynamicIcon>
                                <label htmlFor="confirmPassword">Confirm new password</label>
                            </div>
                            <input type="text"  
                                    className="border border-black bg-white/50 p-1 rounded-sm lg:outline-none"
                                    name="confirmPassword"/>
                            {errors?.confirmPassword && <p className="text-red-500 text-sm pl-1">{errors.confirmPassword[0]}</p> }
                        </div>
                        <div>
                            <button type="submit" 
                                className="bg-slate-950 rounded-md  px-2 py-1 text-white active:scale-75">
                                    Comfirm
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    )
}