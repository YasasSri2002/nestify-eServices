import { ProviderPersonalInformation } from "@/types/provider";
import ProviderPerosonalInformationForm from "./providerPersonalInfomation";

export default function ProviderDashboard(){

    const provider: ProviderPersonalInformation = {
        firstName: "yasas",
        lastName: "medagedara",
        address: "kandy",
        contactNo: "0729012123",
        email: "example@gmail.com",
        userName: "yasas_sri",
        shortDescription: "im a web devloper with nextjs and spring boot experince",
        expertise: "cleaning",
        experience: "0",
        isVerified: false
    }

    return(
        <div className="bg-gray-100">
            <ProviderPerosonalInformationForm provider={provider}/>
        </div>
    );
}