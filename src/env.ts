import z from 'zod';

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
})

export const env = envSchema.parse(process.env); // verify if the env variables are correct