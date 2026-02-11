'use client'
import { Suspense } from "react";
import { UserResponseDto } from "@/dto/UserDto";
import AccountInfo from "./accountInfo";
import PerosonalInformationForm from "./personalInformation";
import { getBookingCountWithUserId } from "@/app/api-calls/users/booking-count-with-id/route";
import { LoadingPage } from "@/components/utill/loadingPage";


export default  function ProfileDashboard({user}: {user:UserResponseDto}){

    console.log("from profile dashboard user id ----> ", user.id)

    return(
        
        <div className="lg:px-10">
            <Suspense fallback={<LoadingPage/>}>
                <PerosonalInformationForm user={user} />
            </Suspense>
            <div className="my-5">
                <AccountInfo createdDate={user.createdAt} userId={user.id}/>
            </div>
        </div>

    )
}