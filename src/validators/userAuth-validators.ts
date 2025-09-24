import z from "zod"

export const userRegisterSchema = z.object({
    name: z.string().nonempty(),
    email: z.string().nonempty(),
    password: z.string().nonempty().min(6),
})

export const userLoginSchema = z.object({
    email: z.string().nonempty(),
    password: z.string().nonempty(),
})