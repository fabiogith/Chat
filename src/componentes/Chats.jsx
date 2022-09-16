import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatsContext';
import { db } from '../firebase';

export const Chats = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      }
    };

    currentUser.uid && getChats();

  }, [currentUser.uid])

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user })
  }

  return (

    <div className='chats'>
      {chats && Object.entries(chats)?.sort((a,b)=> b[1].date - a[1].date).map((chat) => (
        <div className="userChat" key={chat[1].userInfo.uid} onClick={() => handleSelect(chat[1].userInfo)} >
          <img src={chat[1].userInfo.photoURL} alt="qwer" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}

    </div>
  )
}
