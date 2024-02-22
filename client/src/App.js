//import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
//import {useEffect} from 'react';
import Login from './components/Login/Login';
//import Header from './components/Header/Header';
import Register from './components/Register/Register';
import EditProfile from './components/Profile/EditProfile';
import MessagesView from './components/MessagesView/MessagesView';
import Profile from './components/Profile/Profile';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

//import ShowUsers from './components/ShowUsers';
import {useState} from "react";
//import {toast} from "react-toastify";
import AuthenticatedMainPage from './components/MainPage/AuthenticatedMainPage';
import MainPage from './components/MainPage/MainPage';

function App() {
  //const [jwt, setJwt] = useState("");
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
let profileView; 
  if (localStorage.getItem("auth_token")) {
    mainElement = <AuthenticatedMainPage></AuthenticatedMainPage>;
    editPage = <EditProfile></EditProfile>
    messages = <MessagesView></MessagesView>
    profileView = <Profile></Profile>

  } else {
    mainElement = <MainPage></MainPage>; 
    editPage = <MainPage></MainPage>
    messages = <MainPage></MainPage>
    profileView = <MainPage></MainPage>
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={mainElement}></Route>
          <Route path="/login" element={<>
          <Login setUser={setUser}></Login> 
          </>}></Route>
          <Route path="/register" element={<>
            <Register></Register>
          </>}></Route>
          <Route path="/edit/profile" element={editPage}></Route>
          <Route path="/main" element={mainElement}></Route>
          <Route path="/messages" element={messages}></Route>
          <Route path="/messages/:recipientUsername" element={messages}></Route>
          <Route path="/profile/:username" element={profileView}></Route>
        </Routes>
    </div>
    </Router>
  );
}

export default App;
