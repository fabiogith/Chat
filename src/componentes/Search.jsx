import React, { useContext, useState } from 'react'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import {db} from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatsContext';

export const Search = () => {
  const { dispatch } = useContext(ChatContext);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const {currentUser} = useContext(AuthContext)

  const handleSearch = async() =>{
    const q = query(collection(db, "users"), where("displayName","==", userName));
    try {
       const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data())
        });
    } catch (error) {
      console.log(error)
      setErr(true)
    }
   
  };

  const handleKey = (e)=>{
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async(e) =>{
    const combineIds = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    
    try {
      const res = await getDoc(doc(db,"chats",combineIds))
      
      if(!res.exists()){
         await setDoc(doc(db, "chats", combineIds),{messages:[]});  
          
         await updateDoc(doc(db, "userChats", currentUser.uid),{
            [combineIds+".userInfo"]:{
              uid:user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL
            },
            [combineIds+".date"]: serverTimestamp()
          });

          await updateDoc(doc(db, "userChats", user.uid),{
            [combineIds+".userInfo"]:{
              uid:currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL
            },
            [combineIds+".date"]: serverTimestamp()
          });
      }
    } catch (error) {
      console.log(error) 
    }
    dispatch({ type: "CHANGE_USER", payload: user })
    setUser(null);
    setUserName("");
  }

  return (
    <div className='search'>
      <div className="searchForm">
        <input value={userName} type="text" placeholder='Find an user' onKeyDown={handleKey} onChange={e=>setUserName(e.target.value)}/>
      </div>
      {err && <span>User not found!!</span>}
     {user && <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}
