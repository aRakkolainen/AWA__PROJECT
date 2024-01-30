//import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
//import {useEffect} from 'react';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Register from './components/Register/Register';
import EditProfile from './components/Profile/EditProfile';
import Messages from './components/Messages/Messages';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import ShowUsers from './components/ShowUsers';

import {useState} from "react";
import AuthenticatedMainPage from './components/MainPage/AuthenticatedMainPage';
import MainPage from './components/MainPage/MainPage';
function App() {
  const [jwt, setJwt] = useState("");
  const [user, setUser] = useState({});
  /*useEffect(() => {
    console.log("Fetching main page..")
    fetch("/main", {
        headers: {
            "authorization": "Bearer " + localStorage.getItem("auth_token")
        }
    })
    .then(console.log("main page"))
})*/
//Testing if user is logged in
let mainElement; 
let editPage;
let messages; 
  if (localStorage.getItem("auth_token")) {
    mainElement = <AuthenticatedMainPage></AuthenticatedMainPage>;
    editPage = <EditProfile></EditProfile>
    messages = <Messages></Messages>
  } else {
    mainElement = <MainPage></MainPage>; 
    editPage = <MainPage></MainPage>
    messages = <MainPage></MainPage>
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={mainElement}></Route>
          <Route path="/login" element={<>
          <Login setJwt={setJwt} setUser={setUser} jwt={jwt}></Login> 
          </>}></Route>
          <Route path="/register" element={<>
            <Register></Register>
          </>}></Route>
          <Route path="/edit/profile" element={editPage}></Route>
          <Route path="/main" element={mainElement}></Route>
          <Route path="/messages" element={messages}></Route>
        </Routes>
    </div>
    </Router>
  );
}

export default App;
