import z from "zod"

export const providerRegisterSchema = z.object({
    firstName: z.string().min(1,"First name is required!"),
    lastName: z.string().min(1,"Last name is required!"),
    username: z.string().min(3,"Username is required!").regex(/^\S+$/, "Username cannot contain spaces"),
    contact: z.number().min(1,"contact is required").max(10,"invalid phone number"),
    email: z.email("Invalid email"),
    password: z.string().min(8,"Password must be 8 characters long!"),
    
})

export type ProviderRegisterFormValues = z.infer<typeof providerRegisterSchema>;

export type ProviderRegisterFormErrors = Partial<Record<keyof ProviderRegisterFormValues, string[]>>;