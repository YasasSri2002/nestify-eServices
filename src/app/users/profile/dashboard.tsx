import AccountInfo from "./accountInfo";
import PerosonalInformationForm from "./personalInformation";

export default function ProfileDashboard({userId}: {userId:string}){

    

    return(
        
        <div className="lg:px-10">
            <PerosonalInformationForm/>
            <div className="my-5">
                <AccountInfo/>
            </div>
        </div>

    )
}