import DynamicIcon from "@/components/utill/DynamicIcons";
import Image from "next/image";
import Link from "next/link";
export default function Forbidden(){
    return(
            <div className="pt-10 sm:p-0">
                <div className="text-center w-full h-full grid justify-items-center content-center text-gray-500/90">
                    <h1 className="text-2xl md:text-6xl text-gray-500 text-center">Error - 403</h1>
                    <div className="px-10 py-2  md:p-0">
                        <Image
                             src="/icon/403.jpg" alt="403 door is guarded" 
                             className="md:w-100 md:h-100 relative  rounded-2xl"
                             width={100}
                             height={100}
                            />
                    </div>
                    <h1 className="md:text-2xl text-black text-center">Access Denied!</h1>
                    <h1 className="md:text-xl"> You don&apos;t have permission to acess this page </h1>
                    <h1 className="text-center md:text-xl">please make sure you have right aceess</h1>
                    
                        <Link href="/" className="flex text-xl md:text-2xl text-black/90 items-center justify-center hover:text-blue-600">
                            <DynamicIcon name="IoIosArrowBack"/>
                           Go to home page!
                        </Link>  
                    
                   
                </div>
            </div>
    );
}