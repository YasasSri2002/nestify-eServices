import DynamicIcon from "@/components/utill/DynamicIcons";
import Link from "next/link";
export default function Forbidden(){
    return(
            <div className="w-full h-dvh grid justify-items-center content-center text-gray-500/90 ">
                <div className="text-center">
                    <h1 className="text-2xl md:text-7xl text-gray-500 text-center">403</h1>
                    <div className="px-10 py-2  md:p-0">
                        <img src="/icon/403.jpg" alt="403 door is guarded" className="md:w-100 md:h-100 relative -z-10 rounded-2xl" />
                    </div>
                    <h1 className="md:text-2xl text-black text-center">Access Denied!</h1>
                    <h1 className="md:text-xl"> You don't have permission to acess this page </h1>
                    <h1 className="text-center md:text-xl">please make sure you have right aceess</h1>
                    
                        <Link href="/" className="flex text-xl md:text-2xl text-black/90 items-center justify-center hover:text-blue-600">
                            <DynamicIcon name="IoIosArrowBack"/>
                           Go to home page!
                        </Link>  
                    
                   
                </div>
            </div>
    );
}