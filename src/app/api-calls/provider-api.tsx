import { ProviderDto } from '@/dto/ProviderDto'; 
import { ProviderWithCategory } from '@/dto/response/ProviderWithCategoryDto';


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

export async function getPopularProviders(){
        try{
            const response = await axios.get<ProviderWithCategory[]>(
                'http://localhost:8080/api/v1/providers/top5'
            )
            return response.data;
        }catch(err:any){
            console.log(err);
            return []
        }
       

}