import { Client as ClientTMI } from 'tmi.js'
import { Command, type CommandsObject } from './Commands'
import { Config } from './Config'

export class Twitch {
  private setupClient(client: ClientTMI, commands: CommandsObject) {
    client.on('message', (channel, tags, message, self) => {
      const commandsRegex = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/)
      const commandMatch = message.match(commandsRegex)

      if (commandMatch) {
        const [_, command, argsString] = commandMatch
        const args = argsString ? argsString.split(' ') : []
        const commandInstance = commands[command]

        if (commandInstance) {
          commandInstance.execute(client, channel.replace(/^#/g, ''), args, {
            tags,
            self,
          })
        }
      }
    })
  }

  public async launch() {
    const config = await Config.read('/config/app.ts')
    const commands = await Command.load('/app/Commands')

    const client = ClientTMI({
      options: { debug: true },
      connection: {
        secure: true,
        reconnect: true,
      },
      identity: {
        username: config.username,
        password: `oauth:${config.oauthToken}`,
      },
      channels: [config.channel],
    })

    this.setupClient(client, commands)

    client.connect()
  }
}
