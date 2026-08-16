import { ProviderDto } from "./ProviderDto";
import { ServiceGigResponseDto } from "./response/ServiceGigResponseDto";

/**
 * Mirrors the backend ProviderBookingResponseDto.
 * ClientResponseDto is represented as the subset of user fields the provider sees.
 */
export interface ClientResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  address: string;
}

export interface ProviderBookingResponseDto {
  id: string;
  name: string;
  email: string;
  contactNo: string;
  address: string;
  additionalInformation: string;
  status: string; // pending | completed | cancelled
  startingTime: string;
  startingDate: string;
  clientDto: ClientResponseDto;
  providerDto: ProviderDto;
  serviceGigResponseDto: ServiceGigResponseDto;
}

export interface ProviderBookingPage {
  content: ProviderBookingResponseDto[];
  totalElements: number;
  totalPages: number;
  number: number; // current page (0-indexed)
  size: number;
}
