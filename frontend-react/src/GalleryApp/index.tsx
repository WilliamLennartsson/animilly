import  { FC, useEffect, useRef, useState } from 'react'
import { Player, User } from '../store/models'

import useGame from './game/useGame'
import useAuthClient from './network/useAuthClient'
import useClient from './network/useClient'

interface Props {
  galleryName: string
}

const GalleryApp: FC<Props> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const game = useGame()
  const client = useClient()
  const authClient = useAuthClient()

  useEffect(() => {
    console.log('authClient.getUser() :>> ', authClient.getUser());
  }, [authClient.getUser()])

  useEffect(() => {
    authClient.login('Testuser', 'SuperSecurePassword')
    // Load game
    if (containerRef.current){
      game.init(containerRef.current)
    }
    // Bind client to server
    client.bindEvents({
      onServerUpdate: (data) => game.serverUpdate(data),
      onPlayerJoined: (player: Player, user: User) => game.addPlayer(player, user)
    })
  }, [])

  useEffect(() => {
    if (!props.galleryName) return
    // Authenticate
    if (!authClient.isLoggedIn) return
    const user = authClient.getUser()
    if (!user){ 
      throw new Error("User undefined while logged in.")
    }

    // Join gallery
    client.joinGallery(props.galleryName, user)
  }, [props.galleryName])

  return (
    <>
      <div ref={containerRef} className="w-full h-full" />
    </>
  )
}

export default GalleryApp
