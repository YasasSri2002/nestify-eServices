import z from "zod";

export const passwordSchema = z.object({
    newPassword: z.string().min(8,"Passowrd should be 8 characters long!"),
    confirmPassword: z.string()
}).refine((data)=>data.newPassword === data.confirmPassword,{
    message: "Password do not match!",
    path: ["confirmPassword"]
})

export type PasswordSchemaFormValues = z.infer<typeof passwordSchema>;

export type PasswordSchemaFormErrors = Partial<Record<keyof PasswordSchemaFormValues, string[]>>