import { BookingRequestDto } from "@/dto/BookingDto";

export type BookingStatus = "pending" | "completed" | "cancelled";

export type BookingData = Omit<BookingRequestDto, 'providerId' | 'gigId' | 'status' >