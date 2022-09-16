import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatsContext'
import Add from '../img/add.png'
import Camera from '../img/cam.png'
import More from '../img/more.png'
import { Input } from './Input'
import { Messages } from './Messages'


export const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user.displayName}</span>
        <div className="chatIcons">
          <img src={Camera} alt="Add" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}
