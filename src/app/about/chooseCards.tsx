import DynamicIcon from "@/components/utill/DynamicIcons";
import { ChooseCardDetails } from "./chooseCardsDetails";

export default function ChooseCards({ details }: { readonly details: ChooseCardDetails }) {
    return (
        <div className="group h-full bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200/70 shadow-sm hover:shadow-xl hover:border-accent-400/60 hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
            <div className="w-12 h-12 rounded-xl bg-accent-100 text-accent-600 flex items-center justify-center shrink-0 group-hover:bg-accent-600 group-hover:text-white transition-colors duration-200">
                <DynamicIcon name={details.iconName} className="text-2xl" />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-neutral-800 text-lg mb-1.5 group-hover:text-accent-600 transition-colors duration-200">
                    {details.topic}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                    {details.details}
                </p>
            </div>
        </div>
    );
}