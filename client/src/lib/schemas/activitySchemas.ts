import { z } from 'zod';

const requiredString = (fieldName: string) => z
    .string({ error: `${fieldName} is required` })
    .min(1, { message: `${fieldName} is required` });

// define the activity schema using zod
export const activitySchema = z.object({
    title: requiredString("Title"),
    description: requiredString("Description"),
    category: requiredString("Category"),
    // coerce will convert the input to a Date object
    date: z.coerce.date({ error: "Date is required" }),
    location: z.object({
        venue: requiredString("Venue"),
        city: z.string().optional(),
        latitude: z.coerce.number().optional(),
        longitude: z.coerce.number().optional(),
    })
});

// export the type of the activity schema
export type ActivitySchema = z.infer<typeof activitySchema>;