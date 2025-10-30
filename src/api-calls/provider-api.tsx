import { ProviderDto } from '@/dto/ProviderDto'; 

import axios from 'axios';

export async function getAllProviders(){
    
    try{
        const response = await axios.get<ProviderDto[]>(
          "http://localhost:8080/api/v1/providers/all"
        )
    
        return response.data;
    }catch(err:any){
        alert("error"+ err);
        return []
    }
      
}