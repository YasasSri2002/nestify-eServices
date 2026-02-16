import DynamicIcon from "@/components/utill/DynamicIcons"

export default function PasswordUpdateFrom(){
    return(
         <div className="m-5  p-4 bg-white rounded-2xl shadow-2xl">
                <h1 className="xl:text-2xl text-gray-900">Change your password</h1>
                <h3 className="xl:text-xl text-gray-600">Update your password to keep your account secure</h3>
                <div className="xl:w-6xl py-4">
                    <form className="px-2 grid gap-3">
                        <div className="grid gap-2">
                            <div className="flex gap-1 items-center">
                                <DynamicIcon name="FaLock"></DynamicIcon>
                                <label htmlFor="currentPassword">Current password</label>
                            </div>
                            <input type="text"  className="border border-black bg-white/50 p-1 rounded-sm"/>
                        </div>
                        <div className="grid gap-2">
                            <div className="flex gap-1 items-center">
                                <DynamicIcon name="FaLock"></DynamicIcon>
                                <label htmlFor="newPassword">New password</label>
                            </div>
                            <input type="text"  className="border border-black bg-white/50 p-1 rounded-sm"/>
                        </div>
                        <div className="grid gap-2">
                            <div className="flex gap-1 items-center">
                                <DynamicIcon name="FaLock"></DynamicIcon>
                                <label htmlFor="repeatNewPassword">Confirm new password</label>
                            </div>
                            <input type="text"  className="border border-black bg-white/50 p-1 rounded-sm"/>
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