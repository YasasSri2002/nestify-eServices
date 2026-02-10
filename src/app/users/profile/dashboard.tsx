import { UserResponseDto } from "@/dto/UserDto";
import AccountInfo from "./accountInfo";
import PerosonalInformationForm from "./personalInformation";

export default async function ProfileDashboard({user}: {user:UserResponseDto}){

    return(
        
        <div className="lg:px-10">
            <PerosonalInformationForm user={user} />
            <div className="my-5">
                <AccountInfo createdDate={user.createdAt}/>
            </div>
        </div>

    )
}