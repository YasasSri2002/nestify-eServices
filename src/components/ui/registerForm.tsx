"use client"; 

export default function registerForm(){
    return(
            <>
                <div>
                    <div className="flex justify-center content-center">
                        <div className="w-1/2 flex-1 justify-center flex bg-red-200">
                            Provider
                        </div>
                        <div className="w-1/2 flex-1 justify-center flex bg-blue-200">
                            client
                        </div>
                    </div>  
                </div> 
            </>
    );
}