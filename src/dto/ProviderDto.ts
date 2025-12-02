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
  hourlyRate: number;
  expertise: string;
  isVerified: boolean;
  address: string;
  experience: string;
  jobCount: number;
}

export interface ProviderWithAllDetails{

  providerDto: ProviderDto;
  serviceDto: ServiceGigDto;
  bookingDto: BookingDto;
  reviewDto: ReviewDto;
  categoryDto: CategoryResponseDto;

}