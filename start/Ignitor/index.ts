import { Logger, Twitch } from 'Foundation/Core'

export let aaa = null

export default class Ignitor {
  private loadTwitchChatBot() {
    const instance = new Twitch()

    aaa = instance.token

    return instance.launch()
  }

  public start() {
    Logger.clear()

    this.loadTwitchChatBot()
  }
}
