"use client";
import { useRef } from "react";
export default function RegisterPage(){

    const checkedRef= useRef(false);

    const handleClick = () =>{
       const el = document.getElementById("providerRadio") as HTMLInputElement | null;
        if (el) {
            el.checked = true;
        }
        
        console.log(el?.value);
        console.log(checkedRef);
    }

    return(
        <>
            <div className="flex justify-center">
                 <div className="m-15 w-full bg-red-200 h-fit rounded-4xl p-5 grid
                grid-cols-2 space-x-6">
                    <div className="col-1 grid justify-items-center">
                        
                    </div>
                    <div className="col-2 grid  justify-items-center">
                        <div className="grid">
                            <div className="flex">
                                <input type="radio" name="provider" id="providerRadio" 
                                className="sr-only"
                                checked = {false}
                                value="provider"
                                onChange={(e)=> checkedRef.current = e.target.checked}
                                
                                    />
                                    <label htmlFor="provider" onClick={handleClick}>fk</label>
                            </div>

                            <input type="radio" name="client" id="clientRadio" />
                        </div>
                    </div>

                </div> 
               </div>
        </>
    );
} 