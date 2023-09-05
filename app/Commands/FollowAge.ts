import { Client } from 'Foundation/Client'
import type { CommandArguments, CommandChannel, CommandClient, CommandContract, CommandData } from 'Foundation/Contract'
import { Env } from 'Foundation/Core'

export default class FollowAge implements CommandContract {
  public command = 'followage'
  public commandName = 'Follow Age'
  public description = "Displays how long a viewer has been following a streamer's channel"

  public async execute(client: CommandClient, channel: CommandChannel, args: CommandArguments, data: CommandData) {
    const follower = await Client.api.asUser(Env.get('TWITCH_BOT_ID'), async (ctx) => {
      const broadcaster = await ctx.users.getUserByName(channel)

      if (!broadcaster || !data.tags.id) {
        return null
      }

      const follower = await broadcaster.getChannelFollower(data.tags['user-id'] || '')
      return follower
    })

    if (channel === data.tags['display-name']) {
      return client.say(channel, `You have been following every life! @${data.tags['display-name']}`)
    }

    client.say(channel, `I don't know how can i calculate it`)
  }
}
