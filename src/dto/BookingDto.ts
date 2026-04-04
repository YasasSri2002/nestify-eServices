import { BookingStatus } from "@/types/booking";
import { ProviderDto } from "./ProviderDto";
import { ServiceGigResponseDto } from "./response/ServiceGigResponseDto";

export interface BookingDto{
    id: string;

    status: string; //pending, approved , rejected , canceled

    startingTime: string; //clients convenient starting time

    endingTime: string; //coming from service gig time ending the service depend on that

    startingDate: Date; //booking date

    endingDate: Date; //if the service ran for days

}

export interface BookingResponseDto{
    id: string;

     name: string;

     email: string;

     contactNo: string;

     address: string;

     additionalInformation: string;

     status: string;

    startingTime: string;

    startingDate: string;

    providerDto: ProviderDto;

    serviceGigResponseDto: ServiceGigResponseDto;

}

export interface BookingRequestDto{
    name: string;

    email: string;

    contactNo: string;

    address: string; // if above field were null it will be replaced with client's info

    additionalInformation: string; // can be null

    status: BookingStatus; //pending, approved , rejected , canceled

    startingTime: string; //clients convenient starting time

    startingDate: string; //booking date


    providerId: string;

    gigId: string;
}