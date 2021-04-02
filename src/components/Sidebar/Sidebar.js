import React, {useEffect, useState} from 'react'
import { Avatar } from "@material-ui/core"
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import firebase from 'firebase'

import './Sidebar.css'
import ChatComponent from "./ChatSidebar"
import db from "../../firebase"
import { useStateValue } from "../../StateProvider"

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null)


  useEffect(() => {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        setUser(firebaseUser)
      } 
    })
  }, [])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (searchTerm !== "") {
      const unsubscribe = db.collection("rooms").onSnapshot((snapshot) => 
        setRooms(
          snapshot.docs.filter((doc) =>
              doc.data().name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
        )
      );
      //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
      return () => unsubscribe();
    } else {

      const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
        setRooms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

      //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
      return () => unsubscribe();
    }
  }, [searchTerm]);

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src={user?.photoURL} />{" "}
        {/*the ? because of the Asynch behavior of JS so if the user if undifined for a secon the app won't crash */}
      </div>

      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined />
          <input
            type="text"
            placeholder="Search rooms"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="sidebar_chat">
        <ChatComponent addNewRoom />
        {rooms.map((room) => (
          <ChatComponent key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
