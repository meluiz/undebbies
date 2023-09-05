import { Client as TMIClient } from 'tmi.js'

declare global {
  type Client = TMIClient
  type Arguments = string[]
}
