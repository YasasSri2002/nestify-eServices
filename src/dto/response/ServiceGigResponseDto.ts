import { CategoryResponseDto } from "../CategoryDto";
import { ProviderDto } from "../ProviderDto";


export interface ServiceGigResponseDto{
    id : string;
    
    title: string;

    shortDescription: string;

    fullDescription:string;

    basePrice: number;

    priceType: string; //Hourly, per Job or for day

    durationByHours: number;

    currency: string; // LKR, USD

    isActive: boolean;

    createdAt: Date;

    updatedAt: Date;

    provider: ProviderDto;

    category: CategoryResponseDto;

}