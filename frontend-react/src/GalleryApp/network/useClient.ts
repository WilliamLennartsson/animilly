import { User, Player } from './../../store/models';
import { useEffect, useState } from "react";
import { Command, JoinGalleryCommand } from './types'
import { createSocket } from './client'
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { Socket } from 'socket.io-client';

export const getUser_testfunc = (accountName: string): User => {
  const user: User = {
    id: 'test_id_' + (Math.floor(Math.random() * 900) + 100),
    accountName: accountName,
    displayName: 'TestUser',
    token: 'test_token_123',
  }
  return user
}

interface NetworkBindEvents {
  onServerUpdate: (data: any) => void
  onPlayerJoined: (player: Player, user: User) => void
}

interface GameClient {
  joinGallery: (roomName: string, user: User) => void
  bindEvents: (events: NetworkBindEvents) => void
  // initSocket: (authToken: string) => boolean
}

const useClient = (): GameClient => {
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null)
  const [eventCallbacks, setEventCallbacks] = useState<NetworkBindEvents>()

  useEffect(() => {
    return () => {
      cleanup()
    }
  }, []);

  const initSocket = (user: User) => {
    const onPlayerJoined = eventCallbacks?.onPlayerJoined
    const onServerUpdate = eventCallbacks?.onServerUpdate
    
    const socket = createSocket(user)
    socket.on('PLAYER_JOINED', player => {
      console.log(`PLAYER JOINED!: player`, player)
      console.log(`eventCallbakcks`, eventCallbacks)
      onPlayerJoined && onPlayerJoined(player, user)
    });
    socket.on('UPDATE', data => {
      onServerUpdate && onServerUpdate(data)
    })
    setSocket(socket)
    console.log("Initted socket")
    return socket
  }

  const cleanup = () => {
    if (socket) socket.close()
  }

  const sendCommand = (socket: Socket<DefaultEventsMap, DefaultEventsMap>, command: Command<any, any>) => {
    if (socket) {
      socket.emit(command.name, command.data)
      console.log("Sent command: ", command)
    }
    else console.log("Didnt send command: ", command)
  }

  const joinGallery = (galleryName: string, user: User) => {
    const socket = initSocket(user)
    const command: JoinGalleryCommand = {
      name: 'REQUEST_JOIN_ROOM',
      data: {
        galleryName: galleryName, // Might be better with ID here
        user: user,
      },
    }
    console.log(`command`, command)
    sendCommand(socket, command)
  }

  const bindEvents = (events: NetworkBindEvents) => {
    setEventCallbacks(events)
  }

  return {
    // initSocket,
    joinGallery,
    bindEvents
  }
}

export default useClient