import { UserDto } from "./UserDto";

export interface ReviewDto{
    id: string;

    rating: number;

    comment: string;

    providerResponse: string;

    reviewsClient: UserDto;
}