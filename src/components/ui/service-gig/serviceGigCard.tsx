export default function ServiceGigCard(){
    return(
            <div className="p-5 grid gap-5">
                <div>
                    <img src="/user.jpg" alt="" className="w-full h-60 rounded-xl"/>
                </div>
               <div id="heading">
                    <h1 className="text-center text-xl">Title</h1>
                    <p className="text-wrap text-sm">Short description Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi aliquid aut animi libero itaque odio repellendus soluta doloribus numquam vitae?</p>
                </div> 
                <div className="flex justify-between w-full text-sm">
                    <div className="flex space-x-2">
                        <h1>LKR:</h1><h1>800</h1><h1>for a Day</h1>
                    </div>
                    <div className="flex">
                        <h1>Duration: 2</h1><h1>Hr</h1>
                    </div>
                </div>
                <div className="text-center">
                    <h1>Provider user name</h1>
                </div>
            </div>
        );
}