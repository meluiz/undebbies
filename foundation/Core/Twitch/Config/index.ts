import { Logger } from 'Foundation/Core'
import { Scheme } from './Scheme'
import { validate } from 'class-validator'
import { Exception } from './Exception'

export type ConfigProps = Scheme
export class Config {
  public static async read(path: String) {
    Logger.wait(`Reading config from ${path}`, 'Twitch')

    const configPath = `${process.cwd()}/` + path.replace(/^\//, '')
    const configJson = await import(configPath)

    try {
      Logger.wait(`Validating config...`, 'Twitch')

      const twitchConfig = new Scheme(configJson)
      const validateErrors = await validate(twitchConfig)

      if (validateErrors.length > 0) {
        const constraintErrors = validateErrors
          .map((error) => Object.values(error.constraints || {}).join('\n- '))
          .join('\n\n- ')

        throw new Exception(
          `The provided mothership config is not valid, here are the issues:\n\n- ${constraintErrors}\n\n`,
        )
      }

      Logger.success('Config validated', 'Twitch')
      return twitchConfig as ConfigProps
    } catch (err: unknown) {
      if (err instanceof Exception) {
        Logger.error(Logger.colors.red(err.message), 'Twitch')
      }

      throw err
    }
  }
}
