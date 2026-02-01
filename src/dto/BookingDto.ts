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
}