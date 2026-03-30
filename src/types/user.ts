import { UserRequestDto } from "@/dto/UserDto";


export type UserData = Pick<UserRequestDto, 'firstName'| 'lastName' | 'username' | 'email' | 'password' >

export type UserUpdateData = Pick<UserRequestDto, 'firstName'| 'lastName' | 'username' | 'contact' | 'address'>