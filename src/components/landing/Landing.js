import React from 'react'
import './landing.css'


function Landing() {
    return (
      <div className="landing">
        <img src={require("../../images/wassup.png")} alt="logo"></img>
        <h1>Join a Room to start</h1>
      </div>
    );
}

export default Landing

