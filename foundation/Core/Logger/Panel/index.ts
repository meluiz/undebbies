import type { BoxKeys } from './Line'

import { Logger } from '..'
import { Line } from './Line'

/**
 * Represents the state of a panel.
 */
interface PanelState {
  type: BoxKeys
  heading: string | null
  messages: string[]
  isInstruction: boolean
}

/**
 * Represents a Panel component for rendering messages in a styled box.
 */
export class Panel {
  // The state of the panel.
  private state: PanelState = {
    heading: null,
    messages: [],
    type: 'round', // Default box type
    isInstruction: false,
  }

  /**
   * Sets the type of the box.
   * @param type The type of the box.
   * @returns This Panel instance for method chaining.
   */
  public setBoxType(type: BoxKeys): this {
    this.state.type = type
    return this
  }

  /**
   * Sets whether the panel is an instruction.
   * @param isInstruction Whether the panel is an instruction (default is true).
   * @returns This Panel instance for method chaining.
   */
  public setInstruction(isInstruction = true): this {
    this.state.isInstruction = isInstruction
    return this
  }

  /**
   * Sets the heading of the panel.
   * @param heading The heading text.
   * @returns This Panel instance for method chaining.
   */
  public setHeading(heading: string): this {
    this.state.heading = heading
    return this
  }

  /**
   * Adds a message to the panel.
   * @param message The message text to add.
   * @returns This Panel instance for method chaining.
   */
  public addMessage(message: string): this {
    this.state.messages.push(message)
    return this
  }

  /**
   * Renders the panel and logs it using the Logger.
   */
  public render(): void {
    const line = new Line(this.state.type, 56)
    const { heading, messages, isInstruction } = this.state

    const top = line.getTopLine()
    const bottom = line.getBottomLine()
    const horizontal = line.getHorizontalLine()
    const gutter = line.getGutterLine()

    let output = `${top}\n`

    if (heading) {
      // Add a dimmed heading line.
      output += `${Logger.colors.dim(`${line.getContentLine(heading)}\n`)}`
      output += `${horizontal}\n`
    }

    output += `${gutter}\n`

    for (const message of messages) {
      // Add content lines for messages, optionally styling instructions.
      output += `${line.getContentLine(message, isInstruction)}\n`
    }

    output += `${gutter}\n${bottom}\n`

    // Log the rendered panel.
    Logger.log(output)
  }
}
