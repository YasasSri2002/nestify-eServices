import Footer from "@/components/ui/footer";
import NavBar from "@/components/ui/navbar";
import Searchbar from "@/components/ui/searchBar";
import ServiceProviderNavBar from "@/components/ui/serivceProviderNavBar";
import DynamicIcon from "@/components/utill/DynamicIcons";


export default function AllProviders(){
    return(
        <>
        <NavBar/>
        <div className="grid grid-cols-4">
            <div className="col-1 bg-sky-300 w-full h-dvh">
                <div>
                    <h1>Search service providers</h1>
                </div>
                <div className="flex items-center space-x-2">
                    <DynamicIcon name="CiSearch" className="relative left-10" />
                    <input type="text" placeholder="search" className="bg-white rounded-2xl px-10"/>
                </div>
            </div>
            <div className="col-span-3 bg-red-200 w-full h-dvh">

            </div>

         </div>
        <Footer/>
        </>
    );
}