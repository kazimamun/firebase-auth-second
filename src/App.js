import React, { useState } from 'react';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig)
function App() {
  const [user, setUser] = useState({
    isSignedIn : false,
    name: '',
    email : '',
    photo : ''
  })
  const provider = new firebase.auth.GoogleAuthProvider();
  //google sign in click handler
  const handleSignIn = ()=>{
    firebase.auth().signInWithPopup(provider)
    .then(res=>{
      const {displayName, email, photoURL} = res.user;
      const signedInUser = {
        isSignedIn : true,
        name: displayName,
        email : email,
        photo : photoURL
      }
      setUser(signedInUser);
    })
    .catch(err=>{
      console.log(err);
      console.log(err.message);
    })
  }
  //google sign out click handler
  const handleSignOut = ()=>{
    firebase.auth().signOut()
    .then(()=>{
      const signOutUser = {
        isSignedIn : false,
        name: '',
        email : '',
        photo : ''
      }
      setUser(signOutUser);
    })
    .catch(err=>console.log(err))
  }
  const handleChange= (event)=>{
    console.log(event.target.value);
  }
  const handleSubmit = ()=>{

  }
  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button> : 
        <button onClick={handleSignIn}>Sign In</button>
      }
      {
        user.isSignedIn && <div>
                              <p>Email: {user.email}</p>
                              <p>Name : {user.name}</p>
                              <img src={user.photo} alt=""/>
                            </div>
      }
      <h1>Our Own Authentication</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name='email' onChange={handleChange} placeholder='Your Email' required/>
        <br/>
        <input type="password" name='password' onChange={handleChange} placeholder='Password' id="" required/>
        <br/>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
}

export default App;
