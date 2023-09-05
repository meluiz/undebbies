import { CommandArguments, CommandChannel, CommandClient, CommandContract, CommandData } from 'Foundation/Contract'

export default class FollowAge implements CommandContract {
  public command = 'watchtime'
  public commandName = 'Watch Time'
  public description = "shows how much time a viewer has spent watching a streamer's content"

  public async execute(client: CommandClient, channel: CommandChannel, args: CommandArguments, data: CommandData) {
    if (channel === data.tags['display-name']) {
      return client.say(channel, `You have been following every life! @${data.tags['display-name']}`)
    }

    client.say(channel, `I don't know how can i calculate it`)
  }
}
