import { UUID } from "crypto";
import { UserDto } from "./UserDto";

export interface ReviewDto{
    id: string;

    rating: number;

    comment: string;

    providerResponse: string;

    reviewsClient: UserDto;
}

export interface ReviewRequestDto{
    rating: number;

    comment: string;
    
    serviceGigId?: string;

    clientId?: string;
}