import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { ChatContext } from '../context/ChatsContext';
import { db } from '../firebase';
import { Message } from './Message'

export const Messages = () => {
  const [messages, setMessages] = useState([])
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      setMessages(doc.data()?.messages);
    });
    return () => {
      unsub()
    }
  }, [data.chatId])
  
  return (
    <div className='messages'>
      {messages?.map((message)=>(
        <Message key={message.uid} message={message}/>
      ))}
    </div>
  )
}
