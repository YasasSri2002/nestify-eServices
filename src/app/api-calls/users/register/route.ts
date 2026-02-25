import { UserData } from "@/dto/UserDto";


const BACKEND_URL = process.env.SPRING_BOOT_API_URL || 'http://localhost:8080' ;



export async function registerUser(userData: UserData){

    if(!BACKEND_URL){
        console.log("backend is not up")
    }

    try{
        const response = await fetch(`${BACKEND_URL}/api/v1/client/persist`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
                body: JSON.stringify(userData)
        })
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        
        return response.json();

    }catch(err: unknown){
         console.log(err, "from add new user");
    }

}