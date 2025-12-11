
export interface ServiceGigDto{
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
}

