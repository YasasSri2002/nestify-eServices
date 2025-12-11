import { UserDto } from "./UserDto";

export interface ReviewDto{
    rating: number;

    comment: string;

    providerResponse: string;

    reviewsClient: UserDto;
}