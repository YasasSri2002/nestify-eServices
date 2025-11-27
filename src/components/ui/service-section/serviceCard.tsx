"use client"

import DynamicIcon from "../../utill/DynamicIcons"

export default function ServiceCard(props:any){


    return(
       
        <div className="bg-white rounded-2xl w-50 h-50 grid content-center justify-items-center 
        drop-shadow-2xl">
            <div>
                <DynamicIcon name={props.name} className=" rounded-full w-30 h-30 bg-black/80 text-white/90 " />
            </div>
            <div>
                <h1 className="mt-2 text-lg text-gray-700">{props.serviceName}</h1>
            </div>
        </div>

    );
}