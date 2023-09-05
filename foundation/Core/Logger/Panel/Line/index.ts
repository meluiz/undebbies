import colors from 'picocolors'

import { Box } from '../../box'

export type BoxKeys = keyof typeof Box
export type LineOptions = {
  paddingLeft: number
  paddingRight: number
}

/**
 * Represents a Line component for rendering styled lines within a box.
 */
export class Line {
  private line: (typeof Box)[BoxKeys]
  private options: LineOptions = {
    paddingLeft: 4,
    paddingRight: 4,
  }

  constructor(
    private boxType: BoxKeys = 'round', // Renamed type to boxType for clarity
    private length = 56, // Renamed len to length for clarity
  ) {
    this.line = Box[boxType]
  }

  /**
   * Returns an array of ANSI escape sequences found in the given text.
   *
   * @param {string} text - The text to search for ANSI escape sequences.
   * @return {string[]} An array of ANSI escape sequences found in the text.
   */
  private getANSI(text: string) {
    const regex = /\x1b\[[0-9;]*[mGKH]/g
    const match: string[] | null = text.match(regex)
    return match || []
  }

  // Helper method to split text into wrapped lines.
  private wrapText(text: string, size: number) {
    if (!text.trim().length) {
      return [' ']
    }

    const words = text.split(' ')
    const wrappedLines = []
    let currentLine = ''

    for (const word of words) {
      if ((currentLine + ' ' + word).length <= size) {
        if (currentLine) {
          currentLine += ' '
        }
        currentLine += word
      } else {
        wrappedLines.push(currentLine)
        currentLine = word
      }
    }

    if (currentLine) {
      wrappedLines.push(currentLine)
    }

    return wrappedLines
  }

  public repeatText(text: string, times: number) {
    return new Array(times + 1).join(text)
  }

  /**
   * Get the top line of the box.
   * @returns The top line as a string.
   */
  public getTopLine(): string {
    const width = this.length

    const topLine = colors.dim(this.line.top)
    const topLeftLine = colors.dim(this.line.topLeft)
    const topRightLine = colors.dim(this.line.topRight)

    const horizontalLine = this.repeatText(topLine, width - 2)

    return `${topLeftLine}${horizontalLine}${topRightLine}`
  }

  /**
   * Get the bottom line of the box.
   * @returns The bottom line as a string.
   */
  public getBottomLine(): string {
    const width = this.length

    const bottomLine = colors.dim(this.line.bottom)
    const bottomLeftLine = colors.dim(this.line.bottomLeft)
    const bottomRightLine = colors.dim(this.line.bottomRight)

    const horizontalLine = this.repeatText(bottomLine, width - 2)

    return `${bottomLeftLine}${horizontalLine}${bottomRightLine}`
  }

  /**
   * Get a horizontal line within the box.
   * @returns The horizontal line as a string.
   */
  public getHorizontalLine(): string {
    const width = this.length

    const bottomLine = colors.dim(this.line.bottom)
    const leftLine = colors.dim(this.line.left)
    const rightLine = colors.dim(this.line.right)

    const horizontalLine = this.repeatText(bottomLine, width - 2)

    return `${leftLine}${horizontalLine}${rightLine}`
  }

  /**
   * Get a gutter line within the box.
   * @returns The gutter line as a string.
   */
  public getGutterLine(): string {
    const width = this.length

    const leftLine = colors.dim(this.line.left)
    const rightLine = colors.dim(this.line.right)

    const gutterLine = this.repeatText(' ', width - 2)

    return `${leftLine}${gutterLine}${rightLine}`
  }

  /**
   * Get a content line with an optional arrow prefix.
   * @param text The text to display in the content line.
   * @param hasArrowPrefix Whether to add an arrow prefix (default is false).
   * @returns The formatted content line as a string.
   */
  public getContentLine(text: string, hasArrowPrefix = false) {
    const width = this.length
    const paddings = this.options.paddingLeft + this.options.paddingRight

    const arrowPrefixLen = hasArrowPrefix ? 2 : 0
    const maxLength = width - paddings - 2 - arrowPrefixLen

    const paddingLeft = this.repeatText(' ', this.options.paddingLeft)
    const paddingRight = this.repeatText(' ', this.options.paddingRight)

    const leftLine = colors.dim(this.line.left)
    const rightLine = colors.dim(this.line.right)

    const chunks = this.wrapText(text, maxLength)

    const formattedChunks = chunks.map((chunk, idx) => {
      const leftSide = leftLine + paddingLeft
      const rightSide = paddingRight + rightLine

      const ansiLen = this.getANSI(chunk).reduce((acc, cur) => acc + cur.length, 0)

      if (hasArrowPrefix && idx === 0) {
        const prefix = '❯ '
        const content = chunk.padEnd(maxLength + ansiLen, ' ')

        let row = `${leftSide}${prefix}${colors.cyan(`${content}`)}${rightSide}`

        if (/^\s*$/.test(content)) {
          row = row.replace(prefix, ''.padStart(prefix.length, ' '))
        }

        return row
      }

      const content = chunk.padEnd(maxLength + ansiLen + arrowPrefixLen, ' ')
      const colorized = hasArrowPrefix ? colors.cyan(`${content}`) : content

      return `${leftSide}${colorized}${rightSide}`
    })

    const content = formattedChunks.join('\n')
    return content
  }
}
