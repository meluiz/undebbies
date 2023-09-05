import { createColors } from 'picocolors'

import { Panel } from './Panel'

export class Logger {
  // Static properties for colors, timestamp, and panel
  public static colors = createColors()
  public static timestamp = new Date().toISOString()
  public static Panel = Panel

  // Helper function to format stack trace
  private static formatStack(stack?: string): string {
    if (!stack) {
      return ''
    }
    return `\n${stack
      .split('\n')
      .splice(1)
      .map((line) => {
        return `${Logger.colors.dim(line)}`
      })
      .join('\n')}`
  }

  // Helper function to colorize text
  private static colorize(color: keyof Omit<typeof Logger.colors, 'isColorSupported'>, text: string): string {
    text = text.padEnd(7, ' ')
    return `${Logger.colors[color](text)} ― `
  }

  // Get label with color
  private static getLabel(label: string): string {
    switch (label) {
      case 'success':
        return Logger.colorize('green', label)
      case 'warn':
        return Logger.colorize('yellow', label)
      case 'error':
        return Logger.colorize('red', label)
      case 'info':
        return Logger.colorize('cyan', label)
      case 'debug':
        return Logger.colorize('blue', label)
      case 'trace':
        return Logger.colorize('magenta', label)
      case 'fatal':
        return Logger.colorize('red', label)
      case 'silly':
        return Logger.colorize('cyan', label)
      case 'wait':
        return Logger.colorize('magenta', label)
      default:
        return label
    }
  }

  // Prefix the log message with timestamp and label
  private static prefixLabel(message: string, label: string): string {
    return `${Logger.colors.dim(Logger.timestamp)} ${label} ${message}`
  }

  // Add a custom prefix to the log message
  private static addPrefix(message: string, prefix?: string): string {
    if (!prefix) {
      return message
    }
    prefix = prefix.replace(/%time%/, new Date().toISOString())
    return `${Logger.colors.dim(`${prefix}`)} ${message}`
  }

  // Add a custom suffix to the log message
  private static addSuffix(message: string, suffix?: string): string {
    if (!suffix) {
      return message
    }
    return `${message} ${Logger.colors.dim(`(${suffix})`)}`
  }

  // Clear the console
  public static clear() {
    console.clear()
  }

  // Log a message
  public static log(message: string, isLogError?: string) {
    if (isLogError) {
      return console.error(isLogError)
    }
    return console.log(message)
  }

  // Log a success message
  public static success(message: string, prefix?: string, suffix?: string) {
    message = Logger.prefixLabel(message, Logger.getLabel('success'))
    message = Logger.addPrefix(message, prefix)
    message = Logger.addSuffix(message, suffix)
    Logger.log(message)
  }

  // Log a warning message
  public static warn(message: string, prefix?: string, suffix?: string) {
    message = Logger.prefixLabel(message, Logger.getLabel('warn'))
    message = Logger.addPrefix(message, prefix)
    message = Logger.addSuffix(message, suffix)
    Logger.log(message)
  }

  // Log an wait message
  public static wait(message: string, prefix?: string, suffix?: string) {
    message = Logger.prefixLabel(message, Logger.getLabel('wait'))
    message = Logger.addPrefix(message, prefix)
    message = Logger.addSuffix(message, suffix)
    Logger.log(message)
  }

  // Log an error message
  public static error(message: string | { message: string }, prefix?: string, suffix?: string) {
    message = typeof message === 'string' ? message : message.message
    message = Logger.prefixLabel(message, Logger.getLabel('error'))
    message = Logger.addPrefix(message, prefix)
    message = Logger.addSuffix(message, suffix)
    Logger.log(message)
  }

  // Log an info message
  public static info(message: string, prefix?: string, suffix?: string) {
    message = Logger.prefixLabel(message, Logger.getLabel('info'))
    message = Logger.addPrefix(message, prefix)
    message = Logger.addSuffix(message, suffix)
    Logger.log(message)
  }

  // Log a debug message
  public static debug(message: string, prefix?: string, suffix?: string) {
    message = Logger.prefixLabel(message, Logger.getLabel('debug'))
    message = Logger.addPrefix(message, prefix)
    message = Logger.addSuffix(message, suffix)
    Logger.log(message)
  }

  // Log a trace message
  public static trace(message: string, prefix?: string, suffix?: string) {
    message = Logger.prefixLabel(message, Logger.getLabel('trace'))
    message = Logger.addPrefix(message, prefix)
    message = Logger.addSuffix(message, suffix)
    Logger.log(message)
  }

  // Log a fatal message
  public static fatal(message: string | { message: string; stack?: string }, prefix?: string, suffix?: string) {
    const stack = Logger.formatStack(typeof message === 'string' ? undefined : message.stack)
    message = typeof message === 'string' ? message : message.message
    message = Logger.prefixLabel(message, Logger.getLabel('fatal'))
    message = Logger.addPrefix(message, prefix)
    message = Logger.addSuffix(message, suffix)
    Logger.log(`${message}${stack}`)
  }

  // Log a silly message
  public static silly(message: string, prefix?: string, suffix?: string) {
    message = Logger.prefixLabel(message, Logger.getLabel('silly'))
    message = Logger.addPrefix(message, prefix)
    message = Logger.addSuffix(message, suffix)
    Logger.log(message)
  }
}
