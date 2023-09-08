import { Logger, Twitch } from 'Foundation/Core'

export default class Ignitor {
  private loadTwitchChatBot() {
    const instance = new Twitch()
    return instance.launch()
  }

  public start() {
    Logger.clear()

    this.loadTwitchChatBot()
  }
}
