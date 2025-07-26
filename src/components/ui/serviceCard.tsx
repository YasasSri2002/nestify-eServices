"use client"

export default function ServiceCard(props:any){


    return(
        <>
        <div className="bg-white rounded-2xl w-50 h-50 grid content-center justify-items-center 
        drop-shadow-2xl">
            <div className="w-20 h-20">
                <img className="object-cover rounded-full" src={props.imageUrl} alt="" />
            </div>
            <div>
                <h1 className="mt-2 text-lg text-gray-700">{props.serviceName}</h1>
            </div>
        </div>
        </>
    );
}