"use client"

import DynamicIcon from "../../utill/DynamicIcons"

export default function ServiceCard(props:any){


    return(
       
        <div className="bg-white rounded-2xl w-50 h-50 grid content-center justify-items-center 
        shadow-[0_4px_12px_rgba(10,25,47,0.08)] hover:shadow-[0_12px_32px_rgba(10,25,47,0.12)] border border-[#EAF2F1] transition-all duration-300 hover:-translate-y-1">
            <div>
                <DynamicIcon name={props.name} className=" rounded-full w-30 h-30 bg-[#0A192F] text-white " />
            </div>
            <div>
                <h1 className="mt-2 text-lg text-[#1E293B] capitalize font-medium">{props.serviceName}</h1>
            </div>
        </div>

    );
}