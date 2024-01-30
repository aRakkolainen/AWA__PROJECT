import Header from "../Header/Header";
import Login from "../Login/Login";
import {useState} from "react";

const MainPage = () => {
    const [jwt, setJwt] = useState("");
    const [user, setUser] = useState({});
    return <>
        <Header type="h1" text="Welcome!"></Header>
        <Login setJwt={setJwt} setUser={setUser} jwt={jwt}></Login>
    </>
} 
export default MainPage; 