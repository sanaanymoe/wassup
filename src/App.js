import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { auth } from './firebase'
import firebase from 'firebase';
import { CircularProgress } from '@material-ui/core';
import { Button } from "@material-ui/core";


import './App.css';
import Landing from './components/landing/Landing'
import Sidebar from './components/Sidebar/Sidebar';
import Chat from "./components/Chat/Chat"
import Login from './components/Login/Login';


function App() {
  const[user , setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  // debugger


  useEffect(() => {
    const catchUser = () =>{
       firebase.auth().onAuthStateChanged(firebaseUser => {
        // debugger
        if (firebaseUser) {
          setUser(firebaseUser)
          // console.log(firebaseUser)
        } 

        setLoading(false)
      })
    }

    catchUser();
    setLoading(true);
    // console.log("useEffect called")

  }, [])

  const logOutHandler = () => {
    auth.signOut();
    setUser(null)
  }

  const logIn = () => {
    // debugger

    return (
      <>
        <Router >
          <Redirect to="/login" />
          <Route path="/login" component={Login} />
        </Router>
      </>
    )
  }

  const loggedIn = () => {
    // debugger

    return (
      <div className="app_body">
        <Button onClick={logOutHandler}>Sign out</Button>
 
        <Router>
          <Redirect to="/" />
          <Switch>
            <Route exact path="/">
              <Sidebar />
              <Landing />
            </Route>
            <Route exact path="/rooms/:roomId">
              <Sidebar />
              <Chat />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }

  const loader = () => {
    // debugger
    return  (
      <div className="loading">
        <CircularProgress />
      </div>
    )
  }

  // debugger
  // console.log("inside App")

  if (loading) return loader();

  return (
    <div className="app">
      { !user ? logIn() : loggedIn() }
    </div>
  );

}

export default App;





// return (
//   <div className="app">
//     <Router>
//       {!user ? (
//         <>
//           <Redirect to="/login" />
//           <Route path="/login" component={Login} />
//         </>
//       ) : (
//           <div className="app_body">
//             <Redirect to="/" />
//             <Switch>
//               <Route exact path="/">
//                 <Sidebar />
//                 <Landing />
//               </Route>
//               <Route exact path="/rooms/:roomId">
//                 <Sidebar />
//                 <Chat />
//               </Route>
//             </Switch>
//           </div>
//         )}
//     </Router>
//   </div>
// );






// return (
//   <div className="app">
//     <div className="app_body">
//       <Router>
//         <Switch>
//           <Route exact path="/login" component={Login} />
//           <ProtectedRoute path="/" component={Sidebar} />
//           <ProtectedRoute path="/" component={Landing} />
//           <ProtectedRoute path="/" component={Logout} />
//           <ProtectedRoute path="/rooms/:roomId" component={Sidebar} />
//           <ProtectedRoute path="/rooms/:roomId" component={Chat} />
//           <ProtectedRoute path="/rooms/:roomId" component={Logout} />
//         </Switch>
//       </Router>
//     </div>
//   </div>
// )
