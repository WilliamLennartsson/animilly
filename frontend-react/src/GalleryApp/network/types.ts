import { User } from './../../store/models';
export type Direction = [number, number, number]

export interface Command<T, D> {
  data: T
  name: D
}

export type JoinGalleryCommand = Command<{ galleryName: string, user: User }, 'REQUEST_JOIN_ROOM'>
export type MovePlayerCommand = Command<Direction, 'MOVE'>

export type CommandTypes = 'JOIN_ROOM' 
                          | 'MOVE_PLAYER'
                          | 'SEND_CHAT_MSG'
