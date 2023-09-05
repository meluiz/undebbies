import { RefreshingAuthProvider } from '@twurple/auth'
import { Env, Logger } from 'Foundation/Core'

import fs from 'node:fs'

const clientId = Env.get('TWITCH_CLIENT_ID')
const clientSecret = Env.get('TWITCH_CLIENT_SECRET')

export function getTokenData(botId: string) {
  const path = `${process.cwd()}/storage/tokens/token.${botId}.json`

  try {
    Logger.wait(`Reading token data file for user ID ${botId}`, 'Client')

    const tokenFile = fs.readFileSync(path, 'utf-8')
    const token = JSON.parse(tokenFile)

    Logger.success('Token data file read', 'Client')
    return token
  } catch {
    Logger.warn(`Missing token data file for user ID ${botId}`)
    Logger.warn('Shutting chatbot down...')

    process.exit()
  }
}

const tokenData = getTokenData(Env.get('TWITCH_BOT_ID'))

export const authProvider = new RefreshingAuthProvider({
  clientId,
  clientSecret,
})

authProvider.onRefresh(async (botId: string, newToken: string) => {
  const path = `${process.cwd()}/storage/tokens/token.${botId}.json`

  try {
    Logger.wait(`Writing token data file for user ID ${botId}`, 'Client')

    fs.writeFileSync(path, JSON.stringify(newToken, null, 4), 'utf-8')
    Logger.success('Token data file written', 'Client')
  } catch {
    Logger.warn(`Failed to write token data file for user ID ${botId}`)
    process.exit()
  }
})

await authProvider.addUserForToken(tokenData, ['chat'])
