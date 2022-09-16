import React from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { Link, useNavigate } from 'react-router-dom';


export const Login = () => {

  const navigate = useNavigate();
  
  const handleSubmit = async(e) =>{
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = signInWithEmailAndPassword(auth, email, password)
      navigate("/");
    } catch (error) {
      
    }
  }

  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <span className="logo">Chat</span>
            <span className="title">Login</span>
            <form onSubmit={handleSubmit}>

                <input type="email" placeholder='email'></input>
                <input type="password" placeholder='password'></input>            
               <button>Sing in</button>
            </form>
            <p>You don't have an account? <Link to="/register">Register</Link> </p>
        </div>
    </div>

  )
}
