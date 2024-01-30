// How to show currently logged in user: https://stackoverflow.com/questions/65060748/react-js-how-to-get-and-show-current-user-when-logged-in
import {Container, Row, Col} from "react-bootstrap";
import "./styles.css";
import {useState} from 'react';
import Header from "../Header/Header";
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//Based on course materials from week 12!
const Login = function () {
    const [userData, setUserData] = useState({});
    function storeToken(token) {
        localStorage.setItem("auth_token", token);
        localStorage.setItem("username", userData.username)
    }   
    function storeUsername(email) {
        let temp = email.split("@");
        localStorage.setItem("username", temp[0]);
    }
    const handleSubmit = (event) => {
        event.preventDefault(); 
        fetch("/api/user/login", {
            method: "POST", 
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData), 
            mode: "cors"
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.token) {
                //setJwt(data.token);
                storeToken(data.token);
                storeUsername(userData.email);
                window.location.replace("/main");
            }
        })
    }
    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }
    return(
        <>
        <Container id="Login">
            <Row>
                <Col></Col>
                <Col>
                <Header type="h1" text="Login"></Header>
                <div className="container-lg" id="login">
                    <form onSubmit={handleSubmit} onChange={handleChange}>
                        <Header type="h4" text="Email: "></Header>
                        <input name="email" type="email"></input>
                        <br></br>
                        <br></br>
                        <Header type="h4" text="Password: "></Header>
                        <input name="password" type="password" autoComplete="current-password"></input>
                        <br></br>
                        <br></br>
                        <button id="submit">Login</button> <br></br><br></br>
                        <a href="/register">Not yet user? Sign up here...</a>
            </form> 
        </div>
                
                </Col>


                <Col></Col>
            </Row>
        </Container>
        </>
    )
}
export default Login; 