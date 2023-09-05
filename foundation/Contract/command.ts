import { ChatUserstate, Client as TMIClient } from 'tmi.js'

export type CommandClient = TMIClient
export type CommandChannel = string
export type CommandArguments = string[]
export type CommandData = {
  self: boolean
  tags: ChatUserstate
}

export interface CommandContract {
  command: string
  commandName: string
  description: string

  execute(client: CommandClient, channel: string, args: CommandArguments, data: Record<string, unknown>): void
}
