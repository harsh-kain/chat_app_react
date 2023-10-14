/* eslint-disable react/jsx-key */

import { useEffect, useState } from 'react'

import { getDatabase, ref, push, set,onChildAdded } from "firebase/database";
import { GoogleAuthProvider,getAuth,signInWithPopup } from "firebase/auth";
import './App.css'

function App() {

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const googleLogin = () =>{
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      setNames(result.user.displayName)
      console.log(token,user);
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }
  const [names, setNames] = useState("")
  const [chat, setChat] = useState([])
  
  const [msg, setMsg] = useState('')
  const db = getDatabase();
  const chatListRef = ref(db, 'chat');

  
  const updateHeight = () => {
    const el = document.getElementById('container');  
    if(el){
      el.scrollTop = el.scrollHeight;  
      }
  }

  
  const sendChat = (e) =>{
  
    const chatRef = push(chatListRef);
    set(chatRef, {
      name : names, message : msg 
    });
    setMsg('')
    

  }
  useEffect(() => {
    onChildAdded(chatListRef, (data) => {
      setChat(chat => [...chat, data.val()])

      setTimeout(() => {
        updateHeight();
      }, 100);
    });
  }, [])
  
  return (
    <div className='container_'>
     

      {names ? null : 
        <div className="googleContainer">
          <img src="./google.png" alt="" />
          <button className='google' onClick={e => googleLogin()}>Login With Google</button>
        </div>
      }

      {names ? 
 
        <div id='wrapper' className="wrapper">
          <h1 className='name'>Hey! {names}</h1>
          <div id='container' className="container">
            {chat.map((c,i) => <div className="msgContainer">
              <div key={i} className={`${c.name === names ? 'msg user' : 'msg other'}`}>
                <p>
                  {/* <strong>{c.name}:</strong> */}
                  <span>{c.message}</span>
                </p>
                </div>
            </div>)}


          </div>
          <div className="inputBox">
            <input type="text" name="" id="" placeholder='Enter Message' onInput={e => setMsg(e.target.value)} value={msg}/>
            <button className='send' onClick={e => sendChat(e)}>Send</button>
          </div>
        </div>

       : null}

    <footer><p>Design and Developed by #Kain</p></footer>
    </div>
  )

}

export default App;
