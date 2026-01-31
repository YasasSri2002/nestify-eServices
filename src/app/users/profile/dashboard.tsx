import AccountInfo from "./accountInfo";
import PerosonalInformationForm from "./personalInformation";

export default function ProfileDashboard(){
    return(
        
        <div className="lg:px-10">
            <PerosonalInformationForm/>
            <div className="my-5">
                <AccountInfo/>
            </div>
        </div>

    )
}