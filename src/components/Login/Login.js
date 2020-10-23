import React from 'react';
import { Button } from "@material-ui/core"
import { auth, provider } from '../../firebase'
import { actionTypes } from "../../reducer/reducer"
import { useStateValue } from "../../StateProvider"

import "./Login.css"

function Login() {
    // console.log("inside login component")
    
    const [{}, dispatch] = useStateValue();


    const signIn = () => {
        auth.signInWithPopup(provider)
        .then(res => {
            dispatch({
                type: actionTypes.SET_USER,
                user: res.user,
            })
        })
        .catch( error => alert(error.message));
    }
    return (
      <div className="login">
        <div className="login-container">

            <img src={require('../../images/wassup.png')} alt="wassup log"></img>
            <div className="welcome-message">
            <h1>Sign in to wassup</h1>
            </div>

            <Button onClick={signIn}>Sign In With Google</Button>
        </div>
      </div>
    );
}

export default Login
