import {IconButton } from '@material-ui/core'
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import MicIcon from "@material-ui/icons/Mic"
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

import "./chat.css"
import db from '../../firebase'
import firebase from 'firebase' //the actual firebase not the module (local) firebase

import { useStateValue } from '../../StateProvider';

function Chat() {

    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([])
    // const [{ user }, dispatch] = useStateValue();
  const [user, setUser] = useState(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      // debugger
      if (firebaseUser) {
        setUser(firebaseUser)
        // console.log(firebaseUser)
      } else {
        setUser(null)
        // console.log("user not found")
      }
    })
  }, [])

    // debugger

    useEffect(() => {
      if(roomId) {
        db.collection('rooms').doc(roomId).onSnapshot( snapshot => (
          setRoomName(snapshot.data().name)
        ));

        db.collection('rooms')
          .doc(roomId).collection("messages")
          .orderBy("timestamp", "asc")
          .onSnapshot( snapshot => 
            setMessages(snapshot.docs.map( doc => 
              doc.data()
          )))
      }
    }, [roomId])


    const sendMessage = (e) => {
      e.preventDefault();

      // console.log("Your maessage is >>> ", input)
      db.collection('rooms').doc(roomId).collection('messages').add({
        id: messages.length,
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })

      setInput("") //clear the input field after sending 
    }

    const comingSoon = () =>{
      alert("Coming Soon :D")
    }

    const handleDelete = (e) => {
      // const time = e.timestamp;
      // debugger
      // db.collection('rooms').doc(roomId).collection('messages')
      // .onSnapshot(snapshot => snapshot.docs.forEach(doc => {
      //   // debugger
      //   // doc.data().timestamp === time ? console.log(doc.data()) : console.log("not found")
      // }))

      // // debugger

      // db.collection('rooms').doc(roomId).collection('messages').delete()
      // .then(() => deleteComplete())
      // .catch((error) => console.log(error))
    }


    return (
      <div className="chat">
        <div className="chat_header">
          <MeetingRoomIcon />

          <div className="chat_headerInfo">
            <h3>{roomName}</h3>
          </div>
        </div>

        <div className="chat_body">
          {messages.map((message) => (
            <p
              className={`sentMessage ${
                message.name === user.displayName && "recievedMessage"
              }`}
              key={message.timestamp}
            >
              <span className="name">{message.name}</span>
              <button onClick={handleDelete} key={message.timestamp}>delete</button>
                {message.message}
              <span className="time">
                {new Date(message.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          ))}
        </div>

        <div className="chat_footer">
          <IconButton onClick={comingSoon}>
            <InsertEmoticonIcon />
          </IconButton>
          <form onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Type a message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button>Send message</button>
          </form>
          <IconButton onClick={comingSoon}>
            <MicIcon />
          </IconButton>
        </div>
      </div>
    );
}

export default Chat
