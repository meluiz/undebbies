import { Client } from 'Foundation/Client'
import { CommandArguments, CommandChannel, CommandClient, CommandContract, CommandData } from 'Foundation/Contract'
import { Env } from 'Foundation/Core'

// Array of matchers to ignore
const IGNORE_MATCHERS = ['Debby_Dev', 'meluiz', 'Nightbot', 'undebbies']

/**
 * Get the message for the match result
 * @param matcher - The matched user
 * @param author - The author's display name
 * @param percentage - The match percentage
 * @returns The match message
 */
function getMessage(matcher: string, author: string, percentage: number) {
  return `@${matcher} tem ${percentage}% de match com você!, @${author}! ❤`
}

export default class FollowAge implements CommandContract {
  public command = 'match'
  public commandName = 'Match'
  public description = 'Shows how much percentage a viewer has match with other viewer'

  /**
   * Execute the match command
   * @param client - The command client
   * @param channel - The command channel
   * @param _ - The command arguments
   * @param data - The command data
   * @returns A promise that resolves when the execution is complete
   */
  public async execute(client: CommandClient, channel: CommandChannel, _: CommandArguments, data: CommandData) {
    if (!data.tags['display-name']) {
      return
    }

    const displayName = data.tags['display-name']

    // Fun matcher. 'meluiz' has a high percentage with @Debby_Dev

    if (displayName.toLowerCase() === 'meluiz') {
      // Generate a random percentage
      const percentage = Math.floor(Math.random() * (1000 - 100 + 1) + 100)
      return client.say(channel, getMessage('Debby_Dev', displayName, percentage))
    }

    // Get the list of chatters in the streamer's channel
    const chatters = await Client.api.asUser(Env.get('TWITCH_BOT_ID'), async (ctx) => {
      const streamer = await ctx.users.getUserByName(channel)

      if (!streamer) {
        return null
      }

      const chatters = await ctx.chat.getChatters(streamer.id, { limit: 100 })
      return chatters
    })

    if (!chatters) {
      return client.say(channel, 'O X para encontrar o Streamer foi marcado errado. Vire o mapa e continue! 🕵️‍♂️')
    }

    // Filter out the author and ignored matchers
    const chattersFiltered = chatters.data.filter((chatter) => {
      return chatter.userDisplayName !== displayName && !IGNORE_MATCHERS.includes(chatter.userDisplayName)
    })

    // Get a random matcher and match percentage
    const matcher = chattersFiltered[Math.floor(Math.random() * chattersFiltered.length)]
    const percentage = Math.round(Math.random() * 99) + 1

    // Fun matcher. Streamer with a low percentage when the matcher isn't 'meluiz'
    if (displayName === channel) {
      if (matcher.userDisplayName !== 'meluiz') {
        // Generate a random percentage
        const percentage = Math.round(Math.random() * 9) + 1

        return client.say(channel, getMessage(matcher.userDisplayName, displayName, percentage))
      }

      return client.say(channel, getMessage('meluiz', displayName, 100))
    }

    return client.say(channel, getMessage(matcher.userDisplayName, displayName, percentage))
  }
}
