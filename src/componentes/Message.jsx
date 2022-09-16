import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatsContext';

export const Message = ({message}) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({behavior:"smooth"})
  }, [message])
  

  return (
    <div ref={ref} className={currentUser.uid === message.userId ? 'message owner' : 'message'}>
      <div className="messageInfo">
        <img src={currentUser.uid === message.userId ? currentUser.photoURL : data.user.photoURL} alt="" />
        <span>Just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" /> }
      </div>
    </div>
  )
}
