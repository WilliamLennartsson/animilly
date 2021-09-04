import React, { FC } from 'react'
import SideBar from '../components/sideBar'

const DesignScreen = () => {
  return (
    <div className="flex flex-1 flex-row bg-gray-300">
      <SideBar />
      <div className="content bg-red-100 flex flex-1">

      </div>
    </div>
  )
}

export default DesignScreen


