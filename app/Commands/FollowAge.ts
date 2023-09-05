import { Client } from 'Foundation/Client'
import type { CommandArguments, CommandChannel, CommandClient, CommandContract, CommandData } from 'Foundation/Contract'
import { Env } from 'Foundation/Core'
import dayjs from 'dayjs'

/**
 * Class representing the FollowAge command.
 */
export default class FollowAge implements CommandContract {
  // The command name to trigger this command
  public command = 'followage'

  // The human-readable command name
  public commandName = 'Follow Age'

  // The description of the command
  public description = "Displays how long a viewer has been following a streamer's channel"

  /**
   * Execute the command.
   *
   * @param {CommandClient} client - The command client.
   * @param {CommandChannel} channel - The command channel.
   * @param {CommandArguments} args - The command arguments.
   * @param {CommandData} data - The command data.
   */
  public async execute(client: CommandClient, channel: CommandChannel, args: CommandArguments, data: CommandData) {
    // Get the display name and username from command data
    const displayName = data.tags['display-name']?.toLowerCase()
    const username = data.tags.username

    // Check if the display name matches the channel name
    if (displayName && channel === displayName) {
      return client.say(channel, 'O followage para você mesmo é uma verdadeira incógnita! 🕵️‍♂️')
    }

    // Get the follower information
    const follower = await Client.api.asUser(Env.get('TWITCH_BOT_ID'), async (ctx) => {
      const broadcaster = await ctx.users.getUserByName(channel)

      if (!broadcaster || !data.tags.id) {
        return null
      }

      const follower = await broadcaster.getChannelFollower(data.tags['user-id'] || '')
      return follower
    })

    // Calculate the follow age
    const now = dayjs()
    const followedAt = dayjs(follower?.followDate)
    const diffInSeconds = now.diff(followedAt, 'second')

    // Define the time units in seconds
    const SECONDS_IN_YEAR = 31536000
    const SECONDS_IN_MONTH = 2592000
    const SECONDS_IN_DAY = 86400
    const SECONDS_IN_HOUR = 3600
    const SECONDS_IN_MINUTE = 60

    // Calculate the follow age in each time unit
    const years = Math.floor(diffInSeconds / SECONDS_IN_YEAR)
    const months = Math.floor((diffInSeconds % SECONDS_IN_YEAR) / SECONDS_IN_MONTH)
    const days = Math.floor((diffInSeconds % SECONDS_IN_MONTH) / SECONDS_IN_DAY)
    const hours = Math.floor((diffInSeconds % SECONDS_IN_DAY) / SECONDS_IN_HOUR)
    const minutes = Math.floor((diffInSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE)
    const seconds = Math.floor(diffInSeconds % SECONDS_IN_MINUTE)

    // Create an array to store the follow age parts
    const followingAgeParts = []

    // Define the labels for each time unit
    const dates = [
      [years, 'ano:anos'],
      [months, 'mês:meses'],
      [days, 'dia:dias'],
      [hours, 'hora:horas'],
      [minutes, 'minuto:minutos'],
      [seconds, 'segundo:segundos'],
    ] as const

    // Iterate through the time units and add the corresponding parts to the array
    for (const [count, label] of dates) {
      if (count > 0) {
        const [singular, plural] = label.split(':')
        const text = `${count} ${count > 1 ? plural : singular}`

        followingAgeParts.push(text)
      }
    }

    // Replace the last comma in the follow age with "e"
    const lastOccurrenceRegex = /,(?=[^,]*$)/
    const followedAge = followingAgeParts.join(', ').replace(lastOccurrenceRegex, ' e ')

    // Send the follow age message
    client.say(channel, `${username} segue o(a) ${channel} há ${followedAge}`)
  }
}
