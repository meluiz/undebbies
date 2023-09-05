import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export class Env {
  private static rules = createEnv({
    runtimeEnv: process.env,
    server: {
      TWITCH_USERNAME: z.string(),
      TWITCH_OAUTH_TOKEN: z.string(),
      TWITCH_BOT_ID: z.string(),
      TWITCH_CLIENT_ID: z.string(),
      TWITCH_CLIENT_SECRET: z.string(),
      TWITCH_CHANNEL: z.string().optional(),
    },
  })

  public static get(key: keyof typeof Env.rules, defaultValue?: any) {
    return Env.rules[key] || defaultValue
  }
}
