import { IsObject } from 'class-validator'

export class Scheme {
  @IsObject()
  public commands: Record<string, unknown>

  constructor(commands: Record<string, unknown>) {
    this.commands = commands
  }
}
