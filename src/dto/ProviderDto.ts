import { BookingDto } from "./BookingDto";
import { CategoryResponseDto } from "./CategoryDto";
import { ReviewDto } from "./ReviewDto";
import { ServiceGigDto } from "./ServiceGigDto";

export interface ProviderDto {
  id : number;
  userName: string;
  firstName:string;
  lastName: string;
  email: string;
  contactNo: string;
  expertise: string;
  isVerified: boolean;
  address: string;
  experience: string;
  jobCount: number;
  shortDescription: string;
}

export interface ProviderWithAllDetails{

  providerDto: ProviderDto;
  gigs : ServiceGigDto[];
  bookingDto: BookingDto[];
  reviewDto: ReviewDto[];
  categoryDto: CategoryResponseDto[];

}