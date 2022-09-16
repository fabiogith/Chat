import React from 'react'
import { Chat } from '../componentes/Chat'

import { SideBar } from '../componentes/SideBar'

export const Home = () => {
  return (
    <div className='home'>
        <div className="container">
            <SideBar/>
            <Chat/>
        </div>
    </div>
  )
}
