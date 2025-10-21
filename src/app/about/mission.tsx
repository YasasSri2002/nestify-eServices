import DynamicIcon from "@/components/utill/DynamicIcons";

export default function MissionPage(){
    return(
    
        <div className="grid justify-items-center my-5 p-10">
            <div className="rounded-full w-[75px] h-[75px] bg-black/90 flex justify-center items-center mb-5">
            <DynamicIcon name="CiHeart" className="text-white text-4xl" />
            </div>
            <div className="grid justify-items-center w-full gap-5">
                <h1 className="text-center text-2xl text-black/90">Our Mission</h1>
                <p className="text-center text-xl text-gray-800/90 ">We believe every homeowner deserves access to reliable, skilled professionals who can help maintain and improve their living spaces. Our platform bridges the gap between trusted service providers and homeowners, creating lasting relationships built on quality, trust, and exceptional service.</p>
            </div>
        </div>

    )
}