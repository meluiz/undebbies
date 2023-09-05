import { Logger } from 'Foundation/Core'
import { Exception } from './Exception'

import { readdirSync } from 'node:fs'
import { Scheme } from './Scheme'
import { validate } from 'class-validator'
import { z } from 'zod'

export interface CommandProps {
  command: string
  commandName: string
  description: string
  execute(...args: unknown[]): void
}

export type CommandsObject = Record<string, CommandProps>

export class Command {
  public static scheme = z.record(
    z.string(),
    z.object({
      command: z.string(),
      commandName: z.string(),
      description: z.string(),
      execute: z.function(),
    }),
  )

  public static async load(path: String) {
    Logger.wait(`Reading commands from ${path}`, 'Twitch')

    const configPath = `${process.cwd()}/` + path.replace(/^\//, '')
    const files = readdirSync(configPath)

    const commands: Record<string, unknown> = {}

    for (const file of files) {
      const Module = await import(`${configPath}/${file}`)
      const module = new Module.default()

      commands[module.command] = {
        command: module.command,
        commandName: module.commandName,
        description: module.description,
        execute: module.execute,
      }
    }

    try {
      Logger.wait(`Validating commands...`, 'Twitch')

      const twitchConfig = new Scheme(commands)
      const validateErrors = await validate(twitchConfig)

      if (validateErrors.length > 0) {
        const constraintErrors = validateErrors
          .map((error) => Object.values(error.constraints || {}).join('\n- '))
          .join('\n\n- ')

        throw new Exception(
          `The provided mothership config is not valid, here are the issues:\n\n- ${constraintErrors}\n\n`,
        )
      }

      const validator = Command.scheme.safeParse(commands)

      if (!validator.success) {
        throw new Exception(`The provided command is not valid.\n\n ${validator.error.message}\n\n`)
      }

      Logger.success('Commands validated', 'Twitch')

      Logger.log('')
      const panel = new Logger.Panel()

      panel.addMessage(Logger.colors.bold('Commands Loaded:'))
      panel.addMessage(Object.keys(commands).sort().join(', '))

      panel.render()

      return validator.data as CommandsObject
    } catch (err: unknown) {
      if (err instanceof Exception) {
        Logger.fatal(Logger.colors.red(err.message), 'Twitch')
      }

      throw err
    }
  }
}
