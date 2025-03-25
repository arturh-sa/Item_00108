import {z} from "zod"

export const portionFormSchema = z.object({
    foodType: z.string({
        required_error: "Please select a food type",
    }),
    portionSize: z.string({
        required_error: "Please select a portion size",
    }),
})

export type PortionFormValues = z.infer<typeof portionFormSchema>

