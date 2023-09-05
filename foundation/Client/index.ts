import { ApiClient } from '@twurple/api'
import { authProvider, getTokenData } from './RefreshToken'

export class Client {
  public static getTokens = getTokenData
  public static get api() {
    return new ApiClient({
      authProvider: authProvider,
    })
  }
}
