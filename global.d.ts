declare module 'koishi/addons' {
  interface User {
    id: number
    name: string
    luck: number
    affinity: number
    warehouse: Record<string, number>
    _update(): Promise<void>
  }

  interface Channel {
    id: number
  }

  interface Argv {
    user: User
    options: Record<string, any>
    args: string[]
    channel: Channel
    send(...args: any[]): Promise<void>
    exec(message: string): Promise<void>
  }

  export function registerCommand(name: string, callback: (argv: Argv) => void | string | Promise<void | string>): void
}

declare module 'koishi/utils' {
  import { Time, Random, segment } from 'koishi-utils'

  export { Time, Random, segment }
}

declare module '*.yml' {
  const exports: any
  export default exports
}

declare module 'shiki' {
  export enum rarities { N, R, SR, SSR, EX, SP }
  export type Rarity = keyof typeof rarities

  type Event = null

  export interface Item {
    name: string
    rarity: Rarity
    description: string
    maxCount?: number
    value?: number
    bid?: number
    onGain?: Event
    onLose?: Event
    lottery?: number
    fishing?: number
    plot?: boolean
  }

  type NoticeName =
    | 'herbs' | 'assistant' | 'pagoda' | 'concert'
    | 'blood' | 'hurricane' | 'thundercloud' | 'emergency'
    | 'challenge' | 'toad' | 'kadama' | 'catfish'
    | 'spa' | 'dango' | 'moriya'

  export interface NoticeData {
    id: NoticeName
    start: number
    args: string[]
  }

  export const items: Record<string, Item> & Item[] & Record<Rarity, Item[]>
  export const probs: Record<Rarity, number>
  export const accurate: Record<'N' | 'R' | 'SR' | 'SSR', string[]>
  export const notices: NoticeData[]
}
