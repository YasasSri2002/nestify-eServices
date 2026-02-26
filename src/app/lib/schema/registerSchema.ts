import z from "zod";

export const registerSchema = z.object({
    firstName: z.string().min(1,"First name is required"),
    lastName: z.string().min(1,"Last name is required"),
    username : z.string().min(1,"User name is required").regex(/^\S+$/, "Username cannot contain spaces"),
    email : z.email("Invalid email"),
    password: z.string().min(8, "Password should be 8 charaters long!"),
    confirmPass: z.string().min(1,"Please confirm your password")
}).refine((data)=> data.password === data.confirmPass,{
    message: "Password do not match",
    path: ["confirmPass"]
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export type RegisterFormErrors = Partial<Record<keyof RegisterFormValues, string[]>>;