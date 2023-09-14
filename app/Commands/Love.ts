import { Client } from 'Foundation/Client'
import type { CommandArguments, CommandChannel, CommandClient, CommandContract, CommandData } from 'Foundation/Contract'
import { Env } from 'Foundation/Core'

/**
 * Class representing the FollowAge command.
 */
export default class FollowAge implements CommandContract {
  // The command name to trigger this command
  public command = 'amor'

  // The human-readable command name
  public commandName = 'Amor'

  // The description of the command
  public description = 'Display how much a viewer loves the streamers'

  /**
   * Execute the command.
   *
   * @param {CommandClient} client - The command client.
   * @param {CommandChannel} channel - The command channel.
   * @param {CommandArguments} args - The command arguments.
   * @param {CommandData} data - The command data.
   */
  public async execute(client: CommandClient, channel: CommandChannel, args: CommandArguments, data: CommandData) {
    if (!data.tags['display-name']) {
      return
    }

    const displayName = data.tags['display-name']

    // Get the list of chatters in the streamer's channel
    const streamer = await Client.api.asUser(Env.get('TWITCH_BOT_ID'), async (ctx) => {
      const streamer = await ctx.users.getUserByName(channel)

      if (!streamer) {
        return null
      }

      return streamer
    })

    if (!streamer) {
      return client.say(channel, 'Cadê o streamer? Sumiu! 🕵️‍♂️')
    }

    const percentage = Math.round(Math.random() * 99) + 1

    return client.say(channel, `@${displayName} ama a @${streamer.displayName} algo equivalente a ${percentage}%. ❤️`)
  }
}
