import React from 'react'
import Img from '../img/img.png'
import Attach from '../img/attach.png'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatsContext';
import { useState } from 'react';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';


export const Input = () => {

  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSendMessage = async () => {
    try {
      setText('');
      if (img) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
          (error) => {

          },
          () => {

            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  text,
                  userId: currentUser.uid,
                  uid: uuid(),
                  date: Timestamp.now(),
                  img: downloadURL
                })
              })
            });
          }
        );

      } else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            text,
            userId: currentUser.uid,
            uid: uuid(),
            date: Timestamp.now()
          })
        });
      }

      await updateDoc(doc(db, "userChats", currentUser.uid),{
        [data.chatId+".lastMessage"]:{
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      })
      await updateDoc(doc(db, "userChats", data.user.uid),{
        [data.chatId+".lastMessage"]:{
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      })
    } catch (error) {

    }
  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSendMessage();
  }

  return (
    <div className='input'>
      <input placeholder='Type something' value={text} onChange={(e) => setText(e.target.value)} onKeyDown={handleKey} />
      <div className="send">
        <img src={Attach} alt="" />
        <input type="file" id="file" onChange={(e) => setImg(e.target.files[0])} style={{ display: "none" }} />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  )
}
