import DynamicIcon from "@/components/utill/DynamicIcons";
export default function OverviewCard({title ,iconName,iconColor,data}:
    { readonly title: string,
      readonly iconName: string,
      readonly iconColor: string,
      readonly data: string
    }
){
    return(
            <div className="w-full border-2 border-red-200 bg-white/80 drop-shadow-xl rounded-xl p-5 flex justify-between items-center  ">
                <div>
                    <h1>{title}</h1>
                    <h1 className="text-3xl">{data}</h1>
                </div>
                <div className="w-20 h-20  rounded-full bg-gray-200 grid justify-items-center content-center">
                    <DynamicIcon name={iconName} className={`w-10 h-10 ${iconColor}`}/>
                </div>
                
            </div>
    );
}