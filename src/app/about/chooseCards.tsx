import DynamicIcon from "@/components/utill/DynamicIcons";
import { ChooseCardDetails } from "./chooseCardsDetails";

export default function ChooseCards({ details }: { readonly details: ChooseCardDetails }) {
    return (
        <div className="w-full md:w-[25em] h-[10em] hover:border hover:border-accent-600 p-5 rounded-2xl bg-surface-snow
         shadow-xl hover:-translate-y-3">
            <div className="flex">
                <div className="bg-surface-ice-100  rounded-2xl h-[4em] w-[8em] flex items-center justify-center">
                    <DynamicIcon name={details.iconName} className="text-2xl text-primary-600" />
                </div>
                <div className="grid mx-2 px-2 gap-5">
                    <h1>{details.topic}</h1>
                    <p>{details.details}</p>
                </div>
            </div>
        </div>

    )
}