//import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './components/Login';
import Header from './components/Header';
import Register from './components/Register';
import Profile from './components/EditProfile';
import 'react-bootstrap';
//import ShowUsers from './components/ShowUsers';

import {useState} from "react";
//import MainPage from './components/MainPage';
function App() {
  const [jwt, setJwt] = useState("");
  const [user, setUser] = useState({});
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Header text="Welcome!"></Header>}></Route>
          <Route path="/login" element={<>
          <Header text="Login"></Header> 
          <Login setJwt={setJwt} setUser={setUser} jwt={jwt}></Login> 
          </>}></Route>
          <Route path="/register" element={<>
            <Header text="Register"></Header>
            <Register></Register>
          </>}></Route>
          <Route path="/api/editProfile" element={<Profile user={user}></Profile>}></Route>
        </Routes>
    </div>
    </Router>
  );
}

export default App;
