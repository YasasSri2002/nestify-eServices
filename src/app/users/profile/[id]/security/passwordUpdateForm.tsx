'use client';

import { FormEvent, useState } from "react";

import DynamicIcon from "@/components/utill/DynamicIcons"
import { PasswordSchemaFormErrors } from "@/lib/schema/PasswordSchema";
import { passwordSchema } from "@/lib/schema/PasswordSchema";
import { ResetPassword } from "@/app/api-calls/auth/reset-password/route";
import { useParams } from "next/navigation";
import Swal from "sweetalert2";

export default function PasswordUpdateFrom() {

    const params = useParams();

    const id = params.id as string;

    const [errors, setErrors] = useState<PasswordSchemaFormErrors>();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

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

        try {

            console.log("from the form page--->", safeData.data.newPassword)
            const result = await ResetPassword(id, safeData.data.newPassword);
            form.reset();

            Swal.fire({
                title: "reset successfull",
                icon: "success",
                timer: 3000,
                timerProgressBar: true,
                text: result["success"]

            });




        } catch (err: unknown) {
            console.log(err)
        }



    }

    return (
        <div className="p-4 bg-surface-snow rounded-2xl shadow-2xl">
            <h1 className="xl:text-2xl text-neutral-800">Change your password</h1>
            <h3 className="xl:text-xl text-neutral-600">Update your password to keep your account secure</h3>
            <div className="xl:w-6xl py-4">
                <form className="px-2 grid gap-3" onSubmit={handleSubmit} >
                    <div className="grid gap-2">
                        <div className="flex gap-1 items-center">
                            {/* <DynamicIcon name="FaLock"></DynamicIcon> */}
                            <label htmlFor="newPassword">New password</label>
                        </div>
                        <input type="text"
                            className="border border-black bg-white/50 p-1 rounded-sm lg:outline-none"
                            name="newPassword" />
                        {errors?.newPassword && <p className="text-error text-sm pl-1">{errors.newPassword[0]}</p>}
                    </div>
                    <div className="grid gap-2">
                        <div className="flex gap-1 items-center">
                            {/* <DynamicIcon name="FaLock"></DynamicIcon> */}
                            <label htmlFor="confirmPassword">Confirm new password</label>
                        </div>
                        <input type="text"
                            className="border border-black bg-white/50 p-1 rounded-sm lg:outline-none"
                            name="confirmPassword" />
                        {errors?.confirmPassword && <p className="text-error text-sm pl-1">{errors.confirmPassword[0]}</p>}
                    </div>
                    <div>
                        <button type="submit"
                            className="bg-accent-600 hover:bg-accent-500 active:bg-accent-500 hover:scale-105
                            active:scale-95 rounded-md  px-2 py-1 text-white shadow-md shadow-accent-600 transition-all duration-200">
                            Comfirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}