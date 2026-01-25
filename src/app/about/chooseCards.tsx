import DynamicIcon from "@/components/utill/DynamicIcons";
import { ChooseCardDetails } from "./chooseCardsDetails";

export default function ChooseCards({details} :{ readonly details: ChooseCardDetails}){
    return(
        <div className="w-full md:w-[25em] h-[10em] hover:border p-5 rounded-2xl bg-white/80 shadow-xl hover:-translate-y-3">
            <div className="flex">
                <div className="bg-gray-600/65  rounded-2xl h-[4em] w-[8em] flex items-center justify-center">
                    <DynamicIcon name={details.iconName} className="text-2xl text-white"/>
                </div>
                <div className="grid mx-2 px-2 gap-5">
                    <h1>{details.topic}</h1>
                    <p>{details.details}</p>
                </div>
            </div>
        </div>
        
    )
}