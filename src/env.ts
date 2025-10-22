import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.url().startsWith('postgresql://'),

  CLOUDFLARE_ACCOUNT_ID: z.string(),
  CLOUDFLARE_ACCESS_KEY_ID: z.string(),
  CLOUDFLARE_SECRET_ACCESS_KEY: z.string(),
  CLOUDFLARE_BUCKET: z.string(),
  CLOUDFLARE_PUBLIC_URL: z.url(),
})

export const env = envSchema.parse(process.env)
