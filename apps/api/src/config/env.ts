import * as z from 'zod'

const EnvSchema = z.object({
  PORT: z.coerce.number().min(1).default(3000),
  HOSTNAME: z.string().min(1).default('0.0.0.0'),
  APP_ID: z.string().min(1, 'APP_ID is required'),
  DISCORD_TOKEN: z.string().min(1, 'DISCORD_TOKEN is required'),
  PUBLIC_KEY: z.string().min(1, 'PUBLIC_KEY is required'),
  PUBLIC_FUNNEL_URL: z.string().min(1, 'PUBLIC_FUNNEL_URL is required'),
  MIRROR_DOWNLOAD_ENDPOINT: z.string().min(1, 'MIRROR_DOWNLOAD_ENDPOINT is required'),
  MIRROR_SEARCH_ENDPOINT: z.string().min(1, 'MIRROR_SEARCH_ENDPOINT is required'),
  OSU_SONGS_PATH: z.string().min(1, 'OSU_SONGS_PATH is required'),
})

const env = EnvSchema.safeParse(process.env)

if (!env.success) {
  console.error(env.error.issues)
  process.exit(1)
}

export default env.data
