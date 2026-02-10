import { UserResponseDto } from "@/dto/UserDto";

export default function AccountInfo({createdDate}:{createdDate:string}){
    return(
        <div>
            <div className="grid gap-5 bg-gray-200 p-5 rounded-2xl ">
                <div>
                    <h1>Account Information</h1>
                    <p>view your account information</p>
                </div>
                <div className="grid sm:grid-cols-2">
                    <div className="sm:col-1 grid gap-5">
                        <div className="grid gap-1">
                            <h1>Member since</h1>
                            <h1>{createdDate}</h1>
                        </div>
                        <div className="grid gap-1">
                            <h1>total bookings</h1>
                            <h1>0</h1>
                        </div>
                    </div>
                    <div className="sm:col-2 grid gap-5">
                        <div className="grid gap-1">
                            <h1>account status</h1>
                            <label htmlFor="status" className="border w-fit px-3 text-sm  text-green-900 bg-green-300 
                            rounded-md">active</label>
                        </div>
                        <div className="grid gap-1">
                            <h1>account type</h1>
                            <h1>customer</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}