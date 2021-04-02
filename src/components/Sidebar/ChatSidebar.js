import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";

import "./ChatSidebar.css";
import db from "../../firebase";
import { Link } from "react-router-dom";

function Chat(props) {
  const createRoom = () => {
    const roomName = prompt("Enter the room name");
    if (roomName) {
      //save to database
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !props.addNewRoom ? (
    <Link to={`/rooms/${props.id}`}>
      <div className="chatSidebar">
        <Avatar
          src={`https://avatars.dicebear.com/api/initials/${props.name}.svg`}
        />
        <div className="chat_info">
          <h2>{props.name}</h2>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createRoom} className="chatSidebar">
      <h2>Create a new room</h2>
    </div>
  );
}

export default Chat;
