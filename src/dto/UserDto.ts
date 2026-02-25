export interface UserDto{
    
    id:string;

    address: string;

    email: string;

    paymentMethod: string;
}

export interface UserResponseDto{

     id: string;

     address:string;

     contact: string;

     email:string;

    paymentMethod: string;

     firstName:string;

     lastName:string;

     username:string;

    createdAt: string;

}

export interface UserRequestDto{
    
    address: string;

    email: string;

    username: string;

    firstName: string;

    lastName: string;

    paymentMethod: string;

    contact: string;

    password: string;
}

export type UserData = Pick<UserRequestDto, 'firstName'| 'lastName' | 'username' | 'email' | 'password' >