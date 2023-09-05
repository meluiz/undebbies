import { platform } from 'os'

const WinIcons = {
  tick: '√',
  cross: '×',
  bullet: '*',
  nodejs: '♦',
  pointer: '>',
  info: 'i',
  warning: '‼',
  squareSmallFilled: '[█]',
}

const NormalIcons = {
  tick: '✔',
  cross: '✖',
  bullet: '●',
  nodejs: '⬢',
  pointer: '❯',
  info: 'ℹ',
  warning: '⚠',
  squareSmallFilled: '◼',
}

export const Icons = platform() === 'win32' ? WinIcons : NormalIcons
